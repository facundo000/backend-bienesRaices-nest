import { IsNotEmpty, IsString, Matches } from "class-validator";


export class CreateVendedoreDto {

    @IsString()
    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    nombre: string;

    @IsString()
    @IsNotEmpty({ message: 'El apellido es obligatorio' })
    apellido: string;

    @IsString()
    @IsNotEmpty({ message: 'El teléfono es obligatorio' })
    @Matches(/^[0-9]{8}$/, { message: 'El teléfono debe tener exactamente 8 dígitos numéricos' })
    telefono: string;
}
