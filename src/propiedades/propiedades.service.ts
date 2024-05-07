import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
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
    private readonly propiedadeImageRepository: Repository<PropiedadImage>,

    private readonly dataSoucrce: DataSource,

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
    // if (!propiedade) {
    //   throw new BadRequestException(`Propiedaded con id ${id} no encontrada`);
    // }
    else{
      const queryBuilder = this.propiedadesRepository.createQueryBuilder('prop');
      propiedade = await queryBuilder.where('UPPER(titulo) =:title or slug =:slug', { 
        slug: id.toLocaleLowerCase()
      })
      .leftJoinAndSelect('prop.imagen', 'imagen')
      .getOne();
    }

    return propiedade;
  }

  async findOnePlain(id: string) {
    const { imagen = [], ...rest } = await this.findOne(id);

    return {
      ...rest,
      imagen: imagen.map( img => img.url ),
    }
  }

  async update(id: string, updatePropiedadeDto: UpdatePropiedadeDto) {
    const { imagen, ...toUpdate } = updatePropiedadeDto;

    const propiedade = await this.propiedadesRepository.preload({ id: id, ...toUpdate });

    if(!propiedade) throw new BadRequestException(`Propiedad con id ${id} no encontrada`);
    // Create Query runner

    const queryRunner = this.dataSoucrce.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();


    try {
      if(imagen){
        await queryRunner.manager.delete(PropiedadImage, { propiedad: { id } });

        propiedade.imagen = imagen.map( img => this.propiedadeImageRepository.create({ url: img }) );
      }

      // await this.propiedadesRepository.save(propiedade);
      await queryRunner.manager.save( propiedade );

      await queryRunner.commitTransaction();
      await queryRunner.release();
      
      // return propiedade;
      return this.findOnePlain(id);

    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();

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
