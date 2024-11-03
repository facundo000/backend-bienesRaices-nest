import { BadRequestException, Injectable, InternalServerErrorException, Logger, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DataSource, Repository } from 'typeorm';
import { isUUID } from 'class-validator';

import { CreatePropiedadeDto } from './dto/create-propiedade.dto';
import { UpdatePropiedadeDto } from './dto/update-propiedade.dto';

import { PropiedadImage, Propiedade } from './entities';
import { User } from '../auth/entities/user.entity';
import { ValidRoles } from 'src/auth/interfaces';
import { NotFoundError } from 'rxjs';

@Injectable()

export class PropiedadesService {
  private readonly  logger = new Logger('PropiedadesService')

  constructor(
    @InjectRepository(Propiedade)
    private readonly propiedadesRepository: Repository<Propiedade>,

    @InjectRepository(PropiedadImage)
    private readonly propiedadeImageRepository: Repository<PropiedadImage>,

    private readonly dataSoucrce: DataSource,

  ) { }
  async create(createPropiedadeDto: CreatePropiedadeDto, user: User) {
    try {
      const { imagen, ...propiedades } = createPropiedadeDto;

    let propiedadImage: PropiedadImage | undefined;
    if (imagen) {
      propiedadImage = this.propiedadeImageRepository.create({ url: imagen });
      await this.propiedadeImageRepository.save(propiedadImage);
    }

    const propiedade = this.propiedadesRepository.create({
      ...propiedades,
      imagen: propiedadImage, // Asignar la imagen creada
      user,
    });
      await this.propiedadesRepository.save(propiedade);
      
      return {...propiedade, imagen};
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  findAll() {
    const propiedades = this.propiedadesRepository.find({
      relations: {
        imagen: true,
      }
    });
    return propiedades;
  }

  async findOne(id: string) {
    let propiedade: Propiedade;

    if( isUUID(id) ){
      propiedade = await this.propiedadesRepository.findOneBy({ id : id });
    }
    
    else{
      const queryBuilder = this.propiedadesRepository.createQueryBuilder('prop');
      propiedade = await queryBuilder.where('UPPER(titulo) =:title or slug =:slug', { 
        slug: id.toLocaleLowerCase()
      })
      .leftJoinAndSelect('prop.imagen', 'imagen')
      .getOne();
    }
    if (!propiedade) {
      throw new BadRequestException(`Propiedaded con id ${id} no encontrada`);
    }

    return propiedade;
  }

  async findOnePlain(id: string) {
    const { imagen, ...rest } = await this.findOne(id);

    return {
      ...rest,
      imagen: imagen?.url
    }
  }

  async update(id: string, updatePropiedadeDto: UpdatePropiedadeDto, user: User) {
    const { imagen, ...toUpdate } = updatePropiedadeDto;    

    const propiedade = await this.propiedadesRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!propiedade) {
      throw new NotFoundException(`Propiedad con id ${id} no encontrada`);
    }

    if (!propiedade.user) {
      console.log(propiedade.user)
      throw new ForbiddenException('La propiedad no tiene un usuario asociado.');
  }

    if (propiedade.user.id !== user.id && !user.roles.includes(ValidRoles.ADMIN)) {
      throw new ForbiddenException('No tienes permisos para actualizar esta propiedad');
    }

  if (imagen) {
      // Actualizar la imagen si está presente
      const propiedadImage = this.propiedadeImageRepository.create({ url: imagen });
      propiedade.imagen = propiedadImage;
  }

  Object.assign(propiedade, toUpdate);

  await this.propiedadesRepository.save(propiedade);

  return this.findOnePlain(id);
}

  async remove(id: string) {
    const propiedade = await this.findOne(id);
    await this.propiedadesRepository.remove(propiedade);

    return {eliminado: true};
  }

  private handleDBExceptions(error: any) {
    if(error.code === '23505') 
      throw new BadRequestException(error.detail);

      this.logger.error(error)
      throw new InternalServerErrorException('error en la base de datos');
    
  }

  async deleteAllPropiedades() {
    const query = this.propiedadesRepository.createQueryBuilder('prop');

    try {
      return await query
      .delete()
      .where({})
      .execute();
    } catch(error) {
      this.handleDBExceptions(error);
    }
  }
  
}
