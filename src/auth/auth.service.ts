import { BadRequestException, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { CreateUserDto, LoginUserDto } from './dto/index';
import { User } from './entities/user.entity';

import { Repository } from 'typeorm';
import { JwtPayload } from './interfaces/jwt-payload.interface';



@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User) 
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  async create(createUserDto: CreateUserDto) {
    
    try{

      const { contrasenia, ...userData } = createUserDto;

      const user = this.userRepository.create(
        {
          ...userData,
          contrasenia: bcrypt.hashSync(contrasenia, 10),
        }
      );

      await this.userRepository.save(user);
      delete user.contrasenia;

      return {
        ...user,
        token: this.getJwtToken({ id: user.id })
      }
    }
    catch(error){
      this.handleDBErrors(error);
    }
  }
  
  async login( loginUserDto: LoginUserDto ) {
    
    const { email, contrasenia } = loginUserDto;
    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, contrasenia: true, id: true },
    });

    if(!user){
      throw new UnauthorizedException('Credenciales no validas - email');
    }

    if(!bcrypt.compareSync(contrasenia, user.contrasenia)){
      throw new UnauthorizedException('Credenciales no validas - contraseña');
    }
    
    return {
      user: user,
      token: this.getJwtToken({ id: user.id })
    }
  }

async checkAuthStatus( user: User ) {
  
  return {
    user: user,
    token: this.getJwtToken({ id: user.id }),
  }
}

  private getJwtToken( payload: JwtPayload ) {
    const token = this.jwtService.sign( payload );
    return token;
  }

  private handleDBErrors(error: any): never {

    if(error.code === '23505') 
      throw new BadRequestException(error.detail);

      console.log(error)
      throw new InternalServerErrorException('Por favor revisa los logs');
    
  }

}
