import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PropiedadesService } from 'src/propiedades/propiedades.service';
import { initialData } from './data/seed-data';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class SeedService {

  constructor(
    private readonly propiedadesService: PropiedadesService,
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


    const adminUser = users.find(u => u.roles.includes('admin'));
    const nonAdminUsers = users.filter(u => !u.roles.includes('admin'));

    const insertPromises = [];

    // propiedade.forEach( propiedad => {
    //   insertPromises.push( this.propiedadesService.create( propiedad, user ) );
    // });
    propiedades.forEach((propiedad, index) => {
      let usuarioAsociado = adminUser;
      if (index >= propiedades.length - 3) {
        usuarioAsociado = nonAdminUsers[Math.floor(Math.random() * nonAdminUsers.length)];
      }
      insertPromises.push(this.propiedadesService.create(propiedad, usuarioAsociado));
    });
    
    await Promise.all( insertPromises );

    return true;
  }
}
