import {forwardRef, Inject, Injectable} from '@nestjs/common';
import {GetListOfItemsResponse} from "../interfaces/shop";
import {BasketService} from "../basket/basket.service";
import {ShopItemEntity} from "./shop-item.entity";

@Injectable()
export class ShopService {

    constructor(
        @Inject(forwardRef(() => BasketService)) private basketService: BasketService,
    ) {
    }

    async getProducts(): Promise<GetListOfItemsResponse> {
        return ShopItemEntity.find();
    }


    async hasProduct(name: string): Promise<boolean> {
        return (await this.getProducts()).some(item => item.name === name);
    }


    async getPriceOfProduct(name: string): Promise<number> {
        return (await this.getProducts()).find(item => item.name === name).price;
    }

    async getOneProduct(id: string): Promise<ShopItemEntity> {
        return ShopItemEntity.findOneOrFail({
            where: {id}
        });
    }

    async removeProduct(id: string) {
        await ShopItemEntity.delete(id);
    }

    async createProduct(): Promise<ShopItemEntity> {
        const newItem = new ShopItemEntity();
        newItem.price = 100;
        newItem.name = 'Duży ogórek';
        newItem.description = 'Naprawdę!';

        await newItem.save();

        return newItem;
    }

    async addBoughtCounter(id: string) {
        await ShopItemEntity.update(id, {
            wasEverBought: true,
        })

        const item = await ShopItemEntity.findOneOrFail({
            where: {id}
        });

        item.boughtCounter++;

        await item.save();
    }


}