import { Module } from '@nestjs/common';
import { PropiedadesModule } from 'src/propiedades/propiedades.module';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    PropiedadesModule,
    AuthModule
  ],
})
export class SeedModule {}
