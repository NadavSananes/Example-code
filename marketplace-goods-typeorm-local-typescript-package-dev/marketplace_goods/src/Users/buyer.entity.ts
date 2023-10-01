import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import {CirclesDBAbstractBaseEntity} from "@circles-zone/database-typeorm-local";

@Entity({database:'marketplace_goods', name:'buyer_table'})
export class Buyer extends CirclesDBAbstractBaseEntity {
    @PrimaryGeneratedColumn({name:"buyer_id",type: "bigint", unsigned: true })
    public id!:string
    @Column({ type: "bigint" })
    criteria_id!: string;
    
}

