import { Locator, Page, expect } from "@playwright/test";
import ApplicationURL from "../helpers/ApplicationURL";

/**
 * demoblazePage - Class to interact with the DemoBlaze application.
 */
export default class demoblazePage {
  private sortPhone: Locator;
  private sortLaptop: Locator;
  private sortMonitor: Locator;
  private homeButton: Locator;
  private contactButton: Locator;
  private aboutUsButton: Locator;
  private cartButton: Locator;
  private loginButton: Locator;
  private signupButton: Locator;
  static sortPhone: Locator;

  /**
   * Constructor to initialize page locators.
   * @param page - The Playwright page object.
   */
  constructor(protected page: Page) {
    this.sortPhone = page.getByRole("link", { name: "Phones" });
    this.sortLaptop = page.getByRole("link", { name: "Laptops" });
    this.sortMonitor = page.getByRole("link", { name: "Monitors" });
    this.homeButton = page.getByRole("link", { name: "Home (current)" });
    this.contactButton = page.getByRole("link", { name: "Contact" });
    this.cartButton = page.getByRole("link", { name: "Cart" });
    this.aboutUsButton = page.getByRole("link", { name: "About us" });
    this.loginButton = page.getByRole("link", { name: "Log in" });
    this.signupButton = page.getByRole("link", { name: "Sign up" });
  }

  /**
   * Getter for phoneLocator.
   * @returns Locator for the Phones category.
   */
  public get phoneLocator() {
    return this.sortPhone;
  }

  /**
   * Getter for laptopLocator.
   * @returns Locator for the Laptops category.
   */
  public get laptopLocator() {
    return this.sortLaptop;
  }

  /**
   * Getter for monitorLocator.
   * @returns Locator for the Monitors category.
   */
  public get monitorLocator() {
    return this.sortMonitor;
  }

  /**
   * Navigates to the DemoBlaze application.
   * @param url - The URL to navigate to. Defaults to ApplicationURL.BASE_URL.
   */
  public async loginToDemo(url = ApplicationURL.BASE_URL) {
    await this.page.goto(url);
  }

  /**
   * Checks the sorting of items in a category.
   * @param categoryButton - Locator for the category button to click.
   * @param expectedItems - Array of expected item names in the category.
   */
  public async checkSortButton(
    categoryButton: Locator,
    expectedItems: string[]
  ) {
    await categoryButton.click();
    await this.page.waitForTimeout(2000);
    const phoneItems = (
      await this.page.locator(".card-title").allTextContents()
    ).map((text) => text.trim());
    for (const phone of expectedItems) {
      expect(phoneItems).toContain(phone);
    }

    for (const item of phoneItems) {
      expect(expectedItems).toContain(item);
    }
  }

  /**
   * Navigates to the Home page.
   */
  public async navigateToHome() {
    await this.homeButton.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.page).toHaveURL(ApplicationURL.BASE_URL + "index.html");
  }

  /**
   * Navigates to the Cart page.
   */
  public async navigateToCart() {
    await this.cartButton.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.page).toHaveURL(ApplicationURL.CART_URL);
  }

  /**
   * Navigates to the Contact page and closes the contact modal.
   */
  public async navigateToContact() {
    await this.contactButton.click();
    await this.page.waitForSelector("#exampleModal.modal.show");
    const modalLabel = await this.page.waitForSelector("#exampleModal");
    expect(modalLabel).not.toBeNull();
    await this.page.click("#exampleModal .close");
  }

  /**
   * Opens and closes the About Us pop-up.
   */
  public async aboutUsPopUp() {
    await this.aboutUsButton.click();
    await this.page.waitForSelector("#videoModal.modal.show");
    const modalLabel = await this.page.waitForSelector("#videoModal");
    expect(modalLabel).not.toBeNull();
    await this.page.click("#videoModal .close");
  }

  /**
   * Opens and closes the Login pop-up.
   */
  public async loginPopUp() {
    await this.loginButton.click();
    await this.page.waitForSelector("#logInModal.modal.show");
    const modalLabel = await this.page.waitForSelector("#logInModal");
    expect(modalLabel).not.toBeNull();
    await this.page.click("#logInModal .close");
  }

  /**
   * Opens and closes the Signup pop-up.
   */
  public async signupPopUp() {
    await this.signupButton.click();
    await this.page.waitForSelector("#signInModal.modal.show");
    const modalLabel = await this.page.waitForSelector("#signInModal");
    expect(modalLabel).not.toBeNull();
    await this.page.click("#signInModal .close");
  }

  /**
   * Sends a message through the Contact form and verifies the dialog.
   */
  public async sendMessage() {
    await this.contactButton.click();
    await this.page.fill("#recipient-email", "test@example.com");
    await this.page.fill("#recipient-name", "Test User");
    await this.page.fill("#message-text", "This is a test message.");

    this.page.on("dialog", async (dialog) => {
      expect(dialog.message()).toBe("Thanks for the message!!");
      await dialog.accept();
    });
    await this.page.getByLabel("New message").getByText("Send message").click();
    await this.page.waitForSelector(".modal-open", { state: "hidden" });
  }

  /**
   * Adds a product to the cart and verifies the dialog.
   */
  public async addProduct(productName: string) {
    const productPageLink = this.page.getByRole("link", { name: productName });
    await productPageLink.click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.page).toHaveURL(
      ApplicationURL.BASE_URL + `prod.html?idp_=4`
    );

    const dialogPromise = this.page.waitForEvent("dialog");

    await this.page.getByRole("link", { name: "Add to cart" }).click();

    const dialog = await dialogPromise;
    expect(dialog.message()).toBe("Product added");
    await dialog.accept();
    await this.page.locator("#cartur").click();
    await this.page.waitForLoadState("networkidle");
    await expect(this.page).toHaveURL(ApplicationURL.CART_URL);

    const cartItemLocator = this.page.locator(`text=${productName}`);
    await expect(cartItemLocator).toBeVisible();
  }
}
