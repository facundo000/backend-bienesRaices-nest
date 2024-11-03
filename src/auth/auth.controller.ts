import { Controller, Get, Post, Body, UseGuards, Req, SetMetadata } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { Auth, GetRawHeaders, GetUser } from './decorators';
import { LoginUserDto, CreateUserDto } from './dto/index';
import { AuthService } from './auth.service';
import { User } from './entities/user.entity';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { ValidRoles } from './interfaces';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiResponse({status: 201, description: 'json con los datos del usuario creado', type: User})
  @ApiResponse({status: 400, description: 'Bad Request'})
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  @ApiResponse({status: 201, description: 'json con id, email, contraseña cifrada y token', type: User})
  @ApiResponse({status: 400, description: 'Bad Request'})
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('check-status')
  @UseGuards(AuthGuard() )
  // @Auth() 
  checkAuthStatus(
    @GetUser() user: User
    
  ){
    return this.authService.checkAuthStatus( user )
  }

  // @Get('private')
  // @UseGuards(AuthGuard())
  // testingPrivateRoute(
  //   @Req() request: Express.Request,
  //   @GetUser() user: User,
  //   @GetUser('email') userEmail: string,

  //   @GetRawHeaders() rawHeaders: string[],    
  // ) {

  //   return {
  //     ok: true,
  //     message: 'en privado',
  //     user,
  //     userEmail,
  //     rawHeaders,
  //   }
  // }

  // @Get('private1')
  // @SetMetadata('roles', ['admin', 'super-user'])
  // @UseGuards(AuthGuard(), UserRoleGuard)
  // privateRoute2(
  //   @GetUser() user: User,
  // ) {
  //   return {
  //     ok: true,
  //     user
  //   }
  // }

  // // @RoleProtected( ValidRoles.SUPERUSER, ValidRoles.ADMIN )
  // // @UseGuards(AuthGuard(), UserRoleGuard)
  // @Get('private2')
  // @Auth( ValidRoles.ADMIN, ValidRoles.SUPERUSER )
  // privateRoute3(
  //   @GetUser() user: User,
  // ) {
  //   return {
  //     ok: true,
  //     user
  //   }
  // }

}
