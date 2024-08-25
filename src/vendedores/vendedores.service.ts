import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateVendedoreDto } from './dto/create-vendedore.dto';
import { Vendedore } from './entities/vendedore.entity';
import { isUUID } from 'class-validator';
import { PropiedadesService } from 'src/propiedades/propiedades.service';

@Injectable()
export class VendedoresService {

  private readonly logger = new Logger('VendedoresService')
  constructor(
  @InjectRepository(Vendedore)
  private readonly vendedorRepository: Repository<Vendedore>,
  private readonly propiedadService: PropiedadesService
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
  // async create(createVendedoreDto: CreateVendedoreDto) {
  //   const vendedor = this.vendedorRepository.create(createVendedoreDto);

  //   if (createVendedoreDto.propiedadId) {
  //       const propiedad = await this.propiedadService.findOne(createVendedoreDto.propiedadId);
  //       if (propiedad) {
  //           vendedor.propiedades = [propiedad];
  //       } else {
  //           throw new NotFoundException('Propiedad no encontrada');
  //       }
  //   }

    // Guardar el nuevo vendedor en la base de datos
//     const nuevoVendedor = await this.vendedorRepository.save(vendedor);
//     return nuevoVendedor;
// }

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
