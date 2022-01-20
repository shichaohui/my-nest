import * as _ from 'dot-template-types';
import path from 'path';

export default function(source: _.Source): _.IDtplConfig {
  const { dirName, rawModuleName, fileName, rootPath } = source.basicData;
  return {
    templates: [
      // 页面模板配置
      {
        name: 'template/page',
        matches: function() {
          if (!source.isDirectory) return false;
          if (!/^pages?$/.test(dirName)) return false;
          if (!/^[a-z]/.test(rawModuleName)) return false;
          return true;
        },
        inject: function() {
          return [
            // 向 app.config.ts 中插入页面地址
            {
              file: path.join(rootPath, 'src/app.config.ts'),
              data: {
                page: `'${dirName}/${rawModuleName}/index',`
              },
              tags: 'loose',
              append: true
            }
          ];
        }
      },
      // 组件模板配置
      {
        name: 'template/component',
        matches: function() {
          if (!source.isDirectory) return false;
          if (!/^components?$/.test(dirName)) return false;
          if (!/^[A-Z]/.test(rawModuleName)) return false;
          return true;
        }
      }
    ],
    globalData: {
      projectName: 'my-nest',
      // React 组件名称
      reactComponentName: `${fileName[0].toUpperCase()}${fileName.slice(1)}`
    }
  };
}
