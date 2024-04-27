import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isUUID } from 'class-validator';
import { CreatePropiedadeDto } from './dto/create-propiedade.dto';
import { UpdatePropiedadeDto } from './dto/update-propiedade.dto';
import { PropiedadImage, Propiedade } from './entities';

@Injectable()

export class PropiedadesService {
  private readonly  logger = new Logger('PropiedadesService')

  constructor(
    @InjectRepository(Propiedade)
    private readonly propiedadesRepository: Repository<Propiedade>,

    @InjectRepository(PropiedadImage)
    private readonly propiedadeImageRepository: Repository<PropiedadImage>
  ) { }
  async create(createPropiedadeDto: CreatePropiedadeDto) {
    try {
      const { imagen = [], ...propiedades } = createPropiedadeDto;

      const propiedade = this.propiedadesRepository.create({
        ...createPropiedadeDto,
        imagen: imagen.map( img => this.propiedadeImageRepository.create({ url: img }) )
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
        imagen: true
      }
    });
    return propiedades;
  }

  async findOne(id: string) {
    let propiedade: Propiedade;

    if( isUUID(id) ){
      propiedade = await this.propiedadesRepository.findOneBy({ id : id });
    }
    if (!propiedade) {
      throw new BadRequestException(`Propiedaded con id ${id} no encontrada`);
    }

    return propiedade;
  }

  async update(id: string, updatePropiedadeDto: UpdatePropiedadeDto) {
    const propiedade = await this.propiedadesRepository.preload({
      id: id,
      ...updatePropiedadeDto,
      imagen: []
    });
    if(!propiedade) throw new BadRequestException(`Propiedad con id ${id} no encontrada`);
    
    try {
      await this.propiedadesRepository.save(propiedade);
      
      return propiedade;
    } catch (error) {
      this.handleDBExceptions(error);
    }
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
}
