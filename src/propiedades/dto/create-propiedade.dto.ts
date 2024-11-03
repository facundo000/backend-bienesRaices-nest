import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsInt, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";


export class CreatePropiedadeDto {

    @ApiProperty({
        description: 'Slug para identificar la propiedad',
        minLength: 2,
    })
    @IsString()
    @IsOptional()
    slug?: string;

    @ApiProperty({
        description: 'Title para identificar la propiedad',
        minLength: 2,
        nullable: false
    })
    @IsString()
    titulo: string;

    @ApiProperty({
        description: 'Precio de la propiedad',
        default: 0        
    })
    @IsNumber()
    @IsPositive()
    @IsOptional()
    precio?: number;

    @ApiProperty({
        description: 'Descripcion de la propiedad',
        nullable: true                
    })
    @IsString()
    @IsOptional()
    descripcion?: string;

    @ApiProperty({
        description: 'Cantidad de cuartos de la propiedad',
        default: 1,
        nullable: false
    })
    @IsInt()
    @IsPositive()
    habitaciones: number;

    @ApiProperty({
        description: 'Cantidad de baños de la propiedad',
        default: 1,
        nullable: false
    })
    @IsInt()
    @IsPositive()
    banio: number;

    @ApiProperty({
        description: 'Cantidad de estacionamientos de la propiedad',
        default: 0,
        nullable: true
    })
    @IsInt()
    @IsPositive()
    estacionamiento?: number;

    @ApiProperty({
        example: 'https://ruta__protegida/propiedades/propiedades_1.png',
        description: 'Imagen de la propiedad',
        nullable: true
    })
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    imagen?: string;
}
