import { Shop } from "./shop.entity";

export abstract class Discount { // there will be probably few types of discounts
    shop!: Shop;
    
}