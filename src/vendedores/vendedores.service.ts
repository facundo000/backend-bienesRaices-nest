import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateVendedoreDto } from './dto/create-vendedore.dto';
import { UpdateVendedoreDto } from './dto/update-vendedore.dto';
import { Vendedore } from './entities/vendedore.entity';
import { isUUID } from 'class-validator';

@Injectable()
export class VendedoresService {

  private readonly logger = new Logger('VendedoresService')
  constructor(
  @InjectRepository(Vendedore)
  private readonly vendedorRepository: Repository<Vendedore>
  ) {}
  async create(createVendedoreDto: CreateVendedoreDto) {
    
    try {
      
      const vendedor = this.vendedorRepository.create(createVendedoreDto);
      await this.vendedorRepository.save(vendedor);

      return vendedor;
      
    } catch(error) {
      this.handleDBExceptions(error);
    }
  }

  findAll() {
    const vendedores = this.vendedorRepository.find();
    return vendedores;
  }

  async findOne(id: string) {

    let vendedor: Vendedore;

    if( isUUID(id) ){
      vendedor = await this.vendedorRepository.findOneBy({ id : id });
    // } else {
      
    //   const queryBuilder = this.vendedorRepository.createQueryBuilder('vendedores');
    //   const idLower = id.toLocaleLowerCase().trim();

      // vendedor = await queryBuilder
      // .where(' UPPER(nombre) = :nombre or apellido = :apellido ', {
      //   nombre: idLower,
      //   apellido: idLower
      // })
      // .getOne();
    }

    if(!vendedor)
      throw new BadRequestException(`Vendedor con id ${id} no encontrado`);
    

    return vendedor;
  }

  async remove(id: string) {
    const vendedor = await this.findOne(id);
    await this.vendedorRepository.remove(vendedor);

    return {eliminado: true};
  }

  private handleDBExceptions(error: any) {
    if(error.code === '23505') 
      throw new BadRequestException(error.detail);

      this.logger.error(error)
      throw new InternalServerErrorException('error en la base de datos');
    
  }

}
