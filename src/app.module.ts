import {forwardRef, Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {BasketModule} from "./basket/basket.module";
import {ShopModule} from "./shop/shop.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {config} from "../config/config";

@Module({
  imports: [
      TypeOrmModule.forRoot({
          type: 'mysql',
          host: config.dbHost,
          port: 3306,
          username: config.dbUser,
          password: config.dbPassword,
          database: config.dbDatabase,
          entities: ["dist/**/**.entity{.ts,.js}"],
          bigNumberStrings: false,
          logging: true,
          synchronize: true,
          // autoLoadEntities: true,
      }),
      BasketModule,
      ShopModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
