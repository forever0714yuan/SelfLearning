const webdriver = require('selenium-webdriver')
const Chrome = require('selenium-webdriver/chrome')
const By = webdriver.By;
const until = webdriver.until;
const options = new Chrome.Options()

let driver = new webdriver.Builder()
    .forBrowser('chrome')
    .setChromeOptions(options.setPageLoadStrategy('normal'))
    .build();

driver.get('https://www.baidu.com');
driver.quit();