import { BadRequestException, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { FilesService } from './files.service';
import { fileFilter, fileNamer } from './helpers/index';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService,
  ) {}

  @Get('propiedad/:imageName')
  findPropiedadImage(
    @Res() res: Response,
    @Param('imageName') imageName: string,
  ) {

    const path = this.filesService.getStaticImage(imageName);

    res.sendFile(path);
  }

  @Post('propiedad')
  @UseInterceptors( FileInterceptor('file', {
    fileFilter: fileFilter,
    storage: diskStorage({
      destination: './static/propiedades',
      filename: fileNamer
    })
  }) )
  uploadFileImage( 
    @UploadedFile() file: Express.Multer.File,
   ) {
    
    if(!file) {
      throw new BadRequestException('Make sure that the file is an image');
    }

    const secureUrl = `${ this.configService.get('HOST_API') }/files/propiedad/${ file.filename }`;

    return {
      secureUrl
    };
  }
}
