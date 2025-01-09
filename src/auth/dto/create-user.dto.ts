import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";


export class CreateUserDto {
    
    @ApiProperty({
        example: 'Qzj3p@example.com',
        description: 'Email del usuario',
        nullable: false
    })
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'Adf555',
        description: 'Contraseña del usuario',
        nullable: false
    })
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    contrasenia: string;

    @ApiProperty({
        example: 'Adrian',
        description: 'Nombre del usuario',
        nullable: false
    })
    @IsString()
    @MinLength(1)    
    nombre: string;

    @ApiProperty({
        example: 'Gonzalez',
        description: 'Apellido del usuario',
        nullable: false
    })
    @IsString()
    @MinLength(1)  
    apellido: string;

    @ApiProperty({
        example: '12345678',
        description: 'Celular del usuario (debe tener exactamente 8 dígitos numéricos)',
        nullable: false,
        uniqueItems: true
    })
    @IsString()
    @MinLength(1)
    @IsNotEmpty({ message: 'El teléfono es obligatorio' })
    @Matches(/^[0-9]{8}$/, { message: 'El teléfono debe tener exactamente 8 dígitos numéricos' })
    telefono: string;
}
