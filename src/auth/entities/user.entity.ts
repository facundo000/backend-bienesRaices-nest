import { Propiedade } from "src/propiedades/entities";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true
    })
    email: string;

    @Column('text', {
        select: false
    })
    contrasenia: string;

    @Column('text')
    nombre: string;

    @Column('text')
    apellido: string;

    @Column('bool', {
        default: true
    })
    esActivo: boolean;

    @Column('text', {
        array: true,
        default: ['user']
    })
    roles: string[];

    @Column('text', {
        unique: true
    })
    telefono: string;

    @OneToMany(
        () => Propiedade,
        (propiedade) => propiedade.user
    )
    propiedad: Propiedade;

    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.email = this.email.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this.checkFieldsBeforeInsert();
    }
}
