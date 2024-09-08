import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PropiedadImage } from 'src/propiedades/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { PropiedadesService } from 'src/propiedades/propiedades.service';
import { PropiedadesModule } from '../propiedades/propiedades.module';

@Module({
  controllers: [FilesController],
  providers: [FilesService, ConfigService, PropiedadesService],
  imports: [
    ConfigModule, 
    TypeOrmModule.forFeature([PropiedadImage]),
    AuthModule,
    PropiedadesModule
  ],
})
export class FilesModule {}
