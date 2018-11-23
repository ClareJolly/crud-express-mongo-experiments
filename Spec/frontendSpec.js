require('chromedriver');
const webdriver = require('selenium-webdriver');
const { By, until } = webdriver;

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const driver = new webdriver.Builder().forBrowser('chrome').build();
const expect = chai.expect;

describe('Page Loads', done => {
  before(done => {
    console.log('Go to page');
    driver.get('http://localhost:3111')
    done()
  });


  it('can read welcome message', () => {
    // console.log('Ready to read welcome message');

return expect(driver.findElement(By.tagName("body")).getText()).to.eventually.contain("May Node and Express be with you");
  });
});

describe('enter a quote', done =>{
  before(done => {
           driver.get("http://localhost:3111/");
           driver.findElement(By.name("name")).click();
           driver.findElement(By.name("name")).clear();
           driver.findElement(By.name("name")).sendKeys("Yoda");
           driver.findElement(By.name("quote")).clear();
           driver.findElement(By.name("quote")).sendKeys("this is a new quote");
           // driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='b'])[1]/following::button[1]")).click();
           driver.findElement(By.id("submit_btn")).click();
           driver.findElement(By.name("name"))
           driver.then(() => {
             driver.wait(until.elementLocated(By.name('quote'))).then(() => {
               done();
             });
           });
  })

  it('read back quotes', () => {
  console.log('Checks last quote is correct');
  return expect(driver.findElement(By.xpath("//ul/li[contains(concat(' ', @class, ' '), ' quote ')][last()]")).getText()).to.eventually.contain("this is a new quote");
  });
})
