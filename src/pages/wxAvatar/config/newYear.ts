import { ShareAppMessageReturn, ShareTimelineReturnObject } from '@tarojs/taro';

/** 分享好友信息 */
const shareFriendInfo: ShareAppMessageReturn = {
  title: '新年新气象，快来换个新头像吧',
  imageUrl: 'https://s4.ax1x.com/2022/01/16/7N4uxU.png'
};

/** 分享朋友圈信息 */
const shareTimelineInfo: ShareTimelineReturnObject = {
  title: '新年新气象，快来换个新头像吧',
  imageUrl: 'https://s4.ax1x.com/2022/01/17/7Ut7Ed.png'
};

/** 挂件列表 */
const maskList: WXAvatar.Mask[] = [
  {
    url: 'https://s4.ax1x.com/2022/01/14/7392HU.png',
    thumbnail: 'https://s4.ax1x.com/2022/01/14/78tKTf.png'
  },
  {
    url: 'https://s4.ax1x.com/2022/01/14/739WEF.png',
    thumbnail: 'https://s4.ax1x.com/2022/01/14/78tQk8.png'
  },
  {
    url: 'https://s4.ax1x.com/2022/01/14/739fN4.png',
    thumbnail: 'https://s4.ax1x.com/2022/01/14/78t8pQ.png'
  },
  {
    url: 'https://s4.ax1x.com/2022/01/14/739NB8.png',
    thumbnail: 'https://s4.ax1x.com/2022/01/14/78t1fg.png'
  },
  {
    url: 'https://s4.ax1x.com/2022/01/14/739dAg.png',
    thumbnail: 'https://s4.ax1x.com/2022/01/14/78tltS.png'
  },
  {
    url: 'https://s4.ax1x.com/2022/01/14/739UHS.png',
    thumbnail: 'https://s4.ax1x.com/2022/01/14/78tGlj.png'
  },
  {
    url: 'https://s4.ax1x.com/2022/01/14/739tnf.png',
    thumbnail: 'https://s4.ax1x.com/2022/01/14/78tJ6s.png'
  },
  {
    url: 'https://s4.ax1x.com/2022/01/14/739JjP.png',
    thumbnail: 'https://s4.ax1x.com/2022/01/14/78tYXn.png'
  },
  {
    url: 'https://s4.ax1x.com/2022/01/14/739wNQ.png',
    thumbnail: 'https://s4.ax1x.com/2022/01/14/78tNmq.png'
  },
  {
    url: 'https://s4.ax1x.com/2022/01/14/7390hj.png',
    thumbnail: 'https://s4.ax1x.com/2022/01/14/78tU00.png'
  },
  {
    url: 'https://s4.ax1x.com/2022/01/14/739D9s.png',
    thumbnail: 'https://s4.ax1x.com/2022/01/14/78ta7V.png'
  },
  {
    url: 'https://s4.ax1x.com/2022/01/14/739r3n.png',
    thumbnail: 'https://s4.ax1x.com/2022/01/14/78twkT.png'
  },
  {
    url: 'https://s4.ax1x.com/2022/01/14/739scq.png',
    thumbnail: 'https://s4.ax1x.com/2022/01/14/78t0tU.png'
  },
  {
    url: 'https://s4.ax1x.com/2022/01/14/739yj0.png',
    thumbnail: 'https://s4.ax1x.com/2022/01/14/78tBhF.png'
  },
  {
    url: 'https://s4.ax1x.com/2022/01/14/739cuV.png',
    thumbnail: 'https://s4.ax1x.com/2022/01/14/78trp4.png'
  },
  {
    url: 'https://s4.ax1x.com/2022/01/14/739gBT.png',
    thumbnail: 'https://s4.ax1x.com/2022/01/14/78ts1J.png'
  }
];

export default {
  shareFriendInfo,
  shareTimelineInfo,
  maskList
};
