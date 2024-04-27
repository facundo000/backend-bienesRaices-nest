import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Propiedade } from "./index";

@Entity()
export class PropiedadImage {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    url: string;

    @ManyToOne(
        () => Propiedade,
        (propiedade) => propiedade.imagen
    )
    propiedad: Propiedade
}
