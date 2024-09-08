import { join } from 'path';
import { existsSync } from 'fs';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PropiedadImage } from 'src/propiedades/entities';
import { Repository } from 'typeorm';
@Injectable()
export class FilesService {
    constructor(
        @InjectRepository(PropiedadImage)
        private readonly imageRepository: Repository<PropiedadImage>,
    ) {}

    getStaticImage(imageName: string) {
        const path = join(__dirname, '../../static/propiedades', imageName);
        if( !existsSync(path) ) throw new BadRequestException(`No propiedad found with ${ imageName }`);

        return path;
    }
    //
    async savePropiedadImage(propiedadImage: PropiedadImage) {
        await this.imageRepository.save( propiedadImage );
    }
    //
    async getPropiedadesImages(): Promise<string[]> {
        const images = await this.imageRepository.find();
        
        return images.map( img => img.url );        
    }
}
