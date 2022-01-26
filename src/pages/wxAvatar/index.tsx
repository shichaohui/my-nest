import Taro, { useShareAppMessage, useShareTimeline } from '@tarojs/taro';
import { FC, useCallback, useMemo, useRef, useState } from 'react';
import { ITouchEvent, View } from '@tarojs/components';
import { AtButton } from 'taro-ui';
import LazyImage from '@/components/LazyImage';
import { saveImageToPhotosAlbum } from '@/utils/image';
import throttle from '@/utils/throttle';
import style from './index.module.scss';
import AvatarPainter, {
  AvatarPainterInstance,
  AvatarPosition,
} from './AvatarPainter';
import config from './config';

const initAvatarPosition: AvatarPosition = {
  top: 0,
  left: 0,
};

/** 微信头像 */
const WXAvatar: FC<{}> = () => {
  // 头像尺寸
  const avatarPreviewSize = 264;
  const avatarDrawSize = 840;
  // 头像挂件列表
  const avatarMaskList = useMemo(() => config.getMaskList(), []);
  // 微信头像
  const [avatarUrl, setAvatarUrl] = useState('');
  // 选中的挂件
  const [avatarMask, setAvatarMask] = useState(avatarMaskList[0]);
  // 上次触摸头像的事件
  const prevAvatarTouchEventRef = useRef<ITouchEvent>();
  // 头像位置
  const [avatarPosition, setAvatarPosition] = useState<AvatarPosition>(
    initAvatarPosition,
  );
  // 头像绘制组件
  const avatarPainterInstanceRef = useRef<AvatarPainterInstance>(null);

  // 分享给好友
  useShareAppMessage(() => config.getShareFriendInfo());

  // 分享到朋友圈
  useShareTimeline(() => config.getShareTimelineInfo());

  // 获取用户信息
  const handleGetUserInfo = useCallback(async () => {
    const { userInfo } = await Taro.getUserProfile({
      desc: '该操作需要获取你的公开信息',
    });
    setAvatarUrl(userInfo.avatarUrl.replace(/132$/, '0'));
  }, []);

  // 触摸并移动头像
  const handleAvatarTouchMove = useMemo(() => {
    return throttle((event: ITouchEvent) => {
      if (!prevAvatarTouchEventRef.current) {
        prevAvatarTouchEventRef.current = event;
        return;
      }
      const prevTouch = prevAvatarTouchEventRef.current.touches[0];
      const touch = event.touches[0];
      requestAnimationFrame(() => {});
      setAvatarPosition(position => ({
        top: position.top + touch.pageY - prevTouch.pageY,
        left: position.left + touch.pageX - prevTouch.pageX,
      }));
      prevAvatarTouchEventRef.current = event;
    }, 33);
  }, []);

  // 触摸头像结束
  const handleAvatarTouchEnd = useCallback(() => {
    prevAvatarTouchEventRef.current = undefined;
  }, []);

  // 选择自定义挂件
  const handleCustomAvatarMask = useCallback(async () => {
    const { tempFiles } = await Taro.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album'],
    });
    Taro.eventCenter.once('cropSuccess', path => {
      setAvatarMask({ url: path, thumbnail: '' });
    });
    Taro.navigateTo({
      url: `/pages/cropImage/index?url=${tempFiles[0].tempFilePath}`,
    });
  }, []);

  // 选择挂件
  const handleClickAvatarMask = useCallback(
    (event: ITouchEvent) => {
      const { index } = event.currentTarget.dataset;
      setAvatarMask(avatarMaskList[index]);
      setAvatarPosition(initAvatarPosition);
    },
    [avatarMaskList],
  );

  // 保存原头像
  const handleSaveOriginalAvatar = useCallback(() => {
    Taro.downloadFile({
      url: avatarUrl,
      success: res => saveImageToPhotosAlbum(res.tempFilePath),
    });
  }, [avatarUrl]);

  // 保存新头像
  const handleSaveAvatar = useCallback(() => {
    avatarPainterInstanceRef.current?.draw();
  }, [avatarPainterInstanceRef]);

  return (
    <View className={style.page}>
      <View
        className={style.preview}
        style={{
          width: `${avatarPreviewSize}px`,
          height: `${avatarPreviewSize}px`,
        }}
      >
        <LazyImage
          className={style.avatar}
          style={{ top: avatarPosition.top, left: avatarPosition.left }}
          src={avatarUrl}
          onTouchMove={!!avatarUrl ? handleAvatarTouchMove : undefined}
          onTouchEnd={!!avatarUrl ? handleAvatarTouchEnd : undefined}
        />
        <LazyImage className={style.avatarMask} src={avatarMask.url} />
      </View>
      <View className={style.avatarMaskList}>
        <View className={style.avatarMask} onClick={handleCustomAvatarMask}>
          自定义
        </View>
        {avatarMaskList.map((item, index) => (
          <LazyImage
            key={item.thumbnail}
            className={style.avatarMask}
            src={item.thumbnail}
            data-index={index}
            onClick={handleClickAvatarMask}
          />
        ))}
      </View>
      <View className={style.actionList}>
        <AtButton
          className={style.action}
          type="primary"
          circle
          onClick={handleGetUserInfo}
        >
          获取原头像
        </AtButton>
        <AtButton
          className={style.action}
          type="primary"
          circle
          disabled={!avatarUrl}
          onClick={handleSaveOriginalAvatar}
        >
          保存原头像
        </AtButton>
        <AtButton
          className={style.action}
          type="primary"
          circle
          disabled={!avatarUrl}
          onClick={handleSaveAvatar}
        >
          保存新头像
        </AtButton>
      </View>
      <View className={style.tipsList}>
        <View className={style.tips}>可拖动调整头像位置</View>
        <View className={style.tips}>素材来自于 zh.pngtree.com</View>
      </View>
      <AvatarPainter
        ref={avatarPainterInstanceRef}
        size={avatarDrawSize}
        avatarUrl={avatarUrl}
        avatarMask={avatarMask.url}
        avatarPosition={avatarPosition}
        avatarPositionRate={avatarDrawSize / avatarPreviewSize}
      />
    </View>
  );
};

export default WXAvatar;
