// import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';
import { CreatePropiedadeDto } from './create-propiedade.dto';

export class UpdatePropiedadeDto extends PartialType(CreatePropiedadeDto) {}
