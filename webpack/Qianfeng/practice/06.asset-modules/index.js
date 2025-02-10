import hello from "./hello-world.js";
import pngImage from "./images/img-1.png";
import svgImage from "./images/webpack-logo.svg";
import helloTxtFile from "./images/hello.txt";
import jpgImage from "./images/qianfeng-sem.jpg";

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
