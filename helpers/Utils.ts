import { Page, Locator, expect } from "@playwright/test";

export default class Utils {
  constructor(private page: Page) {}

  /**
   * Waits for the page to fully load.
   */
  public async waitForPageLoad() {
    await this.page.waitForLoadState("load");
  }

  /**
   * Waits for a modal to appear and verifies its visibility.
   * @param modalSelector - The selector of the modal.
   */
  public async waitForModal(modalSelector: string) {
    await this.page.waitForSelector(modalSelector);
    const modal = await this.page.locator(modalSelector);
    expect(modal).toBeVisible();
    return modal;
  }

  /**
   * Verifies text content inside a locator.
   * @param locator - The Locator object.
   * @param expectedText - The expected text to verify.
   */
  public async verifyText(locator: Locator, expectedText: string) {
    await expect(locator).toContainText(expectedText);
  }
}
