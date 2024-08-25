import { Module } from '@nestjs/common';
import { VendedoresService } from './vendedores.service';
import { VendedoresController } from './vendedores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vendedore } from './entities/vendedore.entity';
import { Propiedade, PropiedadImage } from 'src/propiedades/entities';
import { PropiedadesService } from 'src/propiedades/propiedades.service';
import { PropiedadesModule } from '../propiedades/propiedades.module';

@Module({
  controllers: [VendedoresController],
  providers: [VendedoresService],
  imports: [
    TypeOrmModule.forFeature([ Vendedore, Propiedade ]),
    PropiedadesModule
  ]
})
export class VendedoresModule {}
