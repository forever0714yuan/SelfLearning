import hello from "./hello-world.js";
import pngImage from "./images/img-1.png";
import svgImage from "./images/webpack-logo.svg";
import helloTxtFile from "./images/hello.txt";
import jpgImage from "./images/qianfeng-sem.jpg";
import "./styles/index.css";
import "./styles/index1.less";
import "./async-module.js";

hello();

// png  测试
const pngImageDOM = document.createElement("img");
pngImageDOM.src = pngImage;
document.body.appendChild(pngImageDOM);

// svg 测试
const svgImageDom = document.createElement("img");
svgImageDom.src = svgImage;
document.body.appendChild(svgImageDom);

// txt 测试
const txtDivDOM = document.createElement("div");
txtDivDOM.textContent = helloTxtFile;
txtDivDOM.style.cssText = `width: 100%; height: 100px; overflow: auto;background-color: #f5f5f5; padding: 10px;`;
document.body.appendChild(txtDivDOM);

// jpe 测试
const jpgImageDOM = document.createElement("img");
jpgImageDOM.src = jpgImage;
jpgImageDOM.style.cssText = `width: 600px;height:240px;display:block`;
document.body.appendChild(jpgImageDOM);

// css 测试
document.body.classList.add("hello");

// less 测试
document.body.classList.add("world");

// 加载images 图像
const imageIcon = document.createElement("div");
imageIcon.style.cssText = `width:200px;height:200px`;
imageIcon.classList.add("block-bg");
document.body.appendChild(imageIcon);

// 加载fonts 文字
const fontIcon = document.createElement("div");
fontIcon.classList.add("icon");
fontIcon.style.cssText = `width:200px;height:200px`;
fontIcon.innerHTML = "&#xe668;";
document.body.appendChild(fontIcon);

// 加载数据
import dataxml from "./images/data.xml";
import datacsv from "./images/data.csv";
console.log(dataxml);
console.log(datacsv);

// 加载json
import toml from "./images/data.toml";
import yaml from "./images/data.yaml";
import json from "./images/data.json5";

console.log(toml.title); // output `TOML Example`
console.log(toml.owner.name); // output `Tom Preston-Werner`
console.log(yaml.title); // output `YAML Example`
console.log(yaml.owner.name); // output `Tom Preston-Werner`
console.log(json.title); // output `JSON5 Example`
console.log(json.owner.name); // output `Tom Preston-Werner`

const button = document.createElement("button");
button.textContent = "点击加载";
button.addEventListener("click", () => {
  import(/* webpackChunkName: "math" */ "./math.js").then(({ add }) => {
    console.log(add(1, 2));
  });
});
document.body.appendChild(button);
