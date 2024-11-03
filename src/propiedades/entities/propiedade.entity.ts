import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PropiedadImage } from ".";
import { User } from "src/auth/entities/user.entity";

@Entity()
export class Propiedade {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @ApiProperty({

        example: 'casa de campo',
        description: 'Slug para identificar la propiedad',
        nullable: true
    })
    @Column('text', { nullable: true })
    slug?: string;
    
    @ApiProperty({
        example: 'My house',
        description: 'Title para identificar la propiedad',
    })
    @Column('text')
    titulo: string;
    
    @ApiProperty({
        type: Number,
        example: 1000000,
        description: 'Precio de la propiedad',
        default: 0,
        nullable: false
    })
    @Column('numeric', { default: 0 })
    precio: number;
    
    @ApiProperty({
        example: 'Casa de campo',
        description: 'Descripcion de la propiedad',
        nullable: false
    })
    @Column({ type: 'text', nullable: true })
    descripcion: string;
    
    @ApiProperty({
        type: Number,
        example: 2,
        description: 'Habitaciones de la propiedad',
        default: 0
    })
    @Column('int', { default: 0 })
    habitaciones: number;
    
    @ApiProperty({
        type: Number,
        example: 2,
        description: 'Baños de la propiedad',
        default: 0
    })
    @Column('int', { default: 0 })
    banio: number;
    
    @ApiProperty({
        type: Number,
        example: 1,
        description: 'Estacionamiento de la propiedad',
        nullable: false
    })
    @Column('int', { default: 0 })
    estacionamiento: number;
    
    @ApiProperty({
        type: Date,
        description: 'Fecha de creacion de la propiedad'
    })
    @CreateDateColumn({ type: 'date' })
    creado: Date;
    
    @ApiProperty({
        nullable: true,
        description: 'Unica Imagen de la propiedad'
    })
    @OneToOne(
        () => PropiedadImage,
        (propiedadImage) => propiedadImage.propiedad,
        { 
            cascade: true,
            eager: true
        }
    )
    imagen?: PropiedadImage;

    @ManyToOne(
        () => User,
        (user) => user.propiedad,
        { eager: true }
    )
    user: User;
}
