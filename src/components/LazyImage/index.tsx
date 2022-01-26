import { Image, ImageProps } from '@tarojs/components';
import Taro, { FC, useDidShow } from '@tarojs/taro';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export interface LazyImageProps extends ImageProps {}

/** 进入视口时才懒加载的图片 */
const LazyImage: FC<LazyImageProps> = props => {
  const { src, ...restProps } = props;

  // Image 组件最终渲染的图片路径
  const [finalSrc, setFinalSrc] = useState('');

  // Image 组件 id，用来做位置监听
  const id = useMemo(() => {
    const random = Math.random().toString();
    return `id-${random.substring(2)}`;
  }, []);

  // 监听器引用
  const observerRef = useRef<Taro.IntersectionObserver | null>(null);

  // 创建监听器
  const createIntersectionObserver = useCallback(() => {
    // 图片已渲染，无需重复创建
    if (finalSrc === src) {
      return;
    }
    Taro.nextTick(() => {
      // 先执行 disconnect 防止重复创建多个监听器
      observerRef.current?.disconnect();
      // @ts-ignore
      observerRef.current = Taro.createIntersectionObserver();
      observerRef.current.relativeToViewport();
      observerRef.current.observe(`#${id}`, res => {
        if (res.intersectionRatio <= 0) {
          return;
        }
        setFinalSrc(src);
        observerRef.current?.disconnect();
        observerRef.current = null;
      });
    });
  }, [finalSrc, id, src]);

  useDidShow(() => {
    createIntersectionObserver();
  });

  useEffect(() => {
    createIntersectionObserver();
  }, [createIntersectionObserver]);

  return <Image {...restProps} id={id} src={finalSrc} />;
};

export default LazyImage;
