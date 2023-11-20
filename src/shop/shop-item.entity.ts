import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {ShopItem} from "../interfaces/shop";

@Entity()
export class ShopItemEntity implements ShopItem {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        length: 60
    })
    name: string;

    @Column({
        type: 'text',
        default: '(brak)',
    })
    description: string;

    // @Column({
    //     length: 10000,
    //     default: null,
    //     nullable: true,
    // })
    // description2: string | null;

    @Column({
        type: 'float',
        precision: 6,
        scale: 2,
    })
    price: number;

    // @Column({
    //     default: () => 'CURRENT_TIMESTAMP'
    // })
    // createdAt: Date;

}
