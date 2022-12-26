const { Builder, By } = require('selenium-webdriver');

const remote = require('selenium-webdriver/remote');


const driver = new Builder().forBrowser('chrome').build();

driver.setFileDetector(new remote.FileDetector);

driver.get('http://sso.dev.saucelabs.com/test/guinea-file-upload');

const upload = driver.findElement(By.id('myfile'));

upload.sendKeys("/WebDriver/tx.jpg")