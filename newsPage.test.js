const puppeteer = require('puppeteer');

describe("News page end to end test", () => {
  test('Verify element text = Hacker News', async () => {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 40,
        args: ['--window-size=1920,1080']
    });
    try {
        const context = await browser.createIncognitoBrowserContext();
        const page = await context.newPage();          
        await page.goto('https://news.ycombinator.com/news');
        const elementText = await page.$eval('.hnname > a', el => el.innerText);
        expect(elementText).toBe('Hacker News');        
    } 
    catch (error) {
        console.log(error);
    } 
    finally {
        await browser.close();
    }
  }, 3000);
});