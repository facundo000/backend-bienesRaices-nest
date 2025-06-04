import { CanActivate, ExecutionContext, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Propiedade } from '../entities/propiedade.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ValidRoles } from 'src/auth/interfaces';

@Injectable()
export class PropertyOwnerGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @InjectRepository(Propiedade)
    private readonly propiedadesRepository: Repository<Propiedade>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const propertyId = request.params.id;

    if (user.roles && user.roles.includes(ValidRoles.ADMIN)) {
      return true;
    }

    // Verificar si la propiedad existe y pertenece al usuario
    const propiedad = await this.propiedadesRepository.findOne({
      where: { id: propertyId },
      relations: ['user'],
    });

    if (!propiedad) {
      throw new NotFoundException(`Propiedad con id ${propertyId} no encontrada`);
    }

    if (!propiedad.user) {
      throw new ForbiddenException('La propiedad no tiene un usuario asociado');
    }

    // Verificar si el usuario es el propietario
    if (propiedad.user.id !== user.id) {
      throw new ForbiddenException('No tienes permisos para realizar esta acción en esta propiedad');
    }

    return true;
  }
}
