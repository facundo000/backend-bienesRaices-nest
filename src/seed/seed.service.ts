import { Injectable } from '@nestjs/common';
import { PropiedadesService } from 'src/propiedades/propiedades.service';
import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {

  constructor(
    private readonly propiedadesService: PropiedadesService
  ) {}
  async executeSeed() {
    await this.insertNewPropiedades();

    return 'Seed executed';
  }

  private async insertNewPropiedades() {
    await this.propiedadesService.deleteAllPropiedades(); 

    const propiedade = initialData.Propiedade;

    const insertPromises = [];

    propiedade.forEach( propiedade => {
      insertPromises.push( this.propiedadesService.create( propiedade ) );
    });
    
    await Promise.all( insertPromises );

    return true;
  }
}
