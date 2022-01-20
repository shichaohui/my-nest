export default {
  pages: [
    /*# INJECT_START {"key": "page"} #*/
    'pages/index/index',
    'pages/wxAvatar/index',
    /*# INJECT_END #*/
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
  usingComponents: {
    painter: './painter/painter',
  },
};
