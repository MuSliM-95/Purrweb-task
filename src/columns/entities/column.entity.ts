import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Card } from "src/cards/entities/card.entity";
import { User } from "src/users/entities/user.entity";

@Table
export class ColumnModel extends Model {
    @Column({ primaryKey: true, autoIncrement: true })
    id?: number;
    
    @ForeignKey(() => User)
    @Column
    userId: number;

    @BelongsTo(() => User)
    user: User

    @Column
    title: string;

    @HasMany(() => Card)
    cards: Card[]
   
}