import { Seller } from "../Users/seller.entity";
import {connection, openConnectionIfNotInitialized} from "../index"
export async function addSeller(profile_id: string, description: string, lang_code: string) {
    await openConnectionIfNotInitialized();
    const seller = await Seller.addSeller(connection, profile_id, description, lang_code)
    return seller
}

export async function loadSeller(seller_id: string, lang_code: string) {
    await openConnectionIfNotInitialized();
    await Seller.create()
    const seller = await Seller.loadSeller(seller_id, lang_code)
    return seller;
}

export async function removeSeller(seller_id: string) {
    await openConnectionIfNotInitialized();
    const seller = await loadSeller(seller_id, "en")
    await Seller.removeSellers([seller_id]);
    return seller;
}

export async function loadSellers(profile_id: string, lang_code: string) {
    await openConnectionIfNotInitialized();
    const sellers = await Seller.loadSellers(profile_id, lang_code)
    return sellers;
}

export async function removeSellers(sellers_ids: string[]) {
    await openConnectionIfNotInitialized();
    return await Seller.removeSellers(sellers_ids)
}



