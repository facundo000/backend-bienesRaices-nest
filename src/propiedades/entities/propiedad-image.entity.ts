import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Propiedade } from "./index";

@Entity()
export class PropiedadImage {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    url: string;

    @OneToOne(
        () => Propiedade,
        (propiedade) => propiedade.imagen,
        { onDelete: 'CASCADE' }
    )
    propiedad: Propiedade
}
