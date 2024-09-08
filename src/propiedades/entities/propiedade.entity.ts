import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PropiedadImage } from ".";
import { Vendedore } from "src/vendedores/entities/vendedore.entity";
import { User } from "src/auth/entities/user.entity";

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

    @OneToOne(
        () => PropiedadImage,
        (propiedadImage) => propiedadImage.propiedad,
        { 
            cascade: true,
            eager: true
        }
    )
    imagen?: PropiedadImage[];

    @ManyToOne(
        () => User,
        (user) => user.propiedad,
        { eager: true }
    )
    user: User;
}
