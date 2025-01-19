import * as bcrypt from 'bcrypt';


interface SeedPropiedades {
    descripcion: string;
    habitaciones:  number;
    banio: number;
    estacionamiento: number;
    imagen: string;
    precio: number;
    slug: string;
    titulo: string;
}

interface SeedUser {
    email:       string;  
    contrasenia: string;
    nombre:       string;
    apellido:     string;
    telefono:     string;
    roles:        string[];
}
interface SeedData {
    users : SeedUser[];
    Propiedade: SeedPropiedades[];
}

export const initialData: SeedData = {
    
    users: [
        {
            email: "example@google.com",
            contrasenia: bcrypt.hashSync('Abc123456', 10),
            nombre: "Test",
            apellido: "2",
            telefono: "1234567891",
            roles: ['user']
        },
    ],
    Propiedade: [
        {
            descripcion: "Apartamento moderno en el centro de la ciudad con todas las comodidades",
            imagen:"anuncio2.jpg",
            habitaciones: 3,
            banio: 2,
            estacionamiento: 2,
            precio: 120000,
            slug: "apartamento-moderno-centro",
            titulo: "Apartamento moderno en el centro"
        },
        {
            descripcion: "Departamento de lujo en el corazón de la ciudad con acceso a gimnasio y spa",
            imagen:"anuncio3.jpg",
            habitaciones: 3,
            banio: 2,
            estacionamiento: 1,
            precio: 200000,
            slug: "departamento-luxury-city",
            titulo: "Departamento de lujo en la ciudad"
        },
        {
            descripcion: "Construcción moderna con un diseño que combina elementos rústicos y elegantes",
            imagen: "anuncio6.jpg",
            habitaciones: 2,
            banio: 1,
            estacionamiento: 1,
            precio: 85000,
            slug: "casa-terminados-de-lujo",
            titulo: "Casa terminados de Lujo"
        },
        {
            descripcion: "Apartamento moderno en el centro de la ciudad con todas las comodidades",
            imagen: "blog4.jpg",
            habitaciones: 3,
            banio: 2,
            estacionamiento: 2,
            precio: 120000,
            slug: "apartamento-moderno-centro-2",
            titulo: "Apartamento moderno en el centro 2"
        },
        {
            descripcion: "Casa de campo con amplia zona verde y acceso a piscina comunal",
            imagen: "blog3.jpg",
            habitaciones: 4,
            banio: 2,
            estacionamiento: 2,
            precio: 150000,
            slug: "casa-campo-piscina",
            titulo: "Casa de campo con piscina"
        },
        {
            descripcion: "Departamento moderno en el corazón de la ciudad con acceso a gimnasio y spa",
            imagen: "blog2.jpg",
            habitaciones: 3,
            banio: 2,
            estacionamiento: 1,
            precio: 200000,
            slug: "departamento-moderno-city",
            titulo: "Departamento moderno en la ciudad"
        },
        {
            descripcion: "Casa en el lago con excelente vista, acabados de lujo a un excelente precio",
            imagen: "blog1.jpg",
            habitaciones: 2,
            banio: 1,
            estacionamiento: 1,
            precio: 85000,
            slug: "casa-en-el-lago",
            titulo: "Casa en el Lago "
        }
    ],
}