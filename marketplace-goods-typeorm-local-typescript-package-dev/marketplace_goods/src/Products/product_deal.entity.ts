import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Shop } from "../Shop/shop.entity";
import { Product } from "./product.entity";
import { ProductMultiLanguage } from "./product_ml.entity";
import {CirclesDBAbstractBaseEntity} from "@circles-zone/database-typeorm-local";

@Entity({ database: 'marketplace_goods', name: 'product_deal_table' })
export class ProductDeal extends CirclesDBAbstractBaseEntity {
    @PrimaryGeneratedColumn({name:"id",type: "bigint", unsigned: true })
    public id!:string

    @ManyToOne(() => Shop, shop => shop.product_deals)
    @JoinColumn({ name: 'shop_id' })
    shop!: Shop;

    @ManyToOne(() => Product, product => product.deals)
    @JoinColumn({ name: 'product_id' })
    product!: Product;

    @OneToMany(()=>ProductMultiLanguage, product_ml => product_ml.product_deal)
    product_ml!: ProductMultiLanguage;
    
    @Column({type:'float', name: 'regular_price' })
    price!: number;

    @Column({ type:'int',name: 'currency_id' })
    currency_id!: number;

    @Column({type:'int', name: 'quantity',unsigned:true })
    quantity!: number;
}