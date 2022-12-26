const { Builder, Capabilities } = require('selenium-webdriver');
const capabilities = Capabilities.chrome();

(async function helloSelenium() {
    const driver = new Builder()
        .usingServer('http://example.com')
        .withCapabilities(capabilities)
        .build()

    try {
        await driver.get('http://baidu.com');
    } catch (error) {
        console.log(error);
    } finally {
        await driver.quit()
    }
})()