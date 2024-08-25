import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';

import { PropiedadesModule } from './propiedades/propiedades.module';
import { VendedoresModule } from './vendedores/vendedores.module';
import { FilesModule } from './files/files.module';
import { SeedModule } from './seed/seed.module';

import { join } from 'path';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PropiedadesModule, 
    VendedoresModule,
    SeedModule,

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

    ServeStaticModule.forRoot({ 
      rootPath: join(__dirname,'..','public'), 
    }),
    
    FilesModule,
    
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
