import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PropiedadesService } from './propiedades.service';
import { PropiedadesController } from './propiedades.controller';
import { Propiedade, PropiedadImage } from './entities/index';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [PropiedadesController],
  providers: [PropiedadesService],
  imports: [
    TypeOrmModule.forFeature([ Propiedade, PropiedadImage ]),
    AuthModule
  ],
  exports: [
    PropiedadesService,
    TypeOrmModule,
  ]
})
export class PropiedadesModule {}
