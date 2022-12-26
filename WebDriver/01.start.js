let webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

let driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

driver.get("http://baidu.com");
driver.findElement(By.id('kw')).sendKeys('seleniym');
driver.findElement(By.id('su')).click();

// driver.quit()
