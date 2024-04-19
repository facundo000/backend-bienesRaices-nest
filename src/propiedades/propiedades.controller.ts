import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PropiedadesService } from './propiedades.service';
import { CreatePropiedadeDto } from './dto/create-propiedade.dto';
import { UpdatePropiedadeDto } from './dto/update-propiedade.dto';

@Controller('propiedades')
export class PropiedadesController {
  constructor(private readonly propiedadesService: PropiedadesService) {}

  @Post()
  create(@Body() createPropiedadeDto: CreatePropiedadeDto) {
    return this.propiedadesService.create(createPropiedadeDto);
  }

  @Get()
  findAll() {
    return this.propiedadesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propiedadesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePropiedadeDto: UpdatePropiedadeDto) {
    return this.propiedadesService.update(+id, updatePropiedadeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propiedadesService.remove(+id);
  }
}
