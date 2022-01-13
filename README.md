# Introduction
This is a bare bones project to demonstrate a basic automated end to end test case using Puppeteer, Jest, and jest-html-reporter.

- Puppeteer (https://github.com/puppeteer/puppeteer) is a headless browser that allows us to simulate browser interactions with code
- Jest (https://jestjs.io/) is a javascript testing framework that functions as both a test runner (executing tests and summarizing results) and an assertion library (defining test logic and conditions)
- jest-html-reporter (https://www.npmjs.com/package/jest-html-reporter) is a test results processor for formatting test results as HTML

# Installation
Clone the repository and install dependencies.
```
git clone https://github.com/dnewingh/jest-puppeteer-starter-project.git
npm install
```
Skip ahead to the [Usage](#usage) section to give it a try.

## Alternative Installation via Manual Setup
As with every JavaScript project you'll need an NPM environment (make sure to have Node installed on your system).  Create a new folder and initialize the project with:
```
mkdir jest-puppeteer-starter-project && cd $_
npm init -y
```
Next up install Jest, jest-html-reporter, and Puppeteer with:
```
npm i jest jest-html-reporter puppeteer --save-dev
```

Let's also configure an NPM script for running our tests from the command line. Open up *package.json* and configure a script named test for running Jest:
```json

  "scripts": {
    "test": "jest"
  },
```
Finally configure Jest to format test results as HTML with the following file.
> jest.config.json
```json
{
	"testResultsProcessor": "./node_modules/jest-html-reporter"
}
```

### Writing tests using Puppeteer
Jest will automatically run any files with *.test.js in the filename or that is placed in a \_\_tests\_\_ directory.  The test below launches an incognito instance of the browser, navigates to a known endpoint, and checks for the presence of an expected text value.  
> page.test.js
```js
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
```
# Usage
After installation, give it a shot with:
```
npm test
```
A new file *test-report.html* will be generated in the project root directory.  Open this file in your browser to view the test results summary!

# Inspiration
Thanks to all these great examples.
- https://www.valentinog.com/blog/jest/
- https://github.com/smooth-code/jest-puppeteer 
- https://github.com/checkly/puppeteer-examples
- https://github.com/xfumihiro/jest-puppeteer-example
- https://youtu.be/r9HdJ8P6GQI

# License
MIT