# Painter

仓库地址：https://github.com/Kujiale-Mobile/Painter

原仓库是原生微信小程序框架，部分需求不满足，所以修改了部分代码。

## 回调事件

修改原因：`Taro` 触发原生组件事件只能是 `xxx-yyy` 的格式，不能是 `xxxYYY` 格式。

修改内容：`painter.js` 文件中调用 `triggerEvent()` 触发的事件全部修改为 `xxx-yyy` 格式。
