import { Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { ProductDeal } from "./product_deal.entity";
import {MultiLanguage} from "@circles-zone/database-typeorm-local";

const tableName = 'product_deal_ml_table'
@Entity({database:'marketplace_goods', name:tableName})
export class ProductMultiLanguage extends MultiLanguage {
    @PrimaryGeneratedColumn({name:"id",type: "bigint", unsigned: true })
    public id!:string
    @ManyToOne(
        () => ProductDeal, 
        product_deal => product_deal.product_ml)
    @JoinColumn({ name: "product_deal_id" })
    product_deal!: ProductDeal;

    getTableName(): string {
        return tableName
    }
}
