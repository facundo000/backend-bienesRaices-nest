import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SeedService } from './seed.service';
import { ValidRoles } from 'src/auth/interfaces/valid-roles';
import { AuthService } from 'src/auth/auth.service';
import { Auth } from 'src/auth/decorators';

@ApiTags('Seed')
@Controller('seed')
export class SeedController {
  constructor(
    private readonly seedService: SeedService,
  ) {}

  @Get()
  @ApiResponse({status: 201, description: 'Seed executed'})
  // @Auth(ValidRoles.ADMIN)
  executeSeed() {
    return this.seedService.executeSeed();
  }

}
