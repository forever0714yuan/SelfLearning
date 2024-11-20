---
sidebar: auto
---

# CSS 基础选择器

- 能够使用**基础选择器**选中自己希望修改的元素
- 能够使用**字体和文本样式**修改外观，包括：字体、字号、颜色等
- 能够知道 CSS 的**引用方式**及区别
- **能够知道 Chrome 调试工具的基本使用**

## 本章任务

- 使用 CSS 美化新闻详情页面

## CSS 介绍和基本使用

## CSS 简介

CSS 是**层叠样式表** ( **C**ascading **S**tyle **S**heets ) 的简称，是一种**样式表**语言用来设置网页的**外观**和**布局**。例如，更改内容的字体，颜色，大小和间距，将其拆分为多个列，或添加动画和其他装饰功能。

[**层叠**](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Cascade)是 CSS 的一个基本特征，它是一个定义了如何合并来自多个源的属性值的算法。它在 CSS 处于核心地位，CSS 的全称层叠样式表正是强调了这一点。

CSS 让我们的网页更加丰富多彩，布局更加灵活自如。简单理解：**HTML 提供网页的结构**，**CSS 用来美化 HTML** , 让 HTML 更漂亮， 让页面布局更简单。

## CSS 基本使用

### 书写位置

所有的样式，都包含在 `<style>` 标签内，表示是样式表。`<style>`一般写到 `</head>` 上方

```html
<head>
  ……
  <style>
    /* style 标签中书写 CSS 注释 */
    /* 此处书写 CSS 代码 */
  </style>
</head>
```

### CSS 语法格式

CSS 规则由两个主要的部分构成

- 选择器：要改哪些标签的样式
- 样式声明：设置的外观

