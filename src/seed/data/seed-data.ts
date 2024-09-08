import * as bcrypt from 'bcrypt';


interface SeedPropiedades {
    descripcion: string;
    habitaciones:  number;
    banio: number;
    estacionamiento: number;
    imagen: string[];
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
            email: "jKuZ7@example.com",
            contrasenia: bcrypt.hashSync('Abc123456', 10),
            nombre: "Admin",
            apellido: "Admin",
            telefono: "1234567890",
            roles: ['admin']
        },
        {
            email: "jKus7@google.com",
            contrasenia: bcrypt.hashSync('Abc123456', 10),
            nombre: "Test",
            apellido: "2",
            telefono: "1234567891",
            roles: ['user', 'super-user']
        },
    ],
    Propiedade: [
        {
            descripcion: "Casa en el lago con excelente vista, acabados de lujo a un excelente precio",
            imagen: [
                "anuncio1.jpg"
            ],
            habitaciones: 2,
            banio: 1,
            estacionamiento: 1,
            precio: 85000,
            slug: "casa-en-el-lago",
            titulo: "Casa en el Lago"
        },
        {
            descripcion: "Apartamento moderno en el centro de la ciudad con todas las comodidades",
            imagen: [
                "anuncio2.jpg"
            ],
            habitaciones: 3,
            banio: 2,
            estacionamiento: 2,
            precio: 120000,
            slug: "apartamento-moderno-centro",
            titulo: "Apartamento moderno en el centro"
        },
        {
            descripcion: "Departamento de lujo en el corazón de la ciudad con acceso a gimnasio y spa",
            imagen: [
                "anuncio3.jpg"
            ],
            habitaciones: 3,
            banio: 2,
            estacionamiento: 1,
            precio: 200000,
            slug: "departamento-luxury-city",
            titulo: "Departamento de lujo en la ciudad"
        },
        {
            descripcion: "Departamento moderno en el corazón de la ciudad con acceso a gimnasio y spa",
            imagen: [
                "anuncio4.jpg"
            ],
            habitaciones: 3,
            banio: 2,
            estacionamiento: 1,
            precio: 200000,
            slug: "departamento-moderno-city-2",
            titulo: "Departamento moderno en la ciudad 2"
        },
        {
            descripcion: "Casa en el lago con excelente vista, acabados de lujo a un excelente precio",
            imagen: [
                "anuncio6.jpg"
            ],
            habitaciones: 2,
            banio: 1,
            estacionamiento: 1,
            precio: 85000,
            slug: "casa-en-el-lago-2",
            titulo: "Casa en el Lago 2"
        },
        {
            descripcion: "Apartamento moderno en el centro de la ciudad con todas las comodidades",
            imagen: [
                "blog4.jpg"
            ],
            habitaciones: 3,
            banio: 2,
            estacionamiento: 2,
            precio: 120000,
            slug: "apartamento-moderno-centro-2",
            titulo: "Apartamento moderno en el centro 2"
        },
        {
            descripcion: "Casa de campo con amplia zona verde y acceso a piscina comunal",
            imagen: [
                "blog3.jpg"
            ],
            habitaciones: 4,
            banio: 2,
            estacionamiento: 2,
            precio: 150000,
            slug: "casa-campo-piscina-3",
            titulo: "Casa de campo con piscina 3"
        },
        {
            descripcion: "Departamento moderno en el corazón de la ciudad con acceso a gimnasio y spa",
            imagen: [
                "blog2.jpg"
            ],
            habitaciones: 3,
            banio: 2,
            estacionamiento: 1,
            precio: 200000,
            slug: "departamento-moderno-city-3",
            titulo: "Departamento moderno en la ciudad 3"
        },
        {
            descripcion: "Casa en el lago con excelente vista, acabados de lujo a un excelente precio",
            imagen: [
                "blog1.jpg"
            ],
            habitaciones: 2,
            banio: 1,
            estacionamiento: 1,
            precio: 85000,
            slug: "casa-en-el-lago-3",
            titulo: "Casa en el Lago 3"
        }
        // {
        //     descripcion: "Apartamento moderno en el centro de la ciudad con todas las comodidades",
        //     imagen: [
        //         "1740176-00-L_0_2000.jpg",
        //         "1740176-00-L_1.jpg"
        //     ],
        //     habitaciones: 3,
        //     banio: 2,
        //     estacionamiento: 2,
        //     precio: 120000,
        //     slug: "apartamento-moderno-centro-3",
        //     titulo: "Apartamento moderno en el centro 3"
        // },
        // {
        //     descripcion: "Casa de campo con amplia zona verde y acceso a piscina comunal",
        //     imagen: [
        //         "1740176-00-M_0_2000.jpg",
        //         "1740176-00-M_1.jpg"
        //     ],
        //     habitaciones: 4,
        //     banio: 2,
        //     estacionamiento: 2,
        //     precio: 150000,
        //     slug: "casa-campo-piscina-4",
        //     titulo: "Casa de campo con piscina 4"
        // },
        // {
        //     descripcion: "Casa en el lago con excelente vista, acabados de lujo a un excelente precio",
        //     imagen: [
        //         "1740176-00-O_0_2000.jpg",
        //         "1740176-00-O_1.jpg"
        //     ],
        //     habitaciones: 2,
        //     banio: 1,
        //     estacionamiento: 1,
        //     precio: 85000,
        //     slug: "casa-en-el-lago-4",
        //     titulo: "Casa en el Lago 4"
        // },
        // {
        //     descripcion: "Apartamento moderno en el centro de la ciudad con todas las comodidades",
        //     imagen: [
        //         "1740176-00-P_0_2000.jpg",
        //         "1740176-00-P_1.jpg"
        //     ],
        //     habitaciones: 3,
        //     banio: 2,
        //     estacionamiento: 2,
        //     precio: 120000,
        //     slug: "apartamento-moderno-centro-4",
        //     titulo: "Apartamento moderno en el centro 4"
        // },
        // {
        //     descripcion: "Casa de campo con amplia zona verde y acceso a piscina comunal",
        //     imagen: [
        //         "1740176-00-Q_0_2000.jpg",
        //         "1740176-00-Q_1.jpg"
        //     ],
        //     habitaciones: 4,
        //     banio: 2,
        //     estacionamiento: 2,
        //     precio: 150000,
        //     slug: "casa-campo-piscina-5",
        //     titulo: "Casa de campo con piscina 5"
        // },
        // {
        //     descripcion: "Departamento moderno en el corazón de la ciudad con acceso a gimnasio y spa",
        //     imagen: [
        //         "1740176-00-R_0_2000.jpg",
        //         "1740176-00-R_1.jpg"
        //     ],
        //     habitaciones: 3,
        //     banio: 2,
        //     estacionamiento: 1,
        //     precio: 200000,
        //     slug: "departamento-moderno-city-5",
        //     titulo: "Departamento moderno en la ciudad 5"
        // },
        // {
        //     descripcion: "Casa en el lago con excelente vista, acabados de lujo a un excelente precio",
        //     imagen: [
        //         "1740176-00-S_0_2000.jpg",
        //         "1740176-00-S_1.jpg"
        //     ],
        //     habitaciones: 2,
        //     banio: 1,
        //     estacionamiento: 1,
        //     precio: 85000,
        //     slug: "casa-en-el-lago-5",
        //     titulo: "Casa en el Lago 5"
        // },
        // {
        //     descripcion: "Apartamento moderno en el centro de la ciudad con todas las comodidades",
        //     imagen: [
        //         "1740176-00-T_0_2000.jpg",
        //         "1740176-00-T_1.jpg"
        //     ],
        //     habitaciones: 3,
        //     banio: 2,
        //     estacionamiento: 2,
        //     precio: 120000,
        //     slug: "apartamento-moderno-centro-5",
        //     titulo: "Apartamento moderno en el centro 5"
        // },
        // {
        //     descripcion: "Casa de campo con amplia zona verde y acceso a piscina comunal",
        //     imagen: [
        //         "1740176-00-U_0_2000.jpg",
        //         "1740176-00-U_1.jpg"
        //     ],
        //     habitaciones: 4,
        //     banio: 2,
        //     estacionamiento: 2,
        //     precio: 150000,
        //     slug: "casa-campo-piscina-6",
        //     titulo: "Casa de campo con piscina 6"
        // },
        // {
        //     descripcion: "Departamento moderno en el corazón de la ciudad con acceso a gimnasio y spa",
        //     imagen: [
        //         "1740176-00-V_0_2000.jpg",
        //         "1740176-00-V_1.jpg"
        //     ],
        //     habitaciones: 3,
        //     banio: 2,
        //     estacionamiento: 1,
        //     precio: 200000,
        //     slug: "departamento-moderno-city-6",
        //     titulo: "Departamento moderno en la ciudad 6"
        // }
    ],
}