const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const opts = new chrome.Options();

opts.setAcceptInsecureCerts(true);
opts.setBrowserVersion('67');
opts.setPlatform('Windows XP');

(async function () {
    const driver = new Builder()
        .usingServer('http://example.com')
        .forBrowser('chrome')
        .setChromeOptions(opts)
        .build()

    try {
        await driver.get('http://baidu.com')
    } catch (error) {
        console.log(error);
    }
})()
