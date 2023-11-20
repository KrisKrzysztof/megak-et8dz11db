import {AddProductDto} from "../basket/dto/add-product.dto";

export type AddProductToBasketResponse = {
    isSuccess: boolean;
    index: number;
} | {
    isSuccess: false,
}

export interface RemoveProductFromBasketResponse {
    isSuccess: boolean;
}

export type GetProductsInBasketResponse = AddProductDto[];
export type GetTotalBasketPriceResponse = number
    | {
    isSuccess: false;
    alternativeBasket: AddProductDto[];
}
;