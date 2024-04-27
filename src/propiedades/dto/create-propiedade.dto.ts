import { IsArray, IsInt, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";


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

    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    imagen?: string[];

    // @IsString()
    // vendedor: string;
}
