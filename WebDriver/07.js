const { Builder, By } = require('selenium-webdriver');
const assert = require("assert");
const driver = new Builder().forBrowser('chrome').build();


(async function () {
    driver.get('http://127.0.0.1:60210/WebDriver/index.html');

    const element = driver.findElement(By.css('p'));
    // 使用全等运算符（===）测试 actual 参数与 expected 参数是否全等。
    assert.strictEqual(await element.getText(), 'Hello from JavaScript!');

    // 使用不全等运算符（!==）测试 actual 参数与 expected 参数是否不全等。
    // assert.notStrictEqual()
})()