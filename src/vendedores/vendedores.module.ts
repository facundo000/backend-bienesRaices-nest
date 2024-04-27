import { Module } from '@nestjs/common';
import { VendedoresService } from './vendedores.service';
import { VendedoresController } from './vendedores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vendedore } from './entities/vendedore.entity';
import { Propiedade } from 'src/propiedades/entities';

@Module({
  controllers: [VendedoresController],
  providers: [VendedoresService],
  imports: [
    TypeOrmModule.forFeature([ Vendedore, Propiedade ])
  ]
})
export class VendedoresModule {}
