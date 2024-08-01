// demoblazePage.ts
import { Page } from '@playwright/test';

export class DemoblazePage {
    readonly page: Page;
    readonly phonesLink = 'a.list-group-item:has-text("Phones")';
    readonly productCard = '.card-title';

    constructor(page: Page) {
        this.page = page;
    }

    async navigate() {
        await this.page.goto('https://www.demoblaze.com');
    }

    async clickPhonesLink() {
        await this.page.click(this.phonesLink);
    }

    async getProductTitles() {
        return this.page.$$eval(this.productCard, cards => 
            cards.map(card => card.textContent ? card.textContent.trim() : '')
        );
    }
}
