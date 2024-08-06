import { test, expect } from '@playwright/test';
import demoblazePage from '../pages/DemoBlazePage';
import itemsInStore from '../helpers/ItemsExpected';

test('testing filter buttons', async ({ page }) => {
    const homePage = new demoblazePage(page);
    await homePage.loginToDemo();

    await page.waitForTimeout(2000);

    await page.waitForSelector('a:has-text("Phones")');
    const phoneLink = page.getByRole('link', { name: 'Phones' });
    await expect(phoneLink).toBeVisible();
    await phoneLink.click();

    await page.waitForTimeout(2000);

    // מצא את כל כרטיסי הטלפונים המוצגים
    const phoneItems = (await page.locator('.card-title').allTextContents()).map(text => text.trim());


    // בדוק שכל פריט ברשימה הצפויה קיים בדף
    for (const phone of itemsInStore.PHONESE) {
        expect(phoneItems).toContain(phone); // וודא שכל פריט ברשימה הצפויה נמצא
    }

    // בדוק שאין פריטים נוספים שאינם ברשימה הצפויה
    for (const item of phoneItems) {
        expect(itemsInStore.PHONESE).toContain(item); // וודא שאין פריטים שאינם ברשימה הצפויה
    }

    await page.waitForSelector('a:has-text("Laptops")');
    const laptopLink = page.getByRole('link', { name: 'Laptops' });
    await expect(laptopLink).toBeVisible();
    await laptopLink.click();
    await page.waitForTimeout(2000);

    const laptopItems = (await page.locator('.card-title').allTextContents()).map(text => text.trim());

    for (const laptop of itemsInStore.LAPTOP) {
        expect(laptopItems).toContain(laptop);
    }

    for (const lap of laptopItems) {
        expect(itemsInStore.LAPTOP).toContain(lap);
    }

    await page.waitForSelector('a:has-text("Monitors")');
    const monitorLink = page.getByRole('link', { name: 'Monitors' });
    await expect(monitorLink).toBeVisible();
    await monitorLink.click();
    await page.waitForTimeout(2000);

    const monitorItems = (await page.locator('.card-title').allTextContents()).map(text => text.trim());

    for (const monitor of itemsInStore.MONITORS) {
        expect(monitorItems).toContain(monitor);
    }

    for (const item of monitorItems) {
        expect(itemsInStore.MONITORS).toContain(item);
    }

});

test('testing the buttons', async ({page}) => {
    const homePage = new demoblazePage(page);
    await homePage.loginToDemo();

    await page.waitForTimeout(2000);

    await homePage.navigateToHome();

    await homePage.navigateToContact();

    await homePage.aboutUsPopUp();
    
    await homePage.loginPopUp();

    await homePage.signupPopUp();

    await homePage.sendMessage();
});


test('testing cart page',async ({page}) => {
    const homePage = new demoblazePage(page);
    await homePage.loginToDemo();
    await page.waitForTimeout(2000);
    await homePage.addProduct();

})

    
    // await page.getByLabel('New message').getByLabel('Close').click();
    // await page.getByRole('link', { name: 'About us' }).click();
    // await page.locator('#videoModal').getByText('Close', { exact: true }).click();
    // await page.getByRole('link', { name: 'Cart' }).click();
    // await page.getByRole('link', { name: 'Log in' }).click();
    // await page.getByLabel('Log in').getByText('Close').click();
    // await page.getByRole('link', { name: 'Sign up' }).click();
    // await page.getByLabel('Sign up').getByText('Close').click();








