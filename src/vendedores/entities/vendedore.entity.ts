import { Propiedade } from "src/propiedades/entities";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @OneToMany(
        () => Propiedade,
        (Propiedade) => Propiedade.titulo,
        { cascade: true }
    )
    propiedades?: Propiedade[];
}
