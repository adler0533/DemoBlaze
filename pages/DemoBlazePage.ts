import { Locator, Page, expect } from '@playwright/test';
import ApplicationURL from '../helpers/ApplicatinURL';

export default class demoblazePage {

    private homeButton: Locator;
    private contactButton: Locator;
    private aboutUsButton: Locator;
    private cartButton: Locator;
    private loginButton: Locator;
    private signupButton: Locator;
    private goToProductPage: Locator;

    constructor(protected page: Page) {
        this.homeButton = page.getByRole('link', { name: 'Home (current)' });
        this.contactButton = page.getByRole('link', { name: 'Contact' });
        this.cartButton = page.getByRole('link', { name: 'Cart' });
        this.aboutUsButton = page.getByRole('link', {name: 'About us'});
        this.loginButton = page.getByRole('link', {name: 'Log in'});
        this.signupButton = page.getByRole('link', {name: 'Sign up'});
        this.goToProductPage = page.getByRole('link', {name: 'Samsung galaxy s6'});
    }

    public async loginToDemo(url = ApplicationURL.BASE_URL) {
        await this.page.goto(url);
    };

    public async navigateToHome() {
        await this.homeButton.click();
        await this.page.waitForLoadState('networkidle');
        await expect(this.page).toHaveURL(ApplicationURL.BASE_URL + 'index.html');
    };

    public async navigateToCart() {
        await this.cartButton.click();
        await this.page.waitForLoadState('networkidle');
        await expect(this.page).toHaveURL(ApplicationURL.CART_URL);
    };

    public async navigateToContact() {
        await this.contactButton.click();
        await this.page.waitForSelector('#exampleModal.modal.show');
        const modalLabel = await this.page.waitForSelector('#exampleModal');
        expect(modalLabel).not.toBeNull();
        await this.page.click('#exampleModal .close');
    };

    public async aboutUsPopUp() {
        await this.aboutUsButton.click();
        await this.page.waitForSelector('#videoModal.modal.show');
        const modalLabel = await this.page.waitForSelector('#videoModal');
        expect(modalLabel).not.toBeNull();
        await this.page.click('#videoModal .close');
    };

    public async loginPopUp() {
        await this.loginButton.click();
        await this.page.waitForSelector('#logInModal.modal.show');
        const modalLabel = await this.page.waitForSelector('#logInModal');
        expect(modalLabel).not.toBeNull();
        await this.page.click('#logInModal .close');
    };

    public async signupPopUp() {
        await this.signupButton.click();
        await this.page.waitForSelector('#signInModal.modal.show');
        const modalLabel = await this.page.waitForSelector('#signInModal');
        expect(modalLabel).not.toBeNull();
        await this.page.click('#signInModal .close');
    }

    public async sendMessage() {
        await this.contactButton.click();
        await this.page.fill('#recipient-email', 'test@example.com');
        await this.page.fill('#recipient-name', 'Test User');
        await this.page.fill('#message-text', 'This is a test message.');

        this.page.on('dialog', async dialog => {
            expect(dialog.message()).toBe('Thanks for the message!!');
            await dialog.accept();
        });
        await this.page.getByLabel('New message').getByText('Send message').click();
        await this.page.waitForSelector('.modal-open', { state: 'hidden' });
        

    };

    public async addProduct() {
        await this.goToProductPage.click();
        await this.page.waitForLoadState('networkidle');
        await expect(this.page).toHaveURL(ApplicationURL.BASE_URL + 'prod.html?idp_=1');
        
        const dialogPromise = this.page.waitForEvent('dialog');
        
        await this.page.getByRole('link', { name: 'Add to cart' }).click();
        
        const dialog = await dialogPromise;
        expect(dialog.message()).toBe('Product added');
        await dialog.accept();
    }
    

    public async cartPage(){
        
    }


};
