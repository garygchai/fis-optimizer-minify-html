# fis-optimizer-minify-html

html内联js和css代码FIS压缩插件

### 功能描述

压缩html内联css和js

### 如何安装

```
npm install -g fis-optimizer-minify-html
```

### 配置使用

```
//fis-conf.js
fis.config.set('modules.optimizer', {
	html: 'uglify-html'
});
```