import { faker } from "@faker-js/faker";

// Generate random data using Faker
export default class fakeData {
  public static readonly NAME = faker.person.fullName();
  public static readonly COUNTRY = faker.location.country();
  public static readonly CITY = faker.location.city();
  public static readonly CARD = faker.finance.creditCardNumber();
  public static readonly MONTH = faker.date.month();
  public static readonly YEAR = faker.date.future().getFullYear().toString();
}
