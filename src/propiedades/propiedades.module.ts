import { Module } from '@nestjs/common';
import { PropiedadesService } from './propiedades.service';
import { PropiedadesController } from './propiedades.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Propiedade } from './entities/propiedade.entity';

@Module({
  controllers: [PropiedadesController],
  providers: [PropiedadesService],
  imports: [
    TypeOrmModule.forFeature([ Propiedade ])
  ]
})
export class PropiedadesModule {}
