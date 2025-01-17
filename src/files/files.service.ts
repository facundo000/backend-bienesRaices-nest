import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { join } from 'path';
import { existsSync, writeFileSync, unlinkSync } from 'fs';
import { Propiedade, PropiedadImage } from 'src/propiedades/entities';
import { Repository } from 'typeorm';
@Injectable()
export class FilesService {
    constructor(
        @InjectRepository(PropiedadImage)
        private readonly imageRepository: Repository<PropiedadImage>,
    ) {}

    getStaticImage(imageName: string) {
        const path = join(__dirname, '../../static/propiedades', imageName);
        if( !existsSync(path) ) throw new BadRequestException(`No image found with ${ imageName }`);

        return path;
    }
    async savePropiedadImage(propiedadImage: PropiedadImage) {
        await this.imageRepository.save( propiedadImage );
    }

    async getPropiedadesImages(): Promise<string[]> {
        const images = await this.imageRepository.find();
        
        return images.map( img => img.url );        
    }


    async deleteAllImages() {
        const query = this.imageRepository.createQueryBuilder('img');
        try {
            return await query
            .delete()
            .where({})
            .execute();
          } catch(error) {
            (error);
          }
    }

    async deleteImageById(id: string) {
        try {
            const image = await this.imageRepository.findOne({
                where: { id }
            });

            if (!image) {
                throw new NotFoundException(`Image with id ${id} not found`);
            }

            // Obtener el nombre del archivo de la URL
            const imageName = image.url.split('/').pop();
            const path = join(__dirname, '../../static/propiedades', imageName);

            // Eliminar el archivo físico si existe
            if (existsSync(path)) {
                unlinkSync(path);
            }

            // Eliminar el registro de la base de datos
            await this.imageRepository.remove(image);

            return {
                message: `Image with id ${id} was deleted successfully`
            };

        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new BadRequestException(`Error deleting image: ${error.message}`);
        }
    }

}
