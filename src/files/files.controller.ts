import { Response } from 'express';
import { diskStorage } from 'multer';

import { BadRequestException, Body, Controller, Get, Param, Post, Req, Res, UploadedFile, UseInterceptors, Delete } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { FilesService } from './files.service';
import { fileFilter, fileNamer } from './helpers/index';
import { ValidRoles } from 'src/auth/interfaces';
import { Auth, GetUser } from 'src/auth/decorators';
import { Propiedade, PropiedadImage } from 'src/propiedades/entities';
import { User } from 'src/auth/entities/user.entity';
import { PropiedadesService } from '../propiedades/propiedades.service';
import { CreatePropiedadeDto } from 'src/propiedades/dto/create-propiedade.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRoleGuard } from 'src/auth/guards/user-role/user-role.guard';

@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService,
    private readonly PropiedadesService: PropiedadesService,

    @InjectRepository(Propiedade)  // Inyectar el repositorio de propiedades
    private readonly propiedadesRepository: Repository<Propiedade>,
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
  @ApiResponse({status: 201, description: 'url de la imagen'})
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

  @Delete('propiedad/:id')
  @Auth(ValidRoles.USER)
  // @Auth(ValidRoles.ADMIN)
  async deleteImage(
    @Param('id') id: string
  ) {
    return await this.filesService.deleteImageById(id);
  }

  @Get('propiedades/img')
  @Auth(ValidRoles.ADMIN)
  async deleteOrphanImages() {
    return await this.filesService.getPropiedadesImages();
  }
}
