import {forwardRef, Inject, Injectable} from '@nestjs/common';
import {AddProductDto} from "./dto/add-product.dto";
import {
    AddProductToBasketResponse, GetTotalBasketPriceResponse,
    RemoveProductFromBasketResponse
} from "../interfaces/basket";
import {ShopService} from "../shop/shop.service";

@Injectable()
export class BasketService {
    private items: AddProductDto[] = [];

    constructor(
        @Inject(forwardRef(() => ShopService)) private shopService: ShopService,
    ) {
    }

    add(item: AddProductDto): AddProductToBasketResponse {
        const {name, count} = item;

        if (
            typeof name !== 'string'
            ||
            typeof count !== 'number'
            ||
            name === ''
            ||
            count < 1
            ||
            !this.shopService.hasProduct(name)
        ) {
            return {
                isSuccess: false,
            }
        }
        this.items.push(item);

        return {
            isSuccess: true,
            index: this.items.length - 1,
        }
    }

    remove(index: number): RemoveProductFromBasketResponse {
        const {items} = this;
        if (
            index < 0
            ||
            index >= items.length
        ) {
            return {isSuccess: false};
        }

        items.splice(index, 1);

        return {isSuccess: true};
    }

    getList() {
        return this.items;
    }

    async totalPrice(): Promise<GetTotalBasketPriceResponse> {
        if (!this.items.every(item => this.shopService.hasProduct(item.name))) {
            const alternativeBasket = this.items.filter(item => this.shopService.hasProduct(item.name));

            return {
                isSuccess: false,
                alternativeBasket,
            };
        }

        return (await Promise.all(this.items
            .map(async item => (await this.shopService.getPriceOfProduct(item.name)) * item.count * 1.23)))
            .reduce((prev, curr) => prev + curr, 0);
    }

    async countPromo(): Promise<number> {
        return ((await this.totalPrice()) as number) > 10 ? 1 : 0;
    }

}