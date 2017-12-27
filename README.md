# gy720.weixin

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 备忘

* 若需要同时打开别的项目，可使用以下命令行启动服务器
```bash
# Window环境
set PORT=3000 && npm run dev

# Unix环境
PORT=3000 npm run dev
```

## 约定

### 一般

* 建议将npm升级到 `@5.0.0` 以上
* 请用 `jsdoc` 为文件做最基本的注释，示例：
```js
  /**
  * Vue Ajax请求插件
  * @author XXX
  * @description 基于fetch封装
  * @version 2017-12-25 （必要时此处注明修改人并阐述主要修改内容）
  */
```
* 全局性图片资源放在 `src/assets` 中，其余图片资源可视情况放置在 `src/assets` 的子目录下，或与相关组件放置在同一目录
* 使用两个空格进行缩进

### CSS

* 在本项目中，请使用 `postcss` 来书写样式
* 采用 `BEM` 命名方式

