import { IsArray, IsDate, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, ValidationTypes } from "class-validator";
import { CreateDateColumn } from "typeorm";


export class CreatePropiedadeDto {

    @IsString()
    @IsOptional()
    slug?: string;

    @IsString()
    titulo: string;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    precio?: number;

    @IsString()
    @IsOptional()
    descripcion?: string;

    @IsInt()
    @IsPositive()
    habitaciones: number;

    @IsInt()
    @IsPositive()
    banio: number;

    @IsInt()
    @IsPositive()
    estacionamiento: number;

    // @IsString({ each: true })
    // @IsArray()
    // imagen: string[];

    // vendedores_id: string[];
}
