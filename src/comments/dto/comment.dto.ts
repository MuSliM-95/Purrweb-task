import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CommentDto {
    @IsNumber()
    @IsOptional()
    userId?: number;

    @IsNumber()
    @IsNotEmpty()
    cardId: number;

    @IsString()
    @IsNotEmpty()
    text: string;
}