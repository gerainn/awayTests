// playwright-dev-page.js
const { expect } = require('@playwright/test');

exports.HomePage = class HomePage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.exp = {
            homeUrl: "https://www.awaytravel.com/",
        }

    }

    //locators
    button = "#search-bar-toggle"
    stores = "[href='/stores']"
    title = "h1"


    async goto() {
        await this.page.goto("https://www.awaytravel.com/");
    }

    async checkHomeUrl() {
        await expect(this.page).toHaveURL(this.exp.homeUrl);
    }

    async clickStores() {
        await this.page.click(this.stores)
        // await this.page.waitForSelector('#products')
        // await this.page.waitForLoadState()
    }

}

