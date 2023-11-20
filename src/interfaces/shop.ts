export interface ShopItem {
    id: string
    name: string;
    description: string;
    price: number;
}

export type GetListOfItemsResponse = ShopItem[];

export type GetOneProductResponse = ShopItem;

export type CreateProductResponse = ShopItem;