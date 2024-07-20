import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/Dto/UserDto';
import { User } from 'src/Entity/User';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private readonly saltRounds = 10;
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async index(): Promise<UserDto[]> {
    return this.repository.find();
  }

  async store(userDto: UserDto): Promise<UserDto> {
    const hashedPassword = await bcrypt.hash(userDto.password, this.saltRounds);

    const user = new User();
    user.username = userDto.username;
    user.password = hashedPassword;

    return this.repository.save(user);
  }

  async findOne(username: string): Promise<UserDto | undefined> {
    return this.repository.findOne({ where: { username } });
  }
}
