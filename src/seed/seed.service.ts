import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PropiedadesService } from 'src/propiedades/propiedades.service';
import { initialData } from './data/seed-data';
import { User } from 'src/auth/entities/user.entity';
import { FilesService } from 'src/files/files.service';
import { join } from 'path';
import { existsSync, readdirSync, unlinkSync, mkdirSync, copyFileSync } from 'fs';

@Injectable()
export class SeedService {

  constructor(
    private readonly propiedadesService: PropiedadesService,
    private readonly filesService: FilesService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  
  async executeSeed() {
    await this.deleteAllTables();
    await this.cleanImageDirectory();
    const adminUser = await this.insertUsers();
    await this.insertNewPropiedades(adminUser);

    return 'Seed executed';
  }

  private async deleteAllTables() {
    await this.propiedadesService.deleteAllPropiedades();
    await this.filesService.deleteAllImages();
    const queryBuilder = this.userRepository.createQueryBuilder();
    await queryBuilder
    .delete()
    .where({})
    .execute();

  }

  private async insertUsers(){
    const seedUsers = initialData.users;
    
    const users: User[] = [];

    seedUsers.forEach( user => {
      users.push(this.userRepository.create(user));
    });

    const dbUsers = await this.userRepository.save(seedUsers);

    return dbUsers[0];
  }

  private async insertNewPropiedades(user: User) {
    await this.propiedadesService.deleteAllPropiedades(); 

    const propiedades = initialData.Propiedade;
    const users = await this.userRepository.find();


    const regularUser = users.find(u => u.roles.includes('user'));

    const insertPromises = [];

    // propiedade.forEach( propiedad => {
    //   insertPromises.push( this.propiedadesService.create( propiedad, user ) );
    // });
    propiedades.forEach((propiedad) => {

      insertPromises.push(this.propiedadesService.create(propiedad, regularUser));
    });
    
    await Promise.all( insertPromises );

    return true;
  }

  private async cleanImageDirectory() {
    const directoryPath = join(__dirname, '../../static/propiedades');
    const backupDirectoryPath = join(__dirname, '../../static/backup');

    // Si el directorio no existe, lo creamos
    if (!existsSync(directoryPath)) {
        mkdirSync(directoryPath, { recursive: true });
    } else {
        // Leer todos los archivos en el directorio
        const files = readdirSync(directoryPath);

        // Eliminar cada archivo
        for (const file of files) {
            const filePath = join(directoryPath, file);
            try {
                unlinkSync(filePath);
            } catch (error) {
                console.error(`Error al eliminar el archivo ${file}:`, error);
            }
        }
    }

    // Copiar las imágenes desde el directorio de respaldo
    const backupFiles = readdirSync(backupDirectoryPath);
    for (const file of backupFiles) {
        const srcPath = join(backupDirectoryPath, file);
        const destPath = join(directoryPath, file);
        try {
            copyFileSync(srcPath, destPath);
        } catch (error) {
            console.error(`Error al copiar el archivo ${file}:`, error);
        }
    }
  }
}
