import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Vendedore {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    nombre: string;

    @Column('text')
    apellido: string;

    @Column('text', { unique: true })
    telefono: string;
}
