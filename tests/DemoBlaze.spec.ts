// // demoblazeTest.ts
// import { test, expect } from '@playwright/test';
// import { DemoblazePage } from './DemoBlazePage';


// let demoblazePage:any;

// test.beforeEach(async({page}) => {
//     const demoblazePage = new DemoblazePage(page);

//     await demoblazePage.navigate();
// })
// test.describe("Home Page", ()=> {
   


// test('@E2E filter products by phones', async ({ page }) => {
//    // const demoblazePage = new DemoblazePage(page);

//     await expect(page.getByRole("link", {name: "cart"})).toBeVisible();
//     // לחץ על הקישור של ה-Phones
//     await demoblazePage.clickPhonesLink();

//     // קבל את רשימת הכותרות של המוצרים
//     const productTitles = await demoblazePage.getProductTitles();

//     const productTypesRegex = /(Samsung Galaxy S6|Nokia Lumia 1520|Nexus 6|Samsung Galaxy S7|iPhone 6 32GB|Sony Xperia Z5|HTC One M9|Sony vaio i5|Sony vaio i7)/i;


//     productTitles.forEach(title => {
//         expect(title).toMatch(productTypesRegex);
//     });
// });

// // test("should have title store", async({page}) =>{
// //     await expect(page).toHaveTitle("STORE");
// // });



// // test("Testing buttons", async({page}) =>{
// //     await expect(page).toHaveTitle("STORE");
// // });
// })


import { test, expect } from '@playwright/test';
import demoblazePage from './DemoBlazePage';

test('testing filter buttons', async ({ page }) => {
    const homePage = new demoblazePage(page);
    await homePage.loginToDemo()
    await page.getByRole('link', { name: 'Phones' }).click();
    await page.getByRole('link', { name: 'Laptops' }).click();
    await page.getByRole('link', { name: 'Monitors' }).click();

});
