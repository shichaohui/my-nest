import Taro, { useShareAppMessage, useShareTimeline } from '@tarojs/taro';
import { FC, useCallback } from 'react';
import { ITouchEvent, Text, View } from '@tarojs/components';
import style from './index.module.scss';

// 工具列表
const toolList: Tool[] = [
  {
    name: '微信头像',
    desc: '快速生成符合节日气氛的微信头像',
    page: '/pages/wxAvatar/index'
  }
];

/**
 * 首页
 */
const Index: FC<{}> = () => {
  // 分享给好友
  useShareAppMessage(() => ({
    title: '狗窝Sch：生活中便捷小工具'
  }));

  // 分享到朋友圈
  useShareTimeline(() => ({
    title: '狗窝Sch：生活中便捷小工具'
  }));

  // 点击工具
  const handleClickTool = useCallback((event: ITouchEvent) => {
    const { index } = event.currentTarget.dataset;
    const { page } = toolList[index];
    Taro.navigateTo({
      url: page
    });
  }, []);

  return (
    <View className={style.page}>
      {toolList.map((tool, index) => (
        <View
          key={tool.name}
          className={style.tool}
          data-index={index}
          onClick={handleClickTool}
        >
          <View className={style.name}>{tool.name}</View>
          <Text className={style.desc}>{tool.desc}</Text>
        </View>
      ))}
    </View>
  );
};

export default Index;
