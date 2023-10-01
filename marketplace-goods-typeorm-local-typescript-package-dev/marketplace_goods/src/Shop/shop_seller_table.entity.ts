import { CirclesDBAbstractBaseEntity } from "@circles-zone/database-typeorm-local";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Shop } from "./shop.entity";
import { Seller } from "../Users/seller.entity";

const tableName = "shop_seller_table"
const sellerIdColumnName = "seller_id"
const shopIdColumnName = "shop_id"
export enum Role {
    CASHIER = 'CASHIER',
    MANAGER = 'MANAGER',
}

/**
 * This entity represent the join table between shop and sellers.
 * To make the table implement @abstract CirclesDBAbstractBaseEntity i had to make it a class
 */
@Entity({ database: 'marketplace_goods', name: tableName })
export class ShopSellerTable extends CirclesDBAbstractBaseEntity {
    // foreign keys

    @PrimaryGeneratedColumn({
        name: "id",
        type: "bigint",
        unsigned: true,
      })
      id!: string;
    @Column({ type:"unsigned big int",name: sellerIdColumnName })
    sellerId: string

    @Column({ name: shopIdColumnName ,type:"unsigned big int"})
    shopId: string

    @ManyToOne(() => Shop, shop => shop.sellers)
    @JoinColumn({ name: shopIdColumnName })
    shop: Shop

    @ManyToOne(() => Seller, seller => seller.workInShops)
    @JoinColumn({ name: sellerIdColumnName })
    seller: Seller

    @Column({ type: "enum", enum: Role, default: Role.CASHIER })
    role: Role


    static async loadShopsSellerWorkedIn(sellerId: string, langCode: string): Promise<Shop[]> {
        const shopSellers = await ShopSellerTable.findBy({ sellerId })
        
        const shops = await Shop.findMultiLangHolders("id", shopSellers.map(shopSeller => shopSeller.shopId), langCode)
        return shops
    }


    static async addSellerToShop(sellerId: string, shopId: string, role?: Role) {
        // validation
        if (await Shop.isShopOwner(sellerId, shopId))
            throw new Error("Cant add the owner as a seller.")

        const shopSellerRow = ShopSellerTable.create({ shop: { id: shopId }, seller: { id: sellerId }, role: role })
        await shopSellerRow.save()
    }

    static async removeSellersFromShop(actorSellerId: string, toRemoveSellersId: string[], shopId: string) {
        //validation
        if (! await Shop.isShopOwner(actorSellerId, shopId))
            throw new Error("Only shop owner can remove workers");

        if (actorSellerId in toRemoveSellersId)
            throw new Error("Shop owner cannot be removed.");

        // remove from db.
        return await this.delete(toRemoveSellersId)
    }
}
