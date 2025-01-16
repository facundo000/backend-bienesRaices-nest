import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { PropiedadesModule } from 'src/propiedades/propiedades.module';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { PropiedadImage } from 'src/propiedades/entities';
import { FilesModule } from 'src/files/files.module';
@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    PropiedadesModule,
    AuthModule,
    FilesModule,
    TypeOrmModule.forFeature([User, PropiedadImage])
  ]
})
export class SeedModule {}
