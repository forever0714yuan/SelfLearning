const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const proxy = require('selenium-webdriver/proxy');
const opts = new chrome.Options();

(async function () {
    opts.setProxy(proxy.manual({ http: '<HOST:PORT>' }));
    const driver = new webdriver.Builder()
        .forBrowser('chrome')
        .setChromeOptions(opts)
        .build();
    try {
        await driver.get("https://baidu.com");
    } catch (error) {
        console.log(error);
    } finally {
        // await driver.quit()
    }
})();