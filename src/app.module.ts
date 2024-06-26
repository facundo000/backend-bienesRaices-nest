import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PropiedadesModule } from './propiedades/propiedades.module';
import { VendedoresModule } from './vendedores/vendedores.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    PropiedadesModule, 
    VendedoresModule, 
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
