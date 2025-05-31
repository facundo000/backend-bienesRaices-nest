import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Propiedade } from "./index";

@Entity()
export class PropiedadImage {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    url: string;

    @ManyToOne(
        () => Propiedade,
        (propiedade) => propiedade.imagen,
        { onDelete: 'CASCADE' }
    )
    @JoinColumn({ name: 'propiedadId' })
    propiedad: Propiedade
}
