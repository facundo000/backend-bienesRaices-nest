import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateVendedoreDto } from './dto/create-vendedore.dto';
import { UpdateVendedoreDto } from './dto/update-vendedore.dto';
import { Vendedore } from './entities/vendedore.entity';

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

  findOne(id: number) {
    return `This action returns a #${id} vendedore`;
  }

  update(id: number, updateVendedoreDto: UpdateVendedoreDto) {
    return `This action updates a #${id} vendedore`;
  }

  remove(id: number) {
    return `This action removes a #${id} vendedore`;
  }

  private handleDBExceptions(error: any) {
    if(error.code === '23505') 
      throw new BadRequestException(error.detail);

      this.logger.error(error)
      throw new InternalServerErrorException('error en la base de datos');
    
  }

}
