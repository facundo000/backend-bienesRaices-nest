import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

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

    // @Column('text', { nullable: true })
    // imagen: string[];

    // @Column('uuid', { nullable: true })
    // vendedores_id: string;
}
