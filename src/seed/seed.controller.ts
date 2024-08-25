import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';
import { ValidRoles } from 'src/auth/interfaces/valid-roles';
import { AuthService } from 'src/auth/auth.service';
import { Auth } from 'src/auth/decorators';

@Controller('seed')
export class SeedController {
  constructor(
    private readonly seedService: SeedService,
  ) {}

  @Get()
  // @Auth(ValidRoles.ADMIN)
  executeSeed() {
    return this.seedService.executeSeed();
  }

}
