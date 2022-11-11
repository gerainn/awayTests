const { test } = require('@playwright/test');
const { HomePage } = require('../pages/home.page');
const { StoresPage } = require('../pages/stores.page');

//generates random number
let random = Math.floor(Math.random() * 13)

test('Verify HomePage URL', async ({ page }) => {
    const homePage = new HomePage(page);
    //this methods open home page and check URL
    await homePage.goto()
    await homePage.checkHomeUrl()
});

test('Verify Stores Page URL and Title', async ({ page }) => {
    const homePage = new HomePage(page);
    const storesPage = new StoresPage(page);
    await homePage.goto()
    //this methods open stores page and check URL with Title
    await homePage.clickStores()
    await storesPage.checkStoresUrl()
    await storesPage.checkStoresTitle()
});

test('Check All Stores', async ({ page }) => {
    const storesPage = new StoresPage(page);
    await storesPage.goto()
    await storesPage.checkStoresUrl()
    //this method iterates through all elements (each store)
    //checking that each store is visible and has address
    await storesPage.checkStoreModals()
});

test('Check Any Store Information', async ({ page }) => {
    const storesPage = new StoresPage(page);
    await storesPage.goto()
    await storesPage.checkStoresUrl()
    //this method hovers over random store and select this store
    await storesPage.hoverSeeStore(random)
    let cityName = await storesPage.getStoreCityName(random)
    await storesPage.selectRandomStore(random, cityName)
    //this method checks that description is displayed
    await storesPage.checkStoreDescription()
    //this method checks Additional Store Information
    await storesPage.checkInfoIcons()
    //this method checks if the image of the store is visible
    await storesPage.checkStoreImg()
    //this method cheks if the google maps and hours with address are visible
    await storesPage.checkStoreMapHoursAddress()
});
