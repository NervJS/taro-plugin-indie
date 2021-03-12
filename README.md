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

### 使用 blended 模式编译项目

详情请看文档：原生项目使用 Taro —— 把 Taro 项目作为一个完整分包

