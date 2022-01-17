import { Image, ImageProps } from '@tarojs/components';
import Taro, { FC } from '@tarojs/taro';
import { useEffect, useMemo, useState } from 'react';

export interface LazyImageProps extends ImageProps {}

/** 进入视口时才懒加载的图片 */
const LazyImage: FC<LazyImageProps> = props => {
  const { src, ...restProps } = props;

  const [finalSrc, setFinalSrc] = useState('');

  const id = useMemo(() => {
    const random = Math.random().toString();
    return `id-${random.substring(2)}`;
  }, []);

  useEffect(() => {
    Taro.nextTick(() => {
      // @ts-ignore
      const observer = Taro.createIntersectionObserver();
      observer.relativeToViewport();
      observer.observe(`#${id}`, res => {
        if (res.intersectionRatio > 0) {
          setFinalSrc(src);
          observer.disconnect();
        }
      });
    });
  }, [id, src]);

  return <Image {...restProps} id={id} src={finalSrc} />;
};

export default LazyImage;
