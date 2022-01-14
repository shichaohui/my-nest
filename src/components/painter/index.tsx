import { FC } from '@tarojs/taro';
import { CSSProperties } from 'react';

export type IViewType = 'rect' | 'text' | 'image' | 'qrcode';

export interface IView {
  type: IViewType;
  text?: string;
  url?: string;
  id?: string;
  /** 事实上painter中view的css属性并不完全与CSSProperties一致。 */
  /** 有一些属性painter并不支持，而当你需要开启一些“高级”能力时，属性的使用方式也与css规范不一致。 */
  /** 具体的区别我们将在下方对应的view介绍中详细讲解，在这里使用CSSProperties仅仅是为了让你享受代码提示 */
  css?: CSSProperties;
}

export interface IPalette {
  // 整个模版的背景，支持网络图片的链接、纯色和渐变色
  background?: string;
  width: string;
  height: string;
  borderRadius?: string;
  views: Array<IView>;
}

export interface ICustomActionStyle {
  // 动态编辑选择框的边框样式
  border: string;
  scale: {
    // 文字view所使用的缩放图标图片
    textIcon: string;
    // 图片view所使用的缩放图标图片
    imageIcon: string;
  };
  delete: {
    // 删除图标图片
    icon: string;
  };
}

/** 动态模版， view 被更新，可从 e.detail.view 获取更新的 view */
export type IPainterViewUpdateEvent = {
  detail: {
    view: IView;
  };
};

/** 动态模版， view 被选中， 可从 e.detail.view 获取点击的 view，如为空，则是选中背景 */
export type IPainterViewClickedEvent = {
  detail: {
    view?: IView;
  };
};

/** 动态模版，触碰结束。只有 view，代表触碰的对象；包含 view、type、index，代表点击了删除 icon */
export type IPainterViewTouchEndEvent = {
  detail: {
    view: IView;
    type?: IViewType;
    index?: number;
  };
};

/** 生成图片成功 */
export type IPainterImgOKEvent = {
  detail: {
    path: string;
  };
};

/** 生成图片失败 */
export type IPainterImgErrEvent = {
  detail: {
    error: any;
  };
};

export interface PainterProps {
  /** canvas 的自定义样式 */
  customStyle?: string;
  /** 静态模版 */
  palette?: IPalette;
  /** 缩放比，会在传入的 palette 中统一乘以该缩放比，作用和 widthPixels 类似，所以不要同时使用 */
  scaleRatio?: number;
  /** 生成的图片的像素宽度，如不传则根据模版动态生成 */
  widthPixels?: number;
  /** 是否启用脏检查，默认 false */
  dirty?: boolean;
  /** 是否开启 LRU 机制，默认 false */
  LRU?: boolean;
  /** 动态模版，规范同静态模版 */
  dancePalette?: IPalette;
  /** 选择框、缩放图标、删除图标的自定义样式与图片 */
  customActionStyle?: ICustomActionStyle;
  /** 动态编辑内容，用于刷新动态模版 */
  action?: IView;
  /** 禁止动态编辑操作	，默认 false */
  disableAction?: boolean;
  /** 清除动态编辑框	，默认 false */
  clearActionBox?: boolean;
  /** 动态模版， view 被更新 */
  onViewUpdate?: (event: IPainterViewUpdateEvent) => void;
  /** 动态模版， view 被选中 */
  onViewClicked?: (event: IPainterViewClickedEvent) => void;
  /** 动态模版，触碰结束。 */
  onTouchEnd?: (event: IPainterViewTouchEndEvent) => void;
  /** 动态模版，绘制结束时触发 */
  onDidShow?: () => void;
  /** 是否使用 canvas2d 接口（注意！使用 use2D 就无法使用 dancePalette 与 action） */
  use2D?: boolean;
  /** 图片生成成功 */
  onImgOK?: (event: IPainterImgOKEvent) => void;
  /** 图片生成失败 */
  onImgErr?: (event: IPainterImgErrEvent) => void;
}

const Painter: FC<PainterProps> = props => {
  const {
    customStyle,
    palette,
    scaleRatio,
    widthPixels,
    dirty,
    LRU,
    dancePalette,
    customActionStyle,
    action,
    disableAction,
    clearActionBox,
    onViewUpdate,
    onViewClicked,
    onTouchEnd,
    onDidShow,
    use2D,
    onImgOK,
    onImgErr
  } = props;

  return (
    // @ts-ignore
    <painter
      customStyle={customStyle}
      palette={palette}
      scaleRatio={scaleRatio}
      widthPixels={widthPixels}
      dirty={dirty}
      LRU={LRU}
      dancePalette={dancePalette}
      customActionStyle={customActionStyle}
      action={action}
      disableAction={disableAction}
      clearActionBox={clearActionBox}
      onViewUpdate={onViewUpdate}
      onViewClicked={onViewClicked}
      onTouchEnd={onTouchEnd}
      onDidShow={onDidShow}
      use2D={use2D}
      onImgOK={onImgOK}
      onImgErr={onImgErr}
    />
  );
};

export default Painter;
