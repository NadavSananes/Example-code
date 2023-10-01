import { describe, expect, test,it } from "@jest/globals";
import {
  addSeller,
  loadSeller,
  loadSellers,
  openConnection,
  removeSeller,
  removeSellers,
} from "../src";
import { Seller } from "../src/Users/seller.entity";
import { logger } from "@circles-zone/logger-local";
import { fail } from "assert";

const valid_profile_id: string = "8";
const invalid_profile_id: string = "01231231231231323123"; // check for the foreign key constrain, will be removed when I will add the profile entity
const english_lang_code: string = "en";
const description: string =
  "Selling the best picture done the by the artist Pace ";
const TEST_TIMEOUT = 20000;

describe("open connection", () => {
  test("open Connection", async () => {
    try {
      await openConnection();
      expect(1).toBe(1);
    } catch (e) {
      console.log(`my error: ${e}`);
      expect(1).toBe(2);
    }
  });
});

const addSellerSuccessfully = async function () {
  let newSeller: Seller | null;
  try {
    newSeller = await addSeller(
      valid_profile_id,
      description,
      english_lang_code
    );
  } catch (e) {
    logger.error(`error in test ${e}`);
    throw e;
  }
  //@ts-expect-error
  newSeller?.multiLangs[0].text = "this is a new text";
  newSeller?.save();
  const new_seller = await addSeller(
    valid_profile_id,
    description,
    english_lang_code
  );
  if (newSeller === null) {
    // could not add new seller
    expect(1).toBe(2);
    return;
  }
  const seller = await loadSeller(newSeller.id, english_lang_code);
  expect(seller).toBeInstanceOf(Seller);

  if (seller !== null) {
    expect(seller.description).toBe(description);
    await removeSeller(seller.id);
  } else {
    Promise.reject("could not load the new seller");
  }
};

describe("Add seller tests", () => {
  test(
    "Add seller successfully",
    async () => {
      try {
        return addSellerSuccessfully();
      } catch (e) {
        console.log(`You got an error ${e}`);
      }
    },
    TEST_TIMEOUT
  );
});

it(
  "load sellers successfully",
  async () => {
    //create sellers with valid profile_id
    const sellers: Seller[] = [];
    for (let i = 0; i < 5; i++) {
      const seller = await addSeller(
        valid_profile_id,
        description,
        english_lang_code
      );
      if (seller === null) fail("could not add seller");
      else {
        sellers.push(seller);
      }
    }
    // load sellers
    const loadedSellers = await loadSellers(
      valid_profile_id,
      english_lang_code
    );

    // check if the new sellers are a subset of the loaded sellers
    expect(loadedSellers).toBeInstanceOf(Array);
    expect(loadedSellers.length).toBeGreaterThanOrEqual(sellers.length);
    sellers.forEach((seller) => expect(loadedSellers).toContainEqual(seller));

    // remove the sellers
    const sellers_ids = sellers.map((seller) => seller.id);
    await removeSellers(sellers_ids);
  },
  TEST_TIMEOUT
);

it(
  "load sellers failed: invalid profileId",
  async () => {
    expect(
      (await Seller.loadSellers(invalid_profile_id, english_lang_code))
        .length == 0
    ).toBeTruthy();
  },
  TEST_TIMEOUT
);
