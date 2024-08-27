import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/entities/user.entity";

@Table
export class Token extends Model {
    
    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column
    refreshToken: string;

    @ForeignKey(() => User)
    @Column
    userId: number;
    

    @BelongsTo(() => User)
    user: User
}