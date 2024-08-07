import { Page } from "@playwright/test";
import ApplicationURL from "../helpers/ApplicatinURL";

/**
 * Class representing the Cart Page.
 */
export default class cartPage {
  /**
   * Creates an instance of cartPage.
   * @param {Page} page - The Playwright Page object.
   */
  constructor(protected page: Page) {}

  /**
   * Navigates to the DemoBlaze application.
   * @param url - The URL to navigate to. Defaults to ApplicationURL.CART_URL.
   */
  public async loginToCart(url = ApplicationURL.CART_URL) {
    await this.page.goto(url);
  }
}
