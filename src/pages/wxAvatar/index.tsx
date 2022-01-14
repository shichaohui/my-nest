import Taro from '@tarojs/taro';
import { FC, useCallback, useMemo, useState } from 'react';
import { Image, ITouchEvent, View } from '@tarojs/components';
import { AtButton } from 'taro-ui';
import Painter, {
  IPainterImgErrEvent,
  IPainterImgOKEvent,
  IPalette
} from '@/components/painter';
import style from './index.module.scss';
import mask from './mask';

/** 微信头像 */
const WXAvatar: FC<{}> = () => {
  // 头像挂件列表
  const avatarMaskList = useMemo(() => mask.getList(), []);
  // 微信头像
  const [avatarUrl, setAvatarUrl] = useState('');
  // 选中的挂件
  const [avatarMask, setAvatarMask] = useState(avatarMaskList[0]);
  // 是否绘制
  const [isPainting, setPainting] = useState(false);
  // 绘制配置
  const painterPalette = useMemo(
    () =>
      isPainting ? getPainterPalette(avatarUrl, avatarMask.url) : undefined,
    [isPainting, avatarUrl, avatarMask]
  );

  // 获取用户信息
  const handleGetUserInfo = useCallback(async () => {
    const { userInfo } = await Taro.getUserProfile({
      desc: '该操作需要获取你的公开信息'
    });
    setAvatarUrl(userInfo.avatarUrl.replace(/132$/, '0'));
  }, []);

  // 选择挂件
  const handleClickAvatarMask = useCallback(
    (event: ITouchEvent) => {
      const { index } = event.currentTarget.dataset;
      setAvatarMask(avatarMaskList[index]);
    },
    [avatarMaskList]
  );

  // 保存原头像
  const handleSaveOriginalAvatar = useCallback(() => {
    Taro.downloadFile({
      url: avatarUrl,
      success: res => saveImageToPhotosAlbum(res.tempFilePath)
    });
  }, [avatarUrl]);

  // 保存新头像
  const handleSaveAvatar = useCallback(() => {
    setPainting(true);
  }, []);

  // 生成图片成功
  const handlePaintAvatarOK = useCallback((res: IPainterImgOKEvent) => {
    setPainting(false);
    saveImageToPhotosAlbum(res.detail.path);
  }, []);

  // 生成图片失败
  const handlePaintAvatarError = useCallback((err: IPainterImgErrEvent) => {
    console.error(err);
    setPainting(false);
    Taro.showToast({ icon: 'error', title: '保存失败' });
  }, []);

  return (
    <View className={style.page}>
      <View className={style.preview}>
        <Image className={style.avatar} src={avatarUrl} />
        <Image className={style.avatarMask} src={avatarMask.thumbnail} />
      </View>
      <View className={style.avatarMaskList}>
        {avatarMaskList.map((item, index) => (
          <Image
            key={item.thumbnail}
            className={style.avatarMask}
            src={item.thumbnail}
            data-index={index}
            onClick={handleClickAvatarMask}
          />
        ))}
      </View>
      <View className={style.maskSource}>部分素材来自于 zh.pngtree.com</View>
      <View className={style.actionList}>
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
          onClick={handleGetUserInfo}
        >
          获取原头像
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
      <Painter
        palette={painterPalette}
        onImgOK={handlePaintAvatarOK}
        onImgErr={handlePaintAvatarError}
      />
    </View>
  );
};

/** 获取绘制头像的配置 */
function getPainterPalette(avatarUrl: string, avatarMask: string): IPalette {
  const size = '840px';
  const css = {
    top: '0px',
    left: '0px',
    width: size,
    height: size
  };
  return {
    width: size,
    height: size,
    views: [
      {
        type: 'image',
        url: avatarUrl,
        css: css
      },
      {
        type: 'image',
        url: avatarMask,
        css: css
      }
    ]
  };
}

/** 保存图片到相册 */
async function saveImageToPhotosAlbum(filePath: string) {
  try {
    await Taro.saveImageToPhotosAlbum({ filePath });
    Taro.showToast({
      icon: 'success',
      title: '保存成功'
    });
  } catch (err) {
    console.error(err);
    const errMsgs = {
      'saveImageToPhotosAlbum:fail auth deny': '无相册权限',
      'saveImageToPhotosAlbum:fail cancel': '已取消保存'
    };
    Taro.showToast({
      icon: 'error',
      title: errMsgs[err.errMsg] || '保存失败'
    });
  }
}

export default WXAvatar;
