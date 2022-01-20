import { ShareAppMessageReturn, ShareTimelineReturnObject } from '@tarojs/taro';
import newYear from './newYear';

function getShareFriendInfo(): ShareAppMessageReturn {
  return newYear.shareFriendInfo;
}

function getShareTimelineInfo(): ShareTimelineReturnObject {
  return newYear.shareTimelineInfo;
}

function getMaskList(): WXAvatar.Mask[] {
  return newYear.maskList;
}

export default {
  getShareFriendInfo,
  getShareTimelineInfo,
  getMaskList,
};
