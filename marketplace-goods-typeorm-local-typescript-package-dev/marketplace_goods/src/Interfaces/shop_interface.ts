import { Shop } from "../Shop/shop.entity";
import { ShopSellerTable } from "../Shop/shop_seller_table.entity";
import { openConnectionIfNotInitialized } from "../index";

export async function createShop(sellerId: string, shopName: string, shopDescription: string, langCode: string) {
    await openConnectionIfNotInitialized();
    return await Shop.createShop(sellerId, shopName, shopDescription, langCode)
}


export async function loadShopsOwnedBySeller(sellerId: string, lang_code: string): Promise<Shop[]> {
    await openConnectionIfNotInitialized();
    return await Shop.loadShopsOwnedBySeller(sellerId, lang_code)
}

export async function loadShopsSellerWorkedIn(sellerId: string, langCode: string) {
    await openConnectionIfNotInitialized();
    return await ShopSellerTable.loadShopsSellerWorkedIn(sellerId, langCode)
}

export async function addSellerToShop(sellerId: string, shopId: string) {
    await openConnectionIfNotInitialized();
    await ShopSellerTable.addSellerToShop(sellerId, shopId)
}

export async function removeSellerFromShop(actorSellerId: string, sellersId: string[], shopId: string) {
    await openConnectionIfNotInitialized();
    await ShopSellerTable.removeSellersFromShop(actorSellerId, sellersId, shopId)
}

