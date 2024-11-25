# 本章目标

- 能够使用 **emmet** 语法提高编码速度
- 能够使用**复合选择器**在 HTML 中定位元素
- 能够理解元素的**几种显示模式**，并通过代码在不同显示模式间转换
- 能够精准控制背景图片的显示和位置

# 本章任务

- 导航栏

# Emmet 语法

Emmet (即之前著名的 _Zen Coding_) 是一个网页开发者工具，可以大大地提高你的 HTML & CSS 开发效率。

中文文档：[http://yanxyz.github.io/emmet-docs/](http://yanxyz.github.io/emmet-docs/)
官方文档：[https://docs.emmet.io/cheat-sheet/](https://docs.emmet.io/cheat-sheet/)

## 快速生成 HTML

<!-- | **功能** | **语法** | **示例**  | **生成代码** |
| -------- | -------- | --------- | ------------ |
| **后代** | >        | div>ul>li | <nav>        |

    <ul>
      <li></li>
    </ul>

  </nav> |
| **兄弟** | + | div+p+ul>li |   <div></div>

  <p></p>
  <ul>
    <li></li>
  </ul> |

| 兄弟 | + | div+div>p>span+em | <div></div>

  <div>
    <p><span></span><em></em></p>
  </div> |

| 上级 | ^ | div+div>p>span+em^b | <div></div>

  <div>
    <p><span></span><em></em></p>
    <b></b>
  </div> |

| **乘法** | * | ul>li*5 | <ul>

<li></li>
<li></li>
<li></li>

  </ul> |
| 自增符号 | $ | ul>li.item$*3 |   <ul>
    <li class="item1"></li>
    <li class="item2"></li>
    <li class="item3"></li>
  </ul> |
| **id和类** | .和# | div#header+div.page | <div id="header"></div>

<div class="page"></div> |

| **文本** | {内容} | div{哈哈哈}>p{这是段落} | <div>哈哈哈

<p>这是段落</p>

  </div> | -->

## 快速生成 CSS

Emmet 能做的只是提供 CSS 属性简写，常用属性大多用英文单词的首字母连写即可

- m10 --> margin: 10px;
- w10 --> width: 10px;
- w10+h10 --> width: 10px; height: 10px;
- bgc:red --> background-color: red;
- tac --> text-align: center;
- lh24px --> line-height: 24px;

## VSCode 格式化

### 格式化快捷键

Shift + Alt +F

### 自动格式化

- Ctrl + , 打开设置
- 选择 Format On Save，保存的时候自动格式化代码

![image.png](https://cdn.nlark.com/yuque/0/2022/png/532803/1641519265139-f936808e-5e6d-4a35-988b-6d27627db5ad.png#clientId=u90bc8d0d-93c6-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=307&id=u96459aeb&margin=%5Bobject%20Object%5D&name=image.png&originHeight=614&originWidth=1502&originalType=binary&ratio=1&rotation=0&showTitle=false&size=85089&status=done&style=none&taskId=u81c61f2d-3c1c-4fb9-943e-a447cc0c6c6&title=&width=751)

# CSS 复合选择器

## 什么是复合选择器

在 CSS 中，可以根据选择器的类型把选择器分为**基础选择器**和**复合选择器**，复合选择器是建立在基础选择器之上，对基本选择器进行组合形成的。

复合选择器是由两个或多个基础选择器，通过不同的方式组合而成的，可以更准确、更高效的选择目标元素（标签）

常用的复合选择器包括：**后代选择器、子选择器、并集选择器、伪类选择器等等**

## 后代选择器

**后代选择器又称为包含选择器**，可以选择父元素里面子元素。其写法就是把外层标签写在前面，内层标签写在后面，中间用空格分隔。当标签发生嵌套时，内层标签就成为外层标签的后代。

- 语法

```css
元素1 元素2 {
	样式声明;
}
```

> 上述语法表示选择元素 1 里面的所有元素 2 (后代元素)。

- 语法说明：

  - 元素 1 和 元素 2 中间用空格隔开
  - 元素 1 是父级，元素 2 是子级，最终选择的是元素 2
  - 元素 2 可以是儿子，也可以是孙子等，只要是元素 1 的后代即可
  - 元素 1 和 元素 2 可以是任意基础选择器

- 示例

```html
<h3>基础选择器</h3>
<div>
  <ul>
    <li>标签选择器</li>
    <li>类选择器</li>
    <li>id 选择器</li>
    <li>通配符选择器</li>
  </ul>
</div>
<h3>复合选择器</h3>
<div class="adv-selector">
  <ul>
    <li>后代选择器</li>
    <li>子代选择器</li>
    <li>并集选择器</li>
    <li>伪类选择器</li>
  </ul>
</div>
```

## 子选择器

子元素选择器（子选择器）只能选择作为某元素的最近一级子元素。

- 语法

```css
元素1 > 元素2 {
	样式声明;
}
```

- 语法说明：
  - 元素 1 和 元素 2 中间用 大于号 隔开
  - 元素 1 是父级，元素 2 是子级，最终选择的是元素 2
  - 元素 2 必须是亲儿子，其孙子、重孙之类都不归他管. 你也可以叫他 亲儿子选择器
- 示例

```html
<div class="nav">
  <a href="#">一级超链接</a>
  <a href="#">一级超链接</a>
  <p><a href="#">二级超链接</a></p>
</div>
```

## 案例

- 将下面 div 中的链接文字修改成红色

```html
<div class="nav">
  <ul>
    <li><a href="#">百度</a></li>
    <li><a href="#">百度</a></li>
  </ul>
</div>

<p><a href="#">baidu</a></p>
```

- 将下面 JavaScript 修改为红色

```html
<div class="hot">
  <a href="#">JavaScript</a>
  <ul>
    <li><a href="#">Python</a></li>
    <li><a href="#">C++</a></li>
  </ul>
</div>
```

## 并集选择器

并集选择器可以选择多组标签, 同时为他们定义相同的样式，通常用于集体声明。并集选择器是各选择器通过英文逗号（,）连接而成，任何形式的选择器都可以作为并集选择器的一部分

- 语法

```css
选择器1,
选择器2 {
  样式声明;
}
```

- 语法说明
  - 元素 1 和 元素 2 中间用逗号隔开
  - 逗号可以理解为和的意思
  - 并集选择器通常用于集体声明
- 示例：将代码中的熊大、熊二和小猪一家改为红色

```html
<div>熊大</div>
<p>熊二</p>
<span>光头强</span>
<ul class="pig">
  <li>小猪佩奇</li>
  <li>猪爸爸</li>
  <li>猪妈妈</li>
</ul>
```

## 伪类选择器

**伪类选择器**用于向某些选择器添加特殊的效果，比如给链接添加特殊效果，或选择第 1 个，第 n 个元素 nth-child

伪类选择器书写最大的特点是用冒号（:）表示，比如 :hover 、 :first-child

### 链接伪类选择器

链接伪类选择器的作用：针对链接的**不同状态设置不同的样式**

| **链接伪类选择器** | **说明**                           |
| ------------------ | ---------------------------------- |
| a:link             | 选择所有未被访问的链接             |
| a:visited          | 选择所有已经被访问的链接           |
| a:hover            | 选择鼠标指针位于其上的链接         |
| a:active           | 选择激活链接（鼠标按下未抬起的链接 |

- 示例

```css
a:link {
  color: #333;
  text-decoration: none;
}

a:visited {
  color: orange;
}

a:hover {
  color: skyblue;
}

a:active {
  color: green;
}
```

- 注意事项
  - 链接伪类选择器的书写顺序： :link :visited :hover :active
    - 记忆方法 LoVe HAte
  - 因为 a 链接在浏览器中具有默认样式，所以我们实际工作中都需要给链接单独指定样式。
- 链接伪类选择器实际工作开发中的写法

```css
a {
  color: #333;
  text-decoration: none;
}

a:hover {
  color: skyblue;
  text-decoration: underline;
}
```

### :focus 伪类选择器

:focus 伪类选择器用于选取获得**焦点的表单元素**。焦点就是光标，一般情况 <input> 类表单元素才能获取

- 示例

```css
input:focus {
  background-color: yellow;
}
```

```html
用&ensp;户&ensp;名：<input type="text" name="username" />

密&emsp;&emsp;码：<input type="password" name="pwd" />

确认密码：<input type="password" name="confimPwd" />
```

## 总结

| **选择器**   | **作用** | **频率** | 用法示例                     |
| ------------ | -------- | -------- | ---------------------------- |
| **后代**     | 找后代   | 较高     | 使用**空格**分隔 `.nav a`    |
| 子代         | 找儿子   | 较少     | 使用 `>`分隔 `.nav>a`        |
| **并集**     | 找大伙   | 较多     | 使用 `,`分隔 `.nav, .header` |
| **链接伪类** | 链接状态 | 较多     | `a:hover`                    |
| LoVe HAte    |          |          |                              |
| focus        | 表单状态 | 较少     | `input:focus`                |

# 元素显示模式

<!-- 元素显示模式就是元素（标签）以什么方式进行显示，比如<div>自己占一行，比如一行可以放多个<span>。 -->

网页的标签非常多，在不同地方会用到不同类型的标签，了解他们的特点可以更好的布局我们的网页。

## 块级元素

- 常见的块级元素

```html
<h1>
  ~
  <h6>
    、
    <p>、</p>
    <div>
      、
      <ul>
        、
        <ol>
          、
          <li></li>
        </ol>
      </ul>
    </div>
  </h6>
</h1>
```

- 块级元素特点
  - **独占一行**
  - 可以设置**宽度**、**高度**、**外边距**、**边框**和**内边距**
  - 宽度默认是父级容器的宽度
  - 可以存放其他行内元素和块级元素
- 块级元素注意事项
  - 开发时不要在文本类块级元素中添加其他元素，专注于文本存放（**h1~h6、p**）
  - **块级元素可以相互嵌套，但是 p 标签中不能嵌套其它块级元素(通过浏览器开发人员工具演示)**

## 行内元素

- 常见的行内元素

```html
<a
  >、<span
    >、<strong
      >、<b
        >、<em
          >、<i
            >、<del
              >、<s
                >、<ins>、<u></u></ins></s></del></i></em></b></strong></span
></a>
```

<!-- > <span> 标签是最典型的行内元素，常用于布局。有的地方也将行内元素称为内联元素。 -->

- 行内元素特点
  - 相邻行内元素在一行显示，一行多个
  - 给行**内元素设置宽高是无效的**
  - 默认宽度是内容的宽度（被内容撑开）
  - 只能容纳文本或其他行内元素
- 行内元素注意事项
  - 行内元素不能嵌套块级元素
  - 链接不能再放链接
  - 特殊情况的链接可以存放块级元素

## 行内块元素

- 常见行内块元素

```html
<img />、<input />、
<td></td>
```

> 它们同时具有块元素和行内元素的特点。

- 行内块元素特点
  - 相邻行内元素在一行显示，一行多个（行内元素特点）
  - 默认宽度就是本身内容的宽度（行内元素特点）
  - 可以设置**宽度**、**高度**、**外边距**、**边框**和**内边距**（块级元素特点）

## 总结

| **元素模式** | **英文**     | **排列方式**       | **指定宽高** |
| ------------ | ------------ | ------------------ | ------------ |
| 块级元素     | block        | 一行一个           | 可以         |
| 行内元素     | inline       | 一行多个，内容撑开 | **不可以**   |
| 行内块元素   | inline-block | 一行多个           | 可以         |

## 显示模式转换

一个模式的元素需要另外一种模式的特性：

- 让行内元素具有宽高：把**行内元素**转换成**块元素**或者**行内块元素**
- 让块元素一行显示：把**块元素**转换成**行内块元素**

<!-- 例如：想要增加链接 <a> 的触发范围 -->

- 转换方式
  - `display: block` 转换为块元素
  - `display: inline-block` 转换为行内块元素
  - `display: inline` 转化为行内元素（使用较少）
- 示例

![image.png](https://cdn.nlark.com/yuque/0/2022/png/532803/1641522486452-2724b225-3160-4152-868b-3e56992e99f6.png#clientId=u90bc8d0d-93c6-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=406&id=u7fe9eba2&margin=%5Bobject%20Object%5D&name=image.png&originHeight=812&originWidth=933&originalType=binary&ratio=1&rotation=0&showTitle=false&size=153296&status=done&style=none&taskId=u62f65d73-53fa-4cf5-a428-234d3c5cfce&title=&width=466.5)

```html
<a href="#">手机 电话卡</a>
<a href="#">电视 盒子</a>
<a href="#">笔记本 平板</a>
<a href="#">出行 穿戴</a>
<a href="#">智能 路由器</a>
<a href="#">健康 儿童</a>
<a href="#">耳机 音响</a>
```

```css
/* 1. 将 a 标签转换为块级元素，设置默认显示属性 */
a {
  display: block;
  width: 230px;
  height: 40px;
  color: #fff;
  font-size: 14px;
  background-color: #a09e9e;
  text-decoration: none;
  text-indent: 2em;
  line-height: 40px;
}

/* 2. 设置 a 标签鼠标经过状态 */
a:hover {
  background-color: #ff6700;
}
```

## 单行文字垂直居中

让文字的行高等于盒子的高度 就可以让文字在当前盒子内垂直居中
![image.png](https://cdn.nlark.com/yuque/0/2022/png/532803/1641457010004-fbcd57de-ad3b-4728-bc84-e0b3c37b536d.png#clientId=u4b3d0a12-ceb4-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=221&id=btPW7&margin=%5Bobject%20Object%5D&name=image.png&originHeight=350&originWidth=739&originalType=binary&ratio=1&rotation=0&showTitle=false&size=59625&status=done&style=none&taskId=u15f5a607-e53d-47c7-b5bd-487c54cd7ff&title=&width=466.5000305175781)

# CSS 背景属性

通过 CSS 背景属性，可以给页面元素添加背景样式。背景属性可以设置背景颜色、背景图片、背景平铺、背景图片位置、背景图像固定等。

| **属性**              | **作用**     | **值**                                          |
| --------------------- | ------------ | ----------------------------------------------- |
| background-color      | 背景颜色     | 颜色 / `#f00` / `rgba(red, green, blue, alpha)` |
| background-image      | 背景图片     | `url(图片路径)`                                 |
| background-repeat     | 背景平铺     | `repeat`                                        |
| / `no-repeat`         |              |                                                 |
| / `repeat-x`          |              |                                                 |
| / `repeat-y`          |              |                                                 |
| background-position   | 背景位置     | `x`                                             |
| , `y`                 |              |                                                 |
| / `left right center` |              |                                                 |
| `top bottom center`   |              |                                                 |
| background-attachment | 附着方式     | `scroll`                                        |
| / `fixed`             |              |                                                 |
| background            | 背景复合属性 | 背景颜色 背景图片 背景平铺 背景滚动 背景位置    |

## 背景颜色

background-color 定义元素的背景颜色

```css
background-color: #f80;
```

> 元素背景颜色默认值是 transparent(透明)

## 背景图片

background-image 定义元素的背景图片

```css
background-image: url(images/logo.png);
```

- **应用场景**
  - 实际开发常见于 logo、装饰性小图片、超大的背景图片
  - 优点是非常便于控制位置.(精灵图也是一种运用场景)
- **注意**
  - 背景图片后面的地址，千万不要忘记加 URL， 同时里面的路径不要加引号。

## 背景平铺

background-repeat 设置元素背景图像的平铺

```css
background-image: url(images/logo.png);
background-repeat: no-repeat;
```

| **参数**  | **说明**           |
| --------- | ------------------ |
| repeat    | 默认，水平垂直平铺 |
| no-repeat | 不平铺             |
| repeat-x  | 水平平铺           |
| repeat-y  | 垂直平铺           |

## 背景图片位置

background-position 属性可以改变图片在背景中的位置

```css
background-position: x y;
```

> x 和 y 代表横纵坐标，可以使用方位名词代替

| **参数** | **说明**                                                          |
| -------- | ----------------------------------------------------------------- |
| length   | 百分数 &#124; 像素值                                              |
| position | top &#124; center &#124; bottom &#124; right &#124; left 方位名词 |

- 注意事项
  - 如果指定的两个值都是方位名词，则两个值前后顺序无关
  - 如果只指定了一个方位名词，另一个值省略，则第二个值默认居中对齐
  - 如果参数值是精确坐标，那么第一个肯定是 x 坐标，第二个一定是 y 坐标
  - 如果只指定一个数值，那该数值一定是 x 坐标，另一个默认垂直居中
  - 如果指定的两个值是精确单位和方位名词混合使用，则第一个值是 x 坐标，第二个值是 y 坐标

## 背景固定

background-attachment 属性设置背景图像是否固定或者随着页面的其余部分滚动。后面要使用背景固定制作视差滚动效果

```css
background-attachment: fixed;
```

| **参数** | **说明**                 |
| -------- | ------------------------ |
| scroll   | 默认值，背景图像跟随滚动 |
| fixed    | 背景图像固定             |

- 固定背景示例

```css
body {
  background-image: url(../images/bg.jpg);
  background-repeat: no-repeat;
  background-position: center top;
  background-attachment: fixed;
}
```

## 背景复合样式属性

我们已经学习过一个复合样式属性：font，它的好处是可以让我们把多个字体属性通过一个复合属性 font 来一起设置，同样设置背景属性一样有一个复合样式属性：background

```css
background: 背景颜色 背景图片地址 背景平铺 背景图像滚动 背景图片位置;
```

> background 属性没有顺序要求，但是推荐按照顺序写。可以需要什么写什么

## 背景色半透明

CSS3 提供了背景颜色半透明的效果。

**使用方式：**

```css
background: rgba(0, 0, 0, 0.3);
```

- 最后一个参数是 alpha 透明度，取值范围在 0~1 之间
- 我们习惯把 0.3 的 0 省略掉，写为 background: rgba(0, 0, 0, .3);

**注意**：

- 背景半透明是指盒子背景半透明，盒子里面的内容不受影响
- CSS3 新增属性，是 IE9+ 版本浏览器才支持的，但是现在实际开发,我们不太关注兼容性写法了,可以放心使用

# 综合案例

![image.png](https://cdn.nlark.com/yuque/0/2022/png/532803/1644458065425-2870cb58-0082-4487-9329-66367f8cffed.png#clientId=u596baa44-3375-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=58&id=u2539d68f&margin=%5Bobject%20Object%5D&name=image.png&originHeight=116&originWidth=959&originalType=binary&ratio=1&rotation=0&showTitle=false&size=36705&status=done&style=none&taskId=u9123a67e-db39-4f8b-996a-9dde8473016&title=&width=479.5)

```html
<div class="nav">
  <a href="#">首页</a>
  <a href="#">博客</a>
  <a href="#">视频</a>
  <a href="#">留言</a>
  <a href="#">关于</a>
</div>
```

```css
.nav a {
  display: inline-block;
  width: 120px;
  height: 58px;
  text-align: center;
  line-height: 48px;
  color: #fff;
  text-decoration: none;
}

.nav .bg1 {
  background: url(images/bg1.png) no-repeat;
}

.nav .bg1:hover {
  background-image: url(images/bg11.png);
}
```

# 作业 1:

在网页的顶部，通常会有导航栏来引导用户进入不同的功能区域，当点击不同的导航部分的时候会跳转到不同的页面中。所以往往导航栏需要使用功能 a 标签来完成。现在请使用 HTML 与 CSS 来实现以下所示导航栏：![](https://cdn.nlark.com/yuque/0/2022/gif/532803/1645020984156-186a5be4-d030-47f8-9ddf-62bf6bfd063f.gif#crop=0&crop=0&crop=1&crop=1&from=url&id=FY7rM&margin=%5Bobject%20Object%5D&originHeight=135&originWidth=561&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

## 练习 2：

![](https://cdn.nlark.com/yuque/0/2022/gif/532803/1650369821091-872674cb-ef23-4903-915c-8f791dae7c97.gif#crop=0&crop=0&crop=1&crop=1&from=url&id=CGyzX&margin=%5Bobject%20Object%5D&originHeight=135&originWidth=561&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

1、使用 input 标签创建一个输入框
2、设置宽高为 535px 宽，40px 高
3、通过背景样式设置背景图，并且设置背景不平铺，背景图定位在靠右侧垂直居中的位置
4、通过 focus 来设置获得焦点样式
