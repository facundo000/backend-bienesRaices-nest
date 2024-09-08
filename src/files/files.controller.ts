import { BadRequestException, Body, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { FilesService } from './files.service';
import { fileFilter, fileNamer } from './helpers/index';
import { ValidRoles } from 'src/auth/interfaces';
import { Auth, GetUser } from 'src/auth/decorators';
import { Propiedade, PropiedadImage } from 'src/propiedades/entities';
import { User } from 'src/auth/entities/user.entity';
import { PropiedadesService } from '../propiedades/propiedades.service';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService,
    private readonly PropiedadesService: PropiedadesService
  ) {}

  @Get('propiedad/:imageName')
  findPropiedadImage(
    @Res() res: Response,
    @Param('imageName') imageName: string,
  ) {

    const path = this.filesService.getStaticImage(imageName);

    res.sendFile(path);
  }

  @Get('propiedades/img')
  async findPropiedadesImages(): Promise<string[]> {
    return this.filesService.getPropiedadesImages();
  }


  @Post('propiedad')
  @Auth(ValidRoles.USER)
  @UseInterceptors( FileInterceptor('file', {
    fileFilter: fileFilter,
    storage: diskStorage({
      destination: './static/propiedades',
      filename: fileNamer
    })
  }) )

  async uploadFileImage( 
    @UploadedFile() file: Express.Multer.File,
   ) {
    
    if(!file) {
      throw new BadRequestException('Make sure that the file is an image');
    }

    const secureUrl = `${ this.configService.get('HOST_API') }/files/propiedad/${ file.filename }`;

    const propiedadImage = new PropiedadImage();
    propiedadImage.url = secureUrl;

    await this.filesService.savePropiedadImage(propiedadImage);

    return {
      secureUrl
    };
  }

}
