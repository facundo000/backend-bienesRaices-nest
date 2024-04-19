import { IsArray, IsDate, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";


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

    @IsDate()
    @IsNotEmpty()
    creado: Date;

    @IsString({ each: true })
    @IsArray()
    imagen: string[];

    vendedores_id: string[];
}
