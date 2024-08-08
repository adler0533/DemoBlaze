import { test, expect } from "@playwright/test";
import demoblazePage from "../pages/DemoBlazePage";
import itemsInStore from "../helpers/ItemsExpected";
import cartPage from "../pages/cartPage";
import Utils from "../helpers/Utils";

/**
 * Test suite for DemoBlaze filter buttons.
 */
test("testing filter buttons", async ({ page }) => {
  const homePage = new demoblazePage(page);
  await homePage.loginToDemo();

  await page.waitForLoadState("load");

  /**
   * Check sorting for Phones category.
   */
  await homePage.checkSortButton(homePage.phoneLocator, itemsInStore.PHONES);

  /**
   * Check sorting for Laptops category.
   */
  await homePage.checkSortButton(homePage.laptopLocator, itemsInStore.LAPTOP);

  /**
   * Check sorting for Monitors category.
   */
  await homePage.checkSortButton(
    homePage.monitorLocator,
    itemsInStore.MONITORS
  );
});

/**
 * Test suite for DemoBlaze navigation and pop-up buttons.
 */
test("testing the buttons", async ({ page }) => {
  const homePage = new demoblazePage(page);
  await homePage.loginToDemo();

  await page.waitForTimeout(2000);

  await homePage.navigateToCart();

  // Navigate to Home page.
  await homePage.navigateToHome();

  // Navigate to Contact page and close the contact modal.
  await homePage.navigateToContact();

  //   Open and close the About Us pop-up.
  await homePage.aboutUsPopUp();

  // Open and close the Login pop-up.
  await homePage.loginPopUp();

  // Open and close the Signup pop-up.
  await homePage.signupPopUp();

  // Send a message through the Contact form and verify the dialog.
  await homePage.sendMessage();
});

/**
 * Test suite for DemoBlaze cart page.
 */
test("testing cart page", async ({ page }) => {
  const homePage = new demoblazePage(page);
  const cart = new cartPage(page);
  const utils = new Utils(page);
  await homePage.loginToDemo();
  await utils.waitForPageLoad();

  //   Add a product to the cart and verify the dialog.
  await homePage.addProduct("Samsung galaxy s7");

  await cart.placeOrderAndVerify(page);
});
