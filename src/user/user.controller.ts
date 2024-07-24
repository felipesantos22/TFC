import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from 'src/dto/UserDto';

@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async index(): Promise<UserDto[]> {
    return await this.userService.index();
  }

  @Get('order')
  async OrderName(): Promise<UserDto[]> {
    return await this.userService.OrderName();
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async store(@Body() userDto: UserDto) {
    let findUser = await this.userService.findOne(userDto.username);
    if (findUser) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }
    return this.userService.store(userDto);
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<UserDto | undefined> {
    return await this.userService.findById(id);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<{ message: string }> {
    const user = this.userService.deleteUser(id);
    if (user) {
      throw new HttpException('User not exists', HttpStatus.CONFLICT);
    }
    return { message: 'User deleted successfully' };
  }

  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() userDto: UserDto): Promise<{ message: string }> {
    let findUser = await this.userService.findOne(userDto.username);
    if (findUser) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }
    this.userService.uptadeUser(id, userDto);
    return { message: 'User updated successfully' };
  }
}
