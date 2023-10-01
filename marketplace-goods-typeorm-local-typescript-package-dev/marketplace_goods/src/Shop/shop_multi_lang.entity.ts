import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import {MultiLanguage} from "@circles-zone/database-typeorm-local";
import { Shop } from "./shop.entity";

const tableName = 'shop_ml_table';
@Entity({database:'marketplace_goods',name:tableName})
export class ShopMultiLang extends MultiLanguage {
    @PrimaryGeneratedColumn({name:"id",type: "bigint", unsigned: true })
    public id!:string
    @ManyToOne(()=> Shop, shop => shop.multiLangs)
    @JoinColumn({name:'shop_id'})
    shop!: Shop;
    getTableName(): string {
        return tableName
    }

    @Column({name:"description",type:"varchar"})
    description:string
}