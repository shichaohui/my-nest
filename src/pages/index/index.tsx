import { Component } from 'react';
import { View, Text } from '@tarojs/components';
import style from './index.module.scss';

export default class Index extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className={style.page}>
        <Text>Hello world!</Text>
      </View>
    );
  }
}
