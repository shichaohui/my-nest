/**
 * CropImage 页面
 * @Author StoneHui
 * @Date 2022-01-26 14:52
 */

import { FC, useCallback } from 'react';
import { View } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import TaroCropper from 'taro-cropper';
import style from './index.module.scss';

const CropImage: FC<{}> = () => {
  const { url } = useRouter().params;

  const avatarMaskCropSize = 600;

  const handleCustomAvatarMaskCropped = useCallback(path => {
    Taro.eventCenter.trigger('cropSuccess', path);
    Taro.navigateBack();
  }, []);

  const handleCustomAvatarMaskCropCancel = useCallback(() => {
    Taro.navigateBack();
  }, []);

  return (
    <View className={style.page}>
      <TaroCropper
        themeColor="#f58220"
        fullScreen
        cropperWidth={avatarMaskCropSize}
        cropperHeight={avatarMaskCropSize}
        hideCancelText={false}
        fileType="png"
        src={url}
        onCancel={handleCustomAvatarMaskCropCancel}
        onCut={handleCustomAvatarMaskCropped}
      />
    </View>
  );
};

export default CropImage;
