import { Page } from "@playwright/test";
import ApplicationURL from "../helpers/ApplicatinURL";

export default class cartPage{
    constructor(protected page:Page) {

    }
    public async loginToCart(url = ApplicationURL.CART_URL) {
        await this.page.goto(url);
    }}

    