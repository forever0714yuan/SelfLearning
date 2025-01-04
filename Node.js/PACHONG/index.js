import puppeteer from "puppeteer";
import { spawn } from "child_process";
const browser = await puppeteer.launch({
  headless: false, // 取消无头模式
});

// 打开一个页面
const page = await browser.newPage();
// 设置页面视口大小
page.setViewport({ width: 1920, height: 1080 }); //设置页面宽高
// 跳转到掘金
await page.goto("https://juejin.cn/");
// 等待侧边栏导航渲染完毕
await page.waitForSelector(".side-navigator-wrap");
// 获取到下面的span元素
const elements = await page.$$(".side-navigator-wrap .nav-item-wrap span");

const articleList = [];
const collectFunc = async () => {
  // 等待entry-list 类渲染完毕
  await page.waitForSelector(".entry-list");

  // 获取到entry-list 类下面的所有a标签
  const elements = await page.$$(".entry-list .title-row a");

  for await (let el of elements) {
    const text = await el.getProperty("innerText");
    const name = await text.jsonValue();
    articleList.push(name);
  }
  console.log(articleList);

  //   调用python 脚本进行中文分词，输出词云图
  const pythonProcess = spawn("python", ["index.py", articleList.join(",")]);

  pythonProcess.stdout.on("data", (data) => {
    console.log(data.toString());
  });
  pythonProcess.stderr.on("data", (data) => {
    console.log(data.toString());
  });
  pythonProcess.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
  });
};

// 遍历元素
for (const element of elements) {
  // 获取元素文本
  const text = await element.getProperty("innerText");
  // 转换成文本
  const name = await text.jsonValue(); //获取内容

  if (name.trim() === "前端") {
    await element.click(); //自动点击对应的菜单
    collectFunc(); //调用函数
  }
}
