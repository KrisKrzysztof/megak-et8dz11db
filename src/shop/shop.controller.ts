import {
    Controller,
    Delete,
    Get,
    HostParam,
    Inject,
    Param, Post,
    Redirect
} from '@nestjs/common';
import {
    CreateProductResponse,
    GetListOfItemsResponse,
    GetOneProductResponse
} from "../interfaces/shop";
import {ShopService} from "./shop.service";

@Controller(
//     {
//     path: 'shop',
//     host: ':name.lvh.me',
// }  // zmienia 'localhost' na adres dowolny
    'shop'
)
export class ShopController {

    onApplicationBootstrap() {
        console.log('załadowany');
    }

    onApplicationShutdown() {
        console.log('apka zaraz zniknie')
    }

    constructor(
        @Inject(ShopService) private shopService: ShopService,
    ) {
    }

    @Get('/')
    getProductsList(): Promise<GetListOfItemsResponse> {
        return this.shopService.getProducts();
    }

    @Get('/:id')
    getOneProduct(
        @Param('id') id: string,
    ): Promise<GetOneProductResponse> {
        return this.shopService.getOneProduct(id);
    }

    @Delete('/:id')
    deleteProduct(
        @Param('id') id: string,
    ) {
        return this.shopService.removeProduct(id);
    }

    @Post('/')
    createNewProduct(): Promise<CreateProductResponse> {
        return this.shopService.createProduct();
    }

    // @Get('/test/:age')
    // @Redirect()
    // testRedirect(
    //     @Param('age') age: string,
    // ) {
    //     const url = Number(age) > 18 ? '/site' : '/block'
    //
    //     return {
    //         url,
    //     }
    // }


    // @Get('/welcome')
    // testHost(
    //     @HostParam('name') siteName: string,
    // ) {
    //     return `Witaj na sklepie ${siteName}`;
    // }

}
