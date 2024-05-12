import { Module } from '@nestjs/common';
import { PropiedadesModule } from 'src/propiedades/propiedades.module';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    PropiedadesModule
  ],
})
export class SeedModule {}
