import { IsNotEmpty, IsNumber, IsOptional, IsString, isNotEmpty } from "class-validator";

export class ColumnDto {
    @IsString()
    @IsNotEmpty()
    title: string;
    
    @IsNumber()
    @IsOptional()
    userId?: number
}