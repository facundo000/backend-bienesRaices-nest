import { ApiProperty } from "@nestjs/swagger";
import { Propiedade } from "src/propiedades/entities";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        example: 'cosa1@gmail.com',
        nullable: false
    })
    @Column('text', {
        unique: true
    })
    email: string;

    @ApiProperty({
        example: 'Adf555',
        description: 'contrasenia del usuario con una mayúscula y un caracter no numerico',
        nullable: false
    })
    @Column('text', {
        select: false
    })
    contrasenia: string;

    @ApiProperty({
        example: 'Adrian',
        description: 'nombre del usuario',
        nullable: false
    })
    @Column('text')
    nombre: string;

    @ApiProperty({
        example: 'Gonzalez',
        description: 'apellido del usuario',
        nullable: false
    })
    @Column('text')
    apellido: string;

    @ApiProperty({
        description: 'estado del usuario',
        nullable: false
    })
    @Column('bool', {
        default: true
    })
    esActivo: boolean;

    @ApiProperty({
        example: ['user', 'admin'],
        description: 'roles del usuario',
        nullable: false
    })
    @Column('text', {
        array: true,
        default: ['user']
    })
    roles: string[];

    @ApiProperty({
        example: '123456789',
        description: 'telefono del usuario sin caracteres no numérico',
        nullable: false
    })
    @Column('text', {
        unique: true
    })
    telefono: string;

    @OneToMany(
        () => Propiedade,
        (propiedade) => propiedade.user
    )
    propiedad: Propiedade[];

    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.email = this.email.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this.checkFieldsBeforeInsert();
    }
}
