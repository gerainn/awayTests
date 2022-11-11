// playwright-dev-page.js
const { expect } = require('@playwright/test');
const data = require('../helpers/addresses')

exports.StoresPage = class StoresPage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.exp = {
            storesUrl: "https://www.awaytravel.com/stores",
            storesTitle: "Visit us IRL"
        }

    }

    //locators
    title = "h1"
    stores = ".component.plp-tiles-component.plp_tiles_plpTilesContainer__TeFNp > div"
    cityLocator = "[class='content_tile_medium_diptych_head__HZtjM']"
    storeDescription = ".store_location_header_description__8HnHG"
    descriptionIcons = "[class='store_location_messages_tile__MtGL9']"
    storeImg = "div:nth-child(2) > .store_location_gallery_slideImage__hmQua img"
    nextBtn = "button[aria-label='next slide']"
    previousBtn = "button[aria-label='previous slide']"
    map = ".store_location_info_mapContainer__5rdLV"
    hours = ".store_location_info_infoContainer__zpQSG"

    async goto() {
        await this.page.goto("https://www.awaytravel.com/stores");
    }

    async checkStoresUrl() {
        await expect(this.page).toHaveURL(this.exp.storesUrl);
    }

    async checkStoresTitle() {
        await expect(this.page.locator(this.title)).toHaveText(this.exp.storesTitle)
    }

    async checkStoreModals() {
        await this.page.waitForSelector(this.stores)
        const elem = await this.page.$$(this.stores)
        let addresses = []
        for (let i = elem.length - 1; i >= 0; i--) {
            await elem[i].scrollIntoViewIfNeeded();
            await elem[i].isVisible()
            addresses[i] = await elem[i].textContent()
        }
        await expect(addresses).toStrictEqual(Object.values(data)[0])
    }

    async hoverSeeStore(input) { 
        const stores = this.page.locator('text=See Store')
        await stores.nth(input).hover()
    }

    async getStoreCityName(input) { 
        const city = this.page.locator(this.cityLocator)
        let cityName = await city.nth(input).innerText()
        if (cityName === 'LA: Venice Beach') {
            return cityName = 'Venice Beach'
        } else if (cityName === 'LA: West Hollywood') { 
            return cityName = 'West Hollywood'
        } else if (cityName === 'NYC: NoHo') {
            return cityName = 'NoHo'
        } else {
            return cityName
        }
    }

    async selectRandomStore(number,input) { 
        const stores = this.page.locator('text=See Store')
        await stores.nth(number).click()
        await expect(this.page.locator("h1")).toContainText(`${input}`);
    }

    async checkStoreDescription() { 
        await expect(this.page.locator(this.storeDescription)).toBeVisible()
    }

    async checkInfoIcons() { 
        const icons = this.page.locator(this.descriptionIcons)
        const count = await icons.count()
        expect(count).toEqual(3)
        for (let i = 0; i < count; i++) {
            await icons.nth(i).isVisible()
            await icons.nth(i).innerText()
        }
    }

    async checkStoreImg() {
        await expect(this.page.locator(this.storeImg)).toBeVisible()
        await this.page.locator(this.nextBtn).click()
        await expect(this.page.locator(this.storeImg)).toBeVisible()
        await this.page.locator(this.previousBtn).click()
        await this.page.locator(this.previousBtn).click()
        await expect(this.page.locator(this.storeImg)).toBeVisible()
    }

    async checkStoreMapHoursAddress() { 
        await this.page.locator(this.map).scrollIntoViewIfNeeded()
        await expect(this.page.locator(this.map)).toBeVisible()
        await expect(this.page.locator(this.hours)).toBeVisible()
        await expect(this.page.locator(this.hours)).toContainText('Address')
    }
}

