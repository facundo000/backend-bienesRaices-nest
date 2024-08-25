import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PropiedadesService } from './propiedades.service';
import { CreatePropiedadeDto } from './dto/create-propiedade.dto';
import { UpdatePropiedadeDto } from './dto/update-propiedade.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { User } from 'src/auth/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('propiedades')
export class PropiedadesController {
  constructor(private readonly propiedadesService: PropiedadesService) {}

  @Post()
  @Auth(ValidRoles.USER)
  create(
    @Body() createPropiedadeDto: CreatePropiedadeDto,
    @GetUser() user: User,
  ) {
    return this.propiedadesService.create(createPropiedadeDto, user);
  }

  @Get()
  findAll() {
    return this.propiedadesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propiedadesService.findOnePlain(id);
  }

  @Patch(':id')
  @Auth(ValidRoles.USER)
  update(
    @Param('id') id: string, 
    @Body() updatePropiedadeDto: UpdatePropiedadeDto,
    @GetUser() user: User,
  ) {
    return this.propiedadesService.update(id, updatePropiedadeDto, user);
  }

  @Delete(':id')
  @Auth(ValidRoles.ADMIN)
  remove(@Param('id') id: string) {
    return this.propiedadesService.remove(id);
  }
}
