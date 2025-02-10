# webpack

webpack是一种前端资源构建工具，一个静态模块打包器。其主要就是用于打包，我们可以将其看做是流水线工厂，我们可以将`js`、`png`、 `jpg`、`sass` 等打包成一个静态资源。

## 起步

### 基本安装

我们需要创建一个目录，**文件目录不能使用中文名**,不然是会报错的。

```shell
mkdir webpack-start
cd webpack-start
npm init -y

npm install webpack webpack-cli --save-dev
```

然后我们创建如下的结构。

```diff
 webpack-start
  |- package.json
  |- package-lock.json
+ |- index.html
+ |- /src
+   |- index.js
```

**src/index.js**

```javascript
function component() {
  const element = document.createElement('div');

  // lodash（目前通过一个 script 引入）对于执行这一行是必需的
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}

document.body.appendChild(component());
```

**index.html**

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>起步</title>
    <script src="https://unpkg.com/lodash@4.17.20"></script>
  </head>
  <body>
    <script src="./src/index.js"></script>
  </body>
</html>
```















