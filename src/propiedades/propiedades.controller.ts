import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { PropiedadesService } from './propiedades.service';
import { CreatePropiedadeDto } from './dto/create-propiedade.dto';
import { UpdatePropiedadeDto } from './dto/update-propiedade.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { User } from 'src/auth/entities/user.entity';
import { Propiedade } from './entities';


@ApiTags('Propiedades')
@Controller('propiedades')
export class PropiedadesController {
  constructor(private readonly propiedadesService: PropiedadesService) {}

  @Post()
  @Auth(ValidRoles.USER)
  @ApiResponse({status: 201, description: 'Propiedad creada correctamente', type: Propiedade})
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 403, description: 'Forbiden'})
  create(
    @Body() createPropiedadeDto: CreatePropiedadeDto,
    @GetUser() user: User,
  ) {
    return this.propiedadesService.create(createPropiedadeDto, user);
  }

  @Get()
  @ApiResponse({status: 200, description: 'Propiedades encontradas', type: [Propiedade]})
  findAll() {
    return this.propiedadesService.findAll();
  }

  @Get(':id')
  @ApiResponse({status: 200, description: 'Propiedad encontrada', type: Propiedade})
  findOne(@Param('id') id: string) {
    return this.propiedadesService.findOnePlain(id);
  }

  @Patch(':id')
  @Auth(ValidRoles.USER)
  @ApiResponse({status: 200, description: 'Propiedad actualizada correctamente', type: Propiedade})
  @ApiResponse({status: 403, description: 'No tienes permisos para actualizar esta propiedad'})
  update(
    @Param('id') id: string, 
    @Body() updatePropiedadeDto: UpdatePropiedadeDto,
    @GetUser() user: User
  ) {
    return this.propiedadesService.update(id, updatePropiedadeDto, user);
  }

  @Delete(':id')
  @Auth(ValidRoles.USER)
  @ApiResponse({status: 200, description: '{eliminado: true}'})

  remove(@Param('id') id: string) {
    return this.propiedadesService.remove(id);
  }
}
