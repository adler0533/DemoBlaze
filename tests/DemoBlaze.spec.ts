import { test, expect, Page } from "@playwright/test";
import DemoBlazePage from "../pages/DemoBlazePage";
import itemsInStore from "../helpers/ItemsExpected";
import CartPage from "../pages/cartPage";
import Utils from "../helpers/Utils";

test.describe("DemoBlaze Test Suite", () => {
  let homePage: DemoBlazePage;
  let cart: CartPage;
  let utils: Utils;

  test.beforeEach(async ({ page }) => {
    homePage = new DemoBlazePage(page);
    cart = new CartPage(page);
    utils = new Utils(page);
    
    await homePage.loginToDemo();
    await page.waitForLoadState("load");
  });

  test("testing filter buttons", async () => {
    // Check sorting for Phones category.
    await homePage.checkSortButton(homePage.phoneLocator, itemsInStore.PHONES);

    // Check sorting for Laptops category.
    await homePage.checkSortButton(homePage.laptopLocator, itemsInStore.LAPTOP);

    // Check sorting for Monitors category.
    await homePage.checkSortButton(homePage.monitorLocator, itemsInStore.MONITORS);
  });

  test("testing the buttons", async () => {
    await homePage.navigateToCart();

    // Navigate to Home page.
    await homePage.navigateToHome();

    // Navigate to Contact page and close the contact modal.
    await homePage.navigateToContact();

    // Open and close the About Us pop-up.
    await homePage.aboutUsPopUp();

    // Open and close the Login pop-up.
    await homePage.loginPopUp();

    // Open and close the Signup pop-up.
    await homePage.signupPopUp();

    // Send a message through the Contact form and verify the dialog.
    await homePage.sendMessage();
  });

  test("testing cart page", async () => {
    await utils.waitForPageLoad();

    // Add a product to the cart and verify the dialog.
    await homePage.addProduct("Samsung galaxy s7");

    await cart.placeOrderAndVerify();
  });
});
