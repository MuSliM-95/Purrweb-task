import { Column, HasMany, Model, Table } from "sequelize-typescript";
import { ColumnModel } from "src/columns/entities/column.entity";
import { Token } from "src/tokens/entities/token.entity";

@Table
export class User extends Model {
    @Column({autoIncrement: true, primaryKey: true })
    id: number

    @Column
    role: string;

    @Column
    email: string;

    @Column
    password: string;
    
    
    @HasMany(() => Token)
    tokens: Token[]
    
    @HasMany(() => ColumnModel)
    columns: ColumnModel[]

}