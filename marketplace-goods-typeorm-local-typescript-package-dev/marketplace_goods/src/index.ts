import { CirclesDBAbstractBaseEntity, Connection, MultiLangHolder, MultiLanguage } from "@circles-zone/database-typeorm-local";
import { Product } from "./Products/product.entity";
import { Shop } from "./Shop/shop.entity";
import { ProductDeal } from "./Products/product_deal.entity";
import { ProductMultiLanguage } from "./Products/product_ml.entity";
import { ShopSellerTable } from "./Shop/shop_seller_table.entity";
import { ShopMultiLang } from "./Shop/shop_multi_lang.entity";
import { Seller } from "./Users/seller.entity";
import { SellerML } from "./Users/seller_ml_table.entity";
export * from "./Interfaces/seller_interface"
export * from "./Interfaces/shop_interface"

// we need to find a path that the serverless would understand, thats because the directory structure change in serverless
// export const connection = new Connection([__dirname + "/**/*.entity.ts"], false)


const productClasses = [ProductDeal,Product,ProductMultiLanguage]
const shopClasses = [Shop,ShopSellerTable,ShopMultiLang]
const sellerClasses = [Seller,SellerML]
const circlesClasses = [CirclesDBAbstractBaseEntity,MultiLangHolder,MultiLanguage] // would be move to the typeorm package.
const allClasses = [...productClasses,...shopClasses,...sellerClasses,...circlesClasses] 

export const connection = new Connection(allClasses, false)

export async function openConnectionIfNotInitialized() {
    await connection.openConnectionIfNotInitialized()
}

// Keep this function so I wont change the interface of the
/**
 * This function opens the connection to the database
 * @returns {Promise<void>}
 */
export async function openConnection() {
    await connection.openConnectionIfNotInitialized();
}

export async function closeConnection() {
    if (connection.isInitialized)
        await connection.destroy();
}

export async function addNewProduct(group_list_id: string) {
    await openConnectionIfNotInitialized();


    const product_id = await Product.addNewProduct(group_list_id);
    return product_id;
}

export async function loadProduct(product_id: string) {
    await openConnectionIfNotInitialized();
    const product = await Product.getById(product_id)
    return product;

}