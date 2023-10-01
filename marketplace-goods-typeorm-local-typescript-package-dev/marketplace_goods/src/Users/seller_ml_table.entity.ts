import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {MultiLanguage} from "@circles-zone/database-typeorm-local";
import {Seller} from "./seller.entity";

const tableName = 'seller_ml_table'
@Entity({database: 'marketplace_goods', name: tableName})
export class SellerML extends MultiLanguage {

    @PrimaryGeneratedColumn({name:"seller_ml_id",type: "bigint", unsigned: true })
    public id!:string
    getTableName(): string {
        return tableName
    }

    @ManyToOne(() => Seller, (seller) => seller.multiLangs)
    @JoinColumn({name: 'seller_id'})
    seller!: Seller

    @Column({type:'bigint', unsigned: true, nullable: false, name: 'seller_id'})
    sellerId!: string
}

