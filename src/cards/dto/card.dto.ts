import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class cardDto {
    @IsNumber()
    @IsOptional()
    userId?: number;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsNumber()
    @IsNotEmpty()
    columnId: number;
}