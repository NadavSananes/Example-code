import { Entity, In, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { Seller } from "../Users/seller.entity";
import { ProductDeal } from "../Products/product_deal.entity";
import { CirclesDBAbstractBaseEntity, MultiLangHolder } from "@circles-zone/database-typeorm-local";
import { ShopMultiLang } from "./shop_multi_lang.entity";
import { ShopSellerTable } from "./shop_seller_table.entity"

const tableName = 'shop_table'
const ownerSellerIdColumnName = 'owner_seller_id'

@ObjectType({ implements: CirclesDBAbstractBaseEntity })
@Entity({ database: 'marketplace_goods', name: tableName })
export class Shop extends MultiLangHolder<ShopMultiLang> {
    @PrimaryGeneratedColumn({name:"id",type: "bigint", unsigned: true })
    public id!:string
    @Field(() => Seller)
    @ManyToOne(() => Seller, seller => seller.shopsOwnedByMe)
    @JoinColumn({ name: ownerSellerIdColumnName })
    owner!: Seller;

    @Field(() => [Seller])
    @OneToMany(() => ShopSellerTable, shopSellerColumn => shopSellerColumn.shop)
    sellers: ShopSellerTable[];


    @OneToMany(() => ShopMultiLang, shopMultiLang => shopMultiLang.shop)
    multiLangs!: ShopMultiLang[];

    @OneToMany(() => ProductDeal, productDeal => productDeal.shop)
    product_deals!: ProductDeal[];

    // discounts!: Discount[]; will be add in different PR


    // shop functions
    getMyClass() {
        return Shop;
    }
    getMultiLangs(): ShopMultiLang[] {
        return this.multiLangs
    }
    getTableName(): string {
        return tableName;
    }
    getMultiLangsFieldName(): string {
        const multiLangsFieldName = 'multiLangs'
        this[multiLangsFieldName];
        return multiLangsFieldName
    }
    createEmptyMultiLang(): ShopMultiLang {
        return ShopMultiLang.create()
    }


    // static functions

    static async deleteShops(shopIds: string[]) {
        return await this.delete({ id: In(shopIds) })
    }

    static async loadShopsOwnedBySeller(sellerId: string, lang_code: string) {
        return await Shop.findMultiLangHolders(ownerSellerIdColumnName, [sellerId], lang_code);
    }



    static async createShop(sellerId: string, shopName: string, shopDescription: string, langCode: string): Promise<Shop> {
        const shop = Shop.create({ owner: { id: sellerId } })
        await shop.save()
        const multiLang = ShopMultiLang.create({ shop: { id: shop.id }, text: shopName, description: shopDescription, lang_code: langCode })
        await multiLang.save()
        shop.multiLang = multiLang
        shop.multiLangs = [multiLang]
        return shop
    }

    static async isShopOwner(sellerId: string, shopId: string) {
        const shop = await Shop.findOneBy({ owner: { id: sellerId }, id: shopId })
        return shop !== null
    }
}
