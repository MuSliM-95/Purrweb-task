import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Card } from "src/cards/entities/card.entity";


@Table
export class Comment extends Model {
    @Column({autoIncrement: true, primaryKey: true})
    id: number;

    @Column
    text: string;
 
    @Column
    userId: number;

    @ForeignKey(() => Card)
    @Column
    cardId: number;

    @BelongsTo(() => Card)
    card: Card;

}