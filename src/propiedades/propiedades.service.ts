import { Injectable } from '@nestjs/common';
import { CreatePropiedadeDto } from './dto/create-propiedade.dto';
import { UpdatePropiedadeDto } from './dto/update-propiedade.dto';

@Injectable()
export class PropiedadesService {
  create(createPropiedadeDto: CreatePropiedadeDto) {
    return 'This action adds a new propiedade';
  }

  findAll() {
    return `This action returns all propiedades`;
  }

  findOne(id: number) {
    return `This action returns a #${id} propiedade`;
  }

  update(id: number, updatePropiedadeDto: UpdatePropiedadeDto) {
    return `This action updates a #${id} propiedade`;
  }

  remove(id: number) {
    return `This action removes a #${id} propiedade`;
  }
}