![image.png](https://cdn.nlark.com/yuque/0/2022/png/532803/1641436749630-2aa7c760-7435-41bd-88a2-e777e35049d0.png#averageHue=%23abcb4f&clientId=u0adc9954-ccdb-4&crop=0&crop=0&crop=1&crop=1&from=paste&id=wNdXm&margin=%5Bobject%20Object%5D&name=image.png&originHeight=120&originWidth=570&originalType=url&ratio=1&rotation=0&showTitle=false&size=66844&status=done&style=none&taskId=ufc5c87c8-872f-4fcc-bdce-2d8470e5dc2&title=)

- 使用 `{}` 包含一个或多个样式声明；
- 每条样式声明以键值对形式出现：`属性: 值`；
- 属性和值之间使用 `:` 分隔；
- 属性之间使用 `;` 分隔，最后一行的分号可以省略。

### CSS 示例

```css
<style>
  p {
    color: red;
    font-size: 24px;
  }
</style>
```

> 注意：CSS 中数值都需要加单位

# CSS 基础选择器

CSS 中**选择器的作用**是用来**找到需要**设置外观/布局的 **HTML 标签**，CSS 中选择器的种类非常多，本章先来学习 CSS 中的**基础选择器**：标签选择器、类选择器、id 选择器和通配符选择器

选择器文档：[https://www.runoob.com/cssref/css-selectors.html](https://www.runoob.com/cssref/css-selectors.html)

## 标签选择器

标签选择器（元素选择器）是指用 HTML 标签名称作为选择器，按标签名称分类，为页面中某一类标签指定统一的 CSS 样式。

### 语法

```css
标签选择器 {
	CSS属性: 属性值;
  ……
}
```

### 示例

使用 color 和 font-size 分别修改素材代码中的 h3 和 li 标签中的颜色和文字大小

```html
<h3>任职要求</h3>
<ol>
  <li>对 Vue 前端框架有深入应用并深入理解其设计原理；</li>
  <li>精通 HTML、CSS 技术，有页面制作（切图）经验；</li>
  <li>精通 JavaScript、TypeScript 编程，有丰富的程序开发经验；</li>
  <li>有移动端 Web 开发或微信小程序开发经验，能独立开发，并进行性能优化；</li>
  <li>熟悉前端工程化开发，精通 webpack 配置。</li>
</ol>
```

## 类选择器

标签选择器只能对所有标签做统一的样式设置，如果想要差异化选择不同的标签，单独选一个或者某几个标签，可以使用类选择器

### 语法

```css
.类名 {
	CSS属性: 属性值;
  ……
}
```

> 类选择器以 . 开头
> 想要应用该样式的标签需要通过标签的 class 属性设置该类名
> **可以为不同标签设置相同类名** > **可以为同一个标签设置多个不同类名**

### 示例 1

- 定义 `hot` 类表示热销书籍类；
- 使用 `color` 和 `font-size` 定义热销数据的颜色和文字大小；
- 在素材代码中应用类选择器突入显示热销书籍。

```html
<ul>
  <li>HTML 入门到精通</li>
  <li>CSS 布局指南</li>
  <li>JavaScript 犀牛书</li>
  <li>你不知道的 JavaScript</li>
</ul>
<div>不同标签页可以设置相同类名</div>
```

> 不同标签可以设置相同类名

### 示例 2

- 准备三个 `div` 盒子，分别包含文字：红色、绿色、红色
- 定义两个类：`red` 和 `green`，定义盒子宽度 width、高度 height 和背景颜色 background-color
- 应用类控制盒子的显示

```css
.red {
  width: 100px;
  height: 100px;
  /* 背景颜色 */
  background-color: red;
}

.green {
  width: 100px;
  height: 100px;
  background-color: green;
}
```

> div 默认占一整行，但是如果没有指定宽度和高度并且 div 中没有内容，那么，
>
> - div 宽度是浏览器的宽度
> - div 高度是 0

### 同一元素使用多类名

我们可以给一个标签指定多个类名，从而达到更多的选择目的。 这些类名都可以选出这个标签. 简单理解就是一个标签有多个名字.<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/532803/1641439240562-b34c7657-0289-4776-b405-1ea415dd4403.png#averageHue=%23156655&clientId=u0adc9954-ccdb-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=566&id=Dn8ff&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1132&originWidth=1917&originalType=binary&ratio=1&rotation=0&showTitle=false&size=888347&status=done&style=none&taskId=ued9083c4-6ad9-48a5-8683-93c1ac2d812&title=&width=958.5)

- 代码演示

```css
.box {
  width: 150px;
  height: 100px;
  font-size: 30px;
}
.red {
  /* 背景颜色 */
  background-color: red;
}
.green {
  background-color: green;
}
```

```html
<div class="box red">红色</div>
<div class="box green">绿色</div>
<div class="box red">红色</div>
```

> 类命名规则见附录

## id 选择器

id 选择器可以为标有特定 id 的 HTML 元素指定特定的样式。 HTML 元素以 id 属性来设置 id 选择器，CSS 中 id 选择器以"#" 开头

- id 选择器的作用是唯一匹配页面上的某一个元素

```css
#box {
  color: red;
}
```

```html
<div>我是第一个盒子</div>
<div>我是第二个盒子</div>
<div>我是唯一的盒子</div>
```

> 如果在 HTML 中给多个元素设置相同的 id 值，id 选择器是可以同时修改这些元素的样式的，但是我们应该避免这么做

## 通配符选择器

- 通配符选择器：\*
- 通配符选择器的作用是用来匹配页面上所有的元素
- 浏览器在解释 HTML 时，会把通配符选择器中定义的样式应用到页面中的每一个元素

```css
/* 页面上所有元素文字都显示成红色 */
* {
  color: red;
}
```

## 总结

| **基础选择器**    | **作用**     | **特点**                 | **使用频率**           |
| ----------------- | ------------ | ------------------------ | ---------------------- |
| 标签选择器        | 选出相同标签 | 不能差异化选择           | 较多                   |
| 类选择器(`.`)     | 按需选择标签 | 根据需求选择             | **非常多**             |
| id 选择器(`#`)    | 选中唯一标签 | 针对唯一标签             | 通常与 JavaScript 联用 |
| 通配符选择器(`*`) | 选中所有标签 | 选择的太多，有部分不需要 | 特殊情况使用           |

# 字体属性

字体常用属性列表

| **属性**    | **含义** | **注意事项**                                               |
| ----------- | -------- | ---------------------------------------------------------- |
| font-size   | 字号     | 但是通常是 px（像素），一定要有单位                        |
| font-family | 字体     | 工作中按照团队约定即可                                     |
| font-weight | 字重     | 700 加粗 / 400 普通 不带单位                               |
| font-style  | 字体样式 | `italic` 斜体 / `normal` 正常<br />把 `em` 改成不倾斜      |
| font        | 连写     | `font-style font-weight font-size/line-height font-family` |

## font-size

- CSS 使用 font-size 属性定义字体大小

```css
p {
  font-size: 20px;
}
```

- px（像素）大小是我们网页的最常用的单位
- 谷歌浏览器默认的文字大小为 16px
- 不同浏览器可能默认显示的字号大小不一致，我们尽量给一个明确值大小，不要默认大小
- 可以给 body 指定整个页面文字的大小
- 查看浏览器中字体的默认大小

![image.png](https://cdn.nlark.com/yuque/0/2022/png/532803/1641452771878-43d7970a-615f-4141-9b90-731c2cd42744.png#averageHue=%23828b6c&clientId=u4b3d0a12-ceb4-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=274&id=ycDP8&margin=%5Bobject%20Object%5D&name=image.png&originHeight=548&originWidth=494&originalType=binary&ratio=1&rotation=0&showTitle=false&size=47664&status=done&style=none&taskId=u7e2f7a79-205f-4fc0-a817-afcec519278&title=&width=247)

## font-family

- CSS 使用 font-family 属性定义文本的字体系列

```css
h2 {
  font-family: '微软雅黑';
}
p {
  /* font-family: 'Microsoft YaHei', Arial, Helvetica, sans-serif; */
  font-family: 'Times New Roman', Times, serif;
}
```

- 各种字体之间必须使用英文状态下的逗号隔开
- 一般情况下,如果有空格隔开的多个单词组成的字体,加引号
- 尽量使用系统默认自带字体，保证在任何用户的浏览器中都能正确显示
- 推荐给 body 设置字体，字体最常见的几个字体：

```css
body {
  font-family: 'Microsoft YaHei', tahoma, arial, 'Hiragino Sans GB';
}
```

## font-weight

- CSS 使用 font-weight 属性设置文本字体的**粗细**

```css
p {
  font-weight: bold;
}
```

- 可选值
  | **属性值** | **描述** |
  | --- | --- |
  | **normal** | 默认值，不加粗 |
  | **bold** | 定义粗体，加粗显示 |
  | 100-900 | 400 等同于 normal，700 等同于 bold，注意没有单位 |

## font-style

CSS 使用 font-style 属性设置文本的风格

```css
p {
  font-style: normal;
}
```

- 可选值
  | 属性值 | 描述 |
  | --- | --- |
  | normal | 默认值，显示标准的字体样式 |
  | italic | **斜体**的字体样式 |

## font

当我们想同时设置字体的时候，例如：

```css
#box {
  font-size: 2em;
  font-family: 'Courier New', Courier, monospace;
  font-weight: bold;
  font-style: italic;
}
```

这里会稍显麻烦，CSS 还提供给我们一个 font 属性，简化这种操作<br />font 属性是一个**复合属性**，通过 font 属性可以设置所有字体属性

```css
body {
  font: font-style font-weight font-size/line-height font-family;
}

body {
  font: italic bold 16px 'Microsoft yahei';
}
```

- font 简写属性在一个声明中设置所有字体属性。
- 可设置的属性是（按顺序）： "font-style font-weight font-size/line-height font-family"
- font-size 和 font-family 的值是必需的。如果缺少了其他值，默认值将被插入
- 注意： line-height 属性设置行与行之间的空间。

# 文本属性

常用文本属性列表

| **属性**        | **含义** | **注意事项**                                         |
| --------------- | -------- | ---------------------------------------------------- |
| color           | 颜色     | #fff / rgba(r, g, b, 透明度)                         |
| text-align      | 对齐     | left / right / center                                |
| text-indent     | 首行缩进 | text-indent: 2em;                                    |
| text-decoration | 文本修饰 | text-decoration: underline; / text-decoration: none; |
| line-height     | 行高     | 行高等于盒子高度会垂直居中                           |

## color

color 属性用于定义文本的颜色

```css
div {
  color: red;
}
```

- 可选值
  | **属性值** | **描述** |
  | --- | --- |
  | red/green 等 | 预定义的颜色值 |
  | #FF0000/#FF6600 | 十六进制，计算机中的颜色的三原色（红绿蓝） #FF(红) 00(绿) 00(蓝) |
  | rgb(255, 0, 0)/rgb(100%, 0%, 0%) | RGB 代码 |
  | rgba(255, 0, 0, 0.5) | RGBA 类似于 RGB，最后的 A 代表透明度，取值范围 0~1 |

## text-align

text-align 属性用于设置元素内文本内容的**水平对齐**方式

```css
div {
  text-align: center;
}
```

- 可选值
  | **属性值** | **描述** |
  | --- | --- |
  | left | 左对齐，默认值 |
  | right | 右对齐 |
  | center | 居中对其 |

## text-indent

text-indent 属性用于设置元素内文本内容的缩进距离<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/532803/1641455581387-21694623-072c-4459-ab20-cf28b0903b7b.png#averageHue=%23f1efed&clientId=u4b3d0a12-ceb4-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=283&id=dwb3B&margin=%5Bobject%20Object%5D&name=image.png&originHeight=566&originWidth=1232&originalType=binary&ratio=1&rotation=0&showTitle=false&size=168900&status=done&style=none&taskId=uad38935c-74db-4c04-9b71-f35da0188ac&title=&width=616)

```css
div {
  text-indent：20px;
}
div {
  text-indent：2em;
}
```

> em 是一个相对单位，就是当前元素（font-size) 1 个文字的大小, 如果当前元素没有设置大小，则会按照父元素的 1 个文字大小。

## text-decoration

text-decoration 是**文本修饰**属性，可以给文本添加上划线、下划线、删除线

```css
div {
  text-decoration：underline;
}
```

- 可选值
  | **属性值** | **描述** |
  | --- | --- |
  | none | 没有装饰线，**默认值** |
  | **underline** | 下划线，超链接 a 默认具有下划线 |
  | overline | 上划线，几乎不用 |
  | line-through | 删除线，不常用 |

- 取消 a 标签的下划线

```css
a {
  text-decoration：none;
}
```

## line-height

line-height 属性用于设置行间的距离（行高）。可以控制文字行与行之间的距离

```css
p {
  line-height: 26px;
}
```

** 行高**的文本分为 上间距 文本高度 下间距 = 行间距

![image.png](https://cdn.nlark.com/yuque/0/2022/png/532803/1641457010004-fbcd57de-ad3b-4728-bc84-e0b3c37b536d.png#averageHue=%23d3d1cf&clientId=u4b3d0a12-ceb4-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=229&id=jYM9g&margin=%5Bobject%20Object%5D&name=image.png&originHeight=350&originWidth=739&originalType=binary&ratio=1&rotation=0&showTitle=false&size=59625&status=done&style=none&taskId=u15f5a607-e53d-47c7-b5bd-487c54cd7ff&title=&width=484.5000305175781)

# 三种引入方式

按照 CSS 样式书写的位置（或者引入的方式），CSS 样式表可以分为三大类： 行内样式、内部样式(嵌入样式)、外部样式。

## 行内样式

行内样式表（内联样式表）是在元素标签内部的 style 属性中设定 CSS 样式。适合于修改简单样式

```css
<div style="color: red; font-size: 12px;">疫情无情，人有情</div>
```

- style 是标签的属性，行内样式只能用来控制当前标签的样式，无法重用
- 适合于简单、快速、临时修改样式
- 书写繁琐，并且没有体现出结构与样式相分离的思想，所以不推荐大量使用

## 内部样式

内部样式表（内嵌样式表）是写到 html 页面内部. 是将所有的 CSS 代码抽取出来，单独放到一个 `<style>` 标签中

```css
<style>
  div {
    color: red;
    font-size: 12px;
  }
</style>
```

- style 标签理论上可以放在 HTML 的任何位置，推荐放在 `head` 标签中
- 通过此种方式，可以方便控制当前整个页面中的元素样式设置
- **代码结构清晰**，但是并没有实现**结构与样式完全分离**

## 外部样式

实际开发都是外部样式表. 适合于样式比较多的情况. 核心是:样式单独写到 **CSS 文件**中，之后把 CSS 文件引入到 HTML 页面中使用

- 引入外部样式表分为两步：
  - 新建一个后缀名为 .css 的样式文件，把所有 CSS 代码都放入此文件中
  - 在 HTML 页面中，使用 link 标签引入这个文件

```html
<link rel="stylesheet" href="css文件路径" />
```

## 总结

| **样式表** | **优点**           | **缺点**       | **使用频率** | **控制范围**   |
| ---------- | ------------------ | -------------- | ------------ | -------------- |
| 行内       | 书写方便，权重高   | 结构样式混合   | 低           | 控制一个标签   |
| 内部       | 部分结构和样式分离 | 没有彻底分离   | 较多         | 控制一个页面   |
| **外部**   | 完全结构和样式分离 | 需要 link 引入 | 多           | 可以被多处复用 |

# 综合案例

## Chrome 调试工具

- 改变颜色、字体大小等
- 使用吸管工具取色

## 新闻详情页

- 演示效果

![image.png](https://cdn.nlark.com/yuque/0/2022/png/532803/1641457974941-3867753c-e485-4c72-bdfd-4ae01fec8fdd.png#clientId=u4b3d0a12-ceb4-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=890&id=V2kQS&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1779&originWidth=1695&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1451426&status=done&style=none&taskId=uc2805a43-8cbc-4c96-8b73-45dd6017c74&title=&width=847.5)

- 提供内容

```html
<h1>北方高温明日达鼎盛 京津冀多地地表温度将超60℃</h1>
<div>
  2022-06-03 16:31:47 来源: <a href="#">中国天气网</a>
  <input type="text" placeholder="请输入查询条件..." />
  <button class="btn">搜索</button>
</div>
<hr />
<p>
  中国天气网讯
  今天（3日），华北、黄淮多地出现高温天气，截至下午2点，北京、天津、郑州等地气温突破35℃。预报显示，今后三天（3-5日），这一带的高温天气将继续发酵，高温范围以及强度将在4日达到鼎盛，预计北京、天津、石家庄、济南等地明天的最高气温有望突破38℃，其中北京和石家庄的最高气温还有望创今年以来的新高。
</p>

<h4>气温41.4℃！地温66.5！北京强势迎七月首个高温日</h4>
<p>
  <img src="images/pic.jpeg" alt="" />
</p>
<p>
  今天，华北、黄淮一带的高温持续发酵，截至今天下午2点，陕西北部、山西西南部、河北南部、北京、天津、山东西部、河南北部最高气温已普遍超过35℃。大城市中，北京、天津、郑州均迎来高温日。
</p>

<p>
  在阳光暴晒下，地表温度也逐渐走高。今天下午2点，华北黄淮大部地区的地表温度都在50℃以上，部分地区地表温度甚至超过60℃。其中，河北衡水地表温度高达68.3℃，天津站和北京站附近的地表温度分别高达66.6℃和66.5℃。
</p>

<h4>明日热度再升级！京津冀携手冲击38℃+</h4>
<p>
  中国天气网气象分析师王伟跃介绍，明天（4日），华北、黄淮地区35℃以上的高温天气还将继续升级，并进入鼎盛阶段，高温强度和范围都将发展到最强。
  明天，北京南部、天津大部、河北中部和南部、山东中部和西部、山西南部局地、河南北部、东北部分地区的最高气温都将达到或超过35℃。
</p>

<p>
  不过，专家提醒，济南被雨水天气完美绕开，因此未来一周，当地的高温还会天天上岗。在此提醒当地居民注意防暑降温，防范持续高温带来的各种不利影响。（文/张慧
  数据支持/王伟跃 胡啸 审核/刘文静 张方丽）
</p>

<p>本文来源：中国天气网 责任编辑：刘京_NO5631</p>
```

# 附录

## 类命名规则

| **功能**                 | **建议命名**        |
| ------------------------ | ------------------- |
| 头                       | header              |
| 内容                     | content / container |
| 尾                       | footer              |
| 导航                     | nav                 |
| 侧栏                     | sidebar             |
| 栏目                     | column              |
| 页面外围控制整体布局宽度 | wrapper             |
| 左右中                   | left right center   |
| 登录条                   | loginbar            |
| 标志                     | logo                |
| 广告                     | banner              |
| 页面主体                 | main                |
| 热点                     | hot                 |
| 新闻                     | news                |
| 下载                     | download            |
| 子导航                   | subnav              |
| 菜单                     | menu                |
| 子菜单                   | submenu             |
| 搜索                     | search              |
| 友情链接                 | friendlink          |
| 页脚                     | footer              |
| 版权                     | copyright           |
| 滚动                     | scroll              |
| 内容                     | content             |
| 标签页                   | tab                 |
| 文章列表                 | list                |
| 提示信息                 | msg                 |
| 小技巧                   | tips                |
| 栏目标题                 | title               |
| 加入                     | joinus              |
| 指南                     | guild               |
| 服务                     | service             |
| 注册                     | regsiter            |
| 状态                     | status              |
| 投票                     | vote                |
| 合作伙伴                 | partner             |

# 作业

## 练习 1：个人简历

### 效果演示

![image.png](https://cdn.nlark.com/yuque/0/2022/png/532803/1644931652912-2b1ea39b-06a3-4ef5-af8b-901932952080.png#clientId=u862cc29c-fbfa-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=819&id=GWJWB&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1638&originWidth=1262&originalType=binary&ratio=1&rotation=0&showTitle=false&size=360556&status=done&style=none&taskId=u7b9ae8e1-c8fd-4949-b981-55b72641068&title=&width=631)

### 提供内容

```
专业简历
	个人信息
				个人信息
				姓名：张三  &nbsp;&nbsp;
				年龄：29 &nbsp;&nbsp;
				电话：135xxx9999 &nbsp;&nbsp;
				邮箱：zhangsan@163.com

				求职意向
				从事职业：全栈工程师 &nbsp;&nbsp;
				期望月薪：15k-18k

				教育背景
				学校名称：河北工程大学 &nbsp;&nbsp;
				就读时间：2019.07-2022.10 &nbsp;&nbsp;
				所学专业：计算机科学与技术

				证书
				舞蹈大赛一等奖
				十佳学习标兵
				歌唱比赛三等奖
				优秀读者
				优秀实习生

	工作经历

		大一和大二期间，在学院组织部任职，虽然管理的是学生，但锻炼了我的组织能力。大一到大三我都是校报记者团成员，发表了20篇稿子，这很好地锻炼了我的文笔，大三暑假我在一家传媒公司实习了三个月，实习职位是文案策划，这次实习我的收获很大，无论是在工作经验上，还是在为人处事上，我觉得这为我以后的职业生涯打下了很好的基础。现在，我想找一份文案策划工作，我在实习期间对文案策划这个职位的工作内容有了一定的了解，我很喜欢这样的工作，三个月的实习也算是一种工作经验。


	20XX/4 — 20XX/6：XX有限公司[1年2个月]
　　所属行业：检测/认证
　　实验室　　质量管理编制员
　　1、协助项目工程质量管理体系的策划、质量管理的标准、制度、程序和作业文件的编制。
　　2、对项目材料专业的建设方主体质量行为和实体工程质量监督检查。
　　3、负责对承包商、监理、设备监造、独立无损检测单位质量管理文件的审查。
　　20XX/6 — 20XX/3：XX有限公司[9个月]
　　所属行业：检测/认证
　　实验室　　工程监理
　　1、对项目材料专业的建设方主体质量行为和实体工程质量监督检查。
　　2、负责对承包商、监理、设备监造、独立无损检测单位质量管理文件的审查。
　　3、负责工程项目实施过程的质量文件和工程归档资料的审查。

	自我评价

		本人性格开朗、稳重、有活力，待人热情、真诚；工作认真负责，积极主动，能吃苦耐劳，用于承受压力，勇于创新；有很强的组织能力和团队协作精神，具有较强的适应能力；纪律性强，工作积极配合；意志坚强，具有较强的无私奉献精神。

		对待工作认真负责，善于沟通、协调有较强的组织能力与团队精神；活泼开朗、乐观上进、有爱心并善于施教并行；上进心强、勤于学习能不断提高自身的能力与综合素质。在未来的工作中，我将以充沛的精力，刻苦钻研的精神来努力工作，稳定地提高自己的工作能力，与企业同步发展。

```

## 练习 2：模仿百度首页

### 效果演示

![image.png](https://cdn.nlark.com/yuque/0/2022/png/532803/1644931833148-aab2ddce-a957-4b7e-ac59-f54e69b061b7.png#clientId=u862cc29c-fbfa-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=399&id=tZk9p&margin=%5Bobject%20Object%5D&name=image.png&originHeight=495&originWidth=675&originalType=binary&ratio=1&rotation=0&showTitle=false&size=17298&status=done&style=none&taskId=uca7bd355-3261-4036-a07b-279bdb2f008&title=&width=543.5)

### 提供内容

![image.png](https://cdn.nlark.com/yuque/0/2022/png/532803/1644931891027-0f9cf619-7dc3-4bb3-9d20-8361e88c91ad.png#clientId=u862cc29c-fbfa-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=65&id=Ar3Uo&margin=%5Bobject%20Object%5D&name=image.png&originHeight=129&originWidth=270&originalType=binary&ratio=1&rotation=0&showTitle=false&size=3358&status=done&style=none&taskId=ue9bfc600-91b3-47a3-aac5-2bbd37402fb&title=&width=135)
