import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";


export class CreateUserDto {
    
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    contrasenia: string;

    @IsString()
    @MinLength(1)    
    nombre: string;

    @IsString()
    @MinLength(1)  
    apellido: string;

    @IsString()
    @MinLength(1)
    @IsNotEmpty({ message: 'El teléfono es obligatorio' })
    @Matches(/^[0-9]{8}$/, { message: 'El teléfono debe tener exactamente 8 dígitos numéricos' })
    telefono: string;
}
