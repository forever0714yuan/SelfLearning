const { Builder, By } = require('selenium-webdriver');
const assert = require('assert');
const driver = new Builder().forBrowser('chrome').build();

(async function () {
    const documentInitialised = () => driver.executeAsyncScript('return initialised');

    await driver.get('http://127.0.0.1:60210/WebDriver/index.html');

    await driver.wait(() => documentInitialised(), 10000);

    const element = driver.findElement(By.css('p'));

    assert.strictEqual(await element.getText(), 'Hello from JavaScript!')
})()
