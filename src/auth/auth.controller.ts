import { Controller, Get, Post, Body, UseGuards, Req, SetMetadata } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { LoginUserDto, CreateUserDto } from './dto/index';
import { AuthService } from './auth.service';
import { User } from './entities/user.entity';
import { Auth, GetRawHeaders, GetUser } from './decorators';
import { IncomingHttpHeaders } from 'http';
import * as request from 'supertest';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { RoleProtected } from './decorators/role-protected.decorator';
import { ValidRoles } from './interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute(
    @Req() request: Express.Request,
    @GetUser() user: User,
    @GetUser('email') userEmail: string,

    @GetRawHeaders() rawHeaders: string[],    
  ) {

    return {
      ok: true,
      message: 'en privado',
      user,
      userEmail,
      rawHeaders,
    }
  }

  @Get('private1')
  @SetMetadata('roles', ['admin', 'super-user'])
  @UseGuards(AuthGuard(), UserRoleGuard)
  privateRoute2(
    @GetUser() user: User,
  ) {
    return {
      ok: true,
      user
    }
  }

  // @RoleProtected( ValidRoles.SUPERUSER, ValidRoles.ADMIN )
  // @UseGuards(AuthGuard(), UserRoleGuard)
  @Get('private2')
  @Auth( ValidRoles.ADMIN, ValidRoles.SUPERUSER )
  privateRoute3(
    @GetUser() user: User,
  ) {
    return {
      ok: true,
      user
    }
  }

}
