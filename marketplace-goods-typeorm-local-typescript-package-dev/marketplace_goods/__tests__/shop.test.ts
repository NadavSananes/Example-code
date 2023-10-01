import { FindOptionsWhere, IsNull, MoreThan } from "typeorm";
import { describe, expect, test, it } from "@jest/globals";
import { Shop } from "../src/Shop/shop.entity";
import { Seller } from "../src/Users/seller.entity";
import {
  connection,
  createShop,
  addSeller,
  addSellerToShop,
  loadShopsSellerWorkedIn,
} from "../src/index";
const validProfileId: string = "3";
const validSellerId: string = "3";
const shopName = "shopName";
const shopDescription = "shopDescription";
const invalid_sellerId: string = "01231231231231323123"; // check for the foreign key constrain, will be removed when I will add the profile entity
const sellerDescription = "describe";
const englishLangCode: string = "en";
const TEST_TIMEOUT = 20000;

async function createTestShop(sellerId?: string) {
  return sellerId
    ? await createShop(sellerId, shopName, shopDescription, englishLangCode)
    : null;
}
describe("Shop tests", () => {
  let seller: Seller | null;
  test(
    "Create shop and load shop",
    async () => {
      seller = await addSeller(
        validProfileId,
        sellerDescription,
        englishLangCode
      );
      if (!seller) {
        console.log("Problem with loading seller");
        expect(1).toBe(2);
        return; // will never reach here, but it helps with the compiler.
      }
      await seller.reload();
      const savedShop = await createShop(
        seller.id,
        shopName,
        shopDescription,
        englishLangCode
      );
      const shops = await Shop.loadShopsOwnedBySeller(
        seller.id,
        englishLangCode
      );
      if (shops.length == 0) expect(1).toBe(2);
      await Shop.delete([savedShop.id]);
    },
    TEST_TIMEOUT
  );

  test("Add seller to shop, and load seller shops", async () => {
    const shop = await createTestShop(seller?.id);
    if (!shop) {
      expect(1).toBe(2);
      return;
    }
    await addSellerToShop(validSellerId, shop.id);
    const shopsSellerWorksIn = await loadShopsSellerWorkedIn(
      validProfileId,
      englishLangCode
    );
    expect(shopsSellerWorksIn.map((shop) => shop.id)).toContain(shop.id);
  },10000);
});
