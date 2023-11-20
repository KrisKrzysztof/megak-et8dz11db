import {forwardRef, Module} from "@nestjs/common";
import {ShopController} from "./shop.controller";
import {ShopService} from "./shop.service";
import {BasketModule} from "../basket/basket.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ShopItemEntity} from "./shop-item.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([ShopItemEntity]),
        forwardRef(() => BasketModule),
    ],
    controllers: [ShopController],
    providers: [ShopService],
    exports: [ShopService],
})
export class ShopModule {}
