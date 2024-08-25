import { join } from 'path';
import { existsSync } from 'fs';
import { BadRequestException, Injectable } from '@nestjs/common';
@Injectable()
export class FilesService {

    getStaticImage(imageName: string) {
        const path = join(__dirname, '../../static/propiedades', imageName);
        if( !existsSync(path) ) throw new BadRequestException(`No propiedad found with ${ imageName }`);

        return path;
    }
}
