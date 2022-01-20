import Taro from '@tarojs/taro';
import Painter, {
  IPainterImgErrEvent,
  IPainterImgOKEvent,
  IPalette,
} from '@/components/painter';
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { saveImageToPhotosAlbum } from '@/utils/image';
import { toastError } from '@/utils/toast';

/** 头像绘制组件实例 */
export interface AvatarPainterInstance {
  draw: () => void;
}

/** 头像位置偏移 */
export interface AvatarPosition {
  top: number;
  left: number;
}

/** 头像绘制组件参数 */
export interface AvatarPainterProps {
  size: number;
  avatarUrl: string;
  avatarMask: string;
  avatarPosition: AvatarPosition;
  avatarPositionRate: number;
}

/** 头像绘制组件 */
const AvatarPainter = forwardRef<AvatarPainterInstance, AvatarPainterProps>(
  (props, ref) => {
    const {
      size,
      avatarUrl,
      avatarMask,
      avatarPosition,
      avatarPositionRate,
    } = props;

    // 是否绘制
    const [isDrawing, setDrawing] = useState(false);

    // 暴露接口给外部组件
    useImperativeHandle(ref, () => ({
      draw: () => {
        Taro.showLoading({ title: '头像生成中...' });
        setDrawing(true);
      },
    }));

    // 配置
    const palette = useMemo((): IPalette | undefined => {
      if (!isDrawing) {
        return undefined;
      }
      const _size = `${size}px`;
      return {
        width: _size,
        height: _size,
        views: [
          {
            type: 'image',
            url: avatarUrl,
            css: {
              width: _size,
              height: _size,
              top: `${avatarPosition.top * avatarPositionRate}px`,
              left: `${avatarPosition.left * avatarPositionRate}px`,
            },
          },
          {
            type: 'image',
            url: avatarMask,
            css: {
              width: _size,
              height: _size,
              top: '0px',
              left: '0px',
            },
          },
        ],
      };
    }, [
      isDrawing,
      size,
      avatarUrl,
      avatarPosition.top,
      avatarPosition.left,
      avatarPositionRate,
      avatarMask,
    ]);

    // 生成图片成功
    const handlePaintAvatarOK = useCallback((res: IPainterImgOKEvent) => {
      saveImageToPhotosAlbum(res.detail.path);
      setDrawing(false);
      Taro.hideLoading();
    }, []);

    // 生成图片失败
    const handlePaintAvatarError = useCallback((err: IPainterImgErrEvent) => {
      console.error(err);
      setDrawing(false);
      toastError({ title: '保存失败' });
      Taro.hideLoading();
    }, []);

    return (
      <Painter
        palette={palette}
        onImgOK={handlePaintAvatarOK}
        onImgErr={handlePaintAvatarError}
      />
    );
  },
);

export default AvatarPainter;
