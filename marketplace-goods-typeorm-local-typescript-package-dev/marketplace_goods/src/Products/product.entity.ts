import { Entity, Column, OneToMany,  FindOptionsWhere, PrimaryGeneratedColumn } from "typeorm";
import { ProductDeal } from "./product_deal.entity";
import {CirclesDBAbstractBaseEntity} from "@circles-zone/database-typeorm-local";
@Entity({ database: 'marketplace_goods', name: 'product_table' })
export class Product extends CirclesDBAbstractBaseEntity {
    @Column({ type: 'bigint', unsigned: true, nullable: false, name: 'group_list_id' })
    group_list_id!: string;

    // @ManyToOne(() => ProxyGroupList, group_list => group_list.products)
    // @JoinColumn({ name: 'group_list_id' })
    // group_list!: ProxyGroupList;

    @PrimaryGeneratedColumn({name:"id",type: "bigint", unsigned: true })
    public id!:string
    @OneToMany(() => ProductDeal, deal => deal.product)
    deals!: Promise<ProductDeal[]>;

    static async addNewProduct(group_list_id: string) {
        const product = Product.create({ group_list_id: group_list_id });
        await Product.save([product]);
        return product.id;
    }
    static async getById<T extends Product>(
        this: { new (): T } & typeof CirclesDBAbstractBaseEntity,
        id: string
      ): Promise<T | null> {
        const where = { id: id } as FindOptionsWhere<T>;
        const entity = (await super.findOneBy(where)) as T | null;
        return entity;
      }
}

