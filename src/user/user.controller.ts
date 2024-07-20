import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from 'src/Dto/UserDto';

@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  index(): Promise<UserDto[]> {
    return this.userService.index();
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  store(@Body() userDto: UserDto) {
    return this.userService.store(userDto);
  }
}
