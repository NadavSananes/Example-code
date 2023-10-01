import { Column, Entity, In, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Shop } from "../Shop/shop.entity";
import { CirclesDBAbstractBaseEntity, Connection, MultiLangHolder } from "@circles-zone/database-typeorm-local";
import { SellerML } from "./seller_ml_table.entity";
import { ShopSellerTable } from "../Shop/shop_seller_table.entity";
import { Field, ObjectType } from "type-graphql";

const tableName = `seller_table`
const profileIdFieldName = `profile_id`

@ObjectType({ implements: CirclesDBAbstractBaseEntity })
@Entity({ database: 'marketplace_goods', name: tableName })
export class Seller extends MultiLangHolder<SellerML> {

    @Field(() => [Shop])
    @OneToMany(() => Shop, shop => shop.owner)
    shopsOwnedByMe!: Shop[];

    @Field(() => [Shop])
    @OneToMany(() => ShopSellerTable, shopSellerColumn => shopSellerColumn.seller)
    workInShops!: ShopSellerTable[];

    @OneToMany(() => SellerML, (ml) => ml.seller)
    multiLangs!: SellerML[]

    @Field(() => String)
    //no relation until deployment of both
    @Column({ type: "bigint", nullable: false, name: profileIdFieldName })
    profile_id!: string

    @Field(() => String)
    description!: string

    @PrimaryGeneratedColumn({name:"seller_id",type: "bigint", unsigned: true })
    public id!:string

    static async addSeller(connection: Connection, profileId: string, description: string, langCode: string) {
        const query = "SELECT * from profile.profile_view WHERE profile_id = ?"
        const profile = await connection.query(query, [profileId])
        if (profile === null)
            return null
        let seller = Seller.create({ profile_id: profileId })

        await seller.save()
        const multiLang = SellerML.create({ sellerId: seller.id, text: description, lang_code: langCode })
        seller.multiLang = multiLang
        seller.multiLangs = [multiLang]
        await SellerML.save([multiLang])
        await seller.reload()
        return seller;
    }


    static async loadSeller(seller_id: string, lang_code: string) {
        const _ = Seller.create() // just to get the id field name.
        const sellers = await Seller.findMultiLangHolders(_.getIdFieldName(), [seller_id], lang_code);
        sellers.forEach(seller => seller.description = seller.multiLang.text)
        return sellers.length > 0 ? sellers[0] === undefined ? null : sellers[0] : null;
    }

    static async loadSellers(profile_id: string, lang_code: string) {
        const sellers = await Seller.findMultiLangHolders(profileIdFieldName, [profile_id], lang_code);
        sellers.forEach(seller => seller.description = seller.multiLang.text)
        return sellers;
    }

    static async removeSellers(sellers_ids: string[]) {
        return await this.delete({ id: In(sellers_ids) })
    }

    getMyClass() { return Seller; }

    getTableName(): string { return tableName }

    getMultiLangs(): SellerML[] { return this.multiLangs; }

    getMultiLangsFieldName(): string {
        const fieldName = `multiLangs`
        this[fieldName]
        return fieldName;
    }

    createEmptyMultiLang(): SellerML {
        Seller.create()
        return SellerML.create()
    }

    async reload(): Promise<void> {
        await super.reload()
        this.description = this.multiLang ? this.multiLang.text : this.description
    }
}