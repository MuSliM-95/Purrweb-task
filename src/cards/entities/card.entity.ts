import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { ColumnModel } from "src/columns/entities/column.entity";
import { Comment } from "src/comments/entities/comment.entity";

@Table
export class Card extends Model {
    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column
    title: string;

    @Column
    userId: number;

    @ForeignKey(() => ColumnModel)
    @Column
    columnId: number;

    @BelongsTo(() => ColumnModel)
    column: ColumnModel

    @HasMany(() => Comment)
    comments: Comment[]

}