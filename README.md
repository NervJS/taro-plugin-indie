# @tarojs/plugin-indie

> 在原生项目的分包中使用一个完整的 Taro NEXT 项目，Taro 项目需要使用此插件

## 安装

在 Taro 项目根目录下安装

```bash
$ npm i @tarojs/plugin-indie --save
```

## 使用

### 引入插件

请确保 Taro CLI 已升级至 Taro `3.0.25+` 的最新版本。

修改项目 `config/index.js` 中的 plugins 配置为如下

```js
const config = {
  ...
  plugins: [
    '@tarojs/plugin-indie'
  ]
  ...
}
```

### 配置项

插件可以接受如下参数：

| 参数项 | 类型 | 用途 |
| :-----| :---- | :---- |
| pathStyleImportWithCustomRule | function | 自定义插件样式处理规则 |

#### 1. pathStyleImportWithCustomRule

插件支持自定义小程序样式处理规则。

由于小程序作为独立分包时，每个页面都需要单独引用 app.wxss，否则会出现全局样式丢失的情况。

因此在插件中会判断页面的样式文件，进行引用的插入，目前判断条件仅为 `filename.startsWith('pages')`，为了防止后续需要调整这个判断规则，因此增加此钩子，供用户自行调整规则，**需要注意的是，如果设置此配置项，则默认的判断条件会被覆盖。**

```js
const config = {
  ...
  plugins: [
    ['@tarojs/plugin-indie', {
      pathStyleImportWithCustomRule: (filename) => {
        return filename !== 'app.wxss' && filename !== 'common.wxss'
      }
    }]
  ]
  ...
}
```

### 使用 blended 模式编译项目

详情请看文档：原生项目使用 Taro —— 把 Taro 项目作为一个完整分包

