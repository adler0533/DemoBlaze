import { Page } from '@playwright/test';
import ApplicationURL from '../helpers/ApplicatinURL';

export default class demoblazePage {
    constructor(protected page: Page) {
    }

    public async loginToDemo(url = ApplicationURL.BASE_URL) {
        await this.page.goto(url);
    }}