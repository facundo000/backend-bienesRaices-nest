import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PropiedadImage } from ".";
import { Vendedore } from "src/vendedores/entities/vendedore.entity";

@Entity()
export class Propiedade {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', { nullable: true })
    slug?: string;

    @Column('text')
    titulo: string;

    @Column('numeric', { default: 0 })
    precio: number;

    @Column({ type: 'text', nullable: true })
    descripcion: string;

    @Column('int', { default: 0 })
    habitaciones: number;

    @Column('int', { default: 0 })
    banio: number;

    @Column('int', { default: 0 })
    estacionamiento: number;

    @CreateDateColumn({ type: 'date' })
    creado: Date;

    @OneToMany(
        () => PropiedadImage,
        (propiedadImage) => propiedadImage.propiedad,
        { cascade: true }
    )
    imagen?: PropiedadImage[];

    // @ManyToOne(
    //     () => Vendedore,
    //     (vendedore) => vendedore.propiedades,
    // )
    // vendedor: Vendedore;
}
