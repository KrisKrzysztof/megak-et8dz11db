import {forwardRef, Inject, Injectable} from '@nestjs/common';
import {GetListOfItemsResponse} from "../interfaces/shop";
import {BasketService} from "../basket/basket.service";
import {InjectRepository} from "@nestjs/typeorm";
import {ShopItemEntity} from "./shop-item.entity";
import {Repository} from "typeorm";

@Injectable()
export class ShopService {

    constructor(
        @Inject(forwardRef(() => BasketService)) private basketService: BasketService,
        @InjectRepository(ShopItemEntity) private shopItemEntityRepository: Repository<ShopItemEntity>,
    ) {
    }

    async getProducts(): Promise<GetListOfItemsResponse> {
        return this.shopItemEntityRepository.find();

        // console.log(this.basketService.countPromo());
        // return [
        //     {
        //         name: 'Ogórki Kiszone',
        //         description: 'Bardzo dobre ogórki.',
        //         price: 4,
        //     },
        //     {
        //         name: 'Super ogórki',
        //         description: 'Jeszcze lepsze ogórki.',
        //         price: 6 /* - this.basketService.countPromo() */,
        //     },
        //     {
        //         name: 'Ogórki afrykańskie',
        //         description: 'Ogórki z dalekich krajów.',
        //         price: 5 /* - this.basketService.countPromo() */,
        //     },
        // ];
    }


    async hasProduct(name: string): Promise<boolean> {
        return (await this.getProducts()).some(item => item.name === name);
    }


    async getPriceOfProduct(name: string): Promise<number> {
        return (await this.getProducts()).find(item => item.name === name).price;
    }

    async getOneProduct(id: string): Promise<ShopItemEntity> {
        return this.shopItemEntityRepository.findOneOrFail({
            where: {id}
        });
    }

    async removeProduct(id: string) {
        await this.shopItemEntityRepository.delete(id);
    }

    async createProduct(): Promise<ShopItemEntity> {
        const newItem = new ShopItemEntity();
        newItem.price = 100;
        newItem.name = 'Duży ogórek';
        newItem.description = 'Naprawdę!';

        await this.shopItemEntityRepository.save(newItem);

        return newItem;
    }


}

//todo 18:20