import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PropiedadesService } from 'src/propiedades/propiedades.service';
import { initialData } from './data/seed-data';
import { User } from 'src/auth/entities/user.entity';
import { FilesService } from 'src/files/files.service';

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
}
