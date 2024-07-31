import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/dto/UserDto';
import { User } from 'src/entity/User';
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
    return await this.repository.find();
  }

  async OrderName(): Promise<UserDto[]> {
    const users = await this.repository.find({
      order: {
        username: 'ASC',
      },
    });
    return users;
  }

  async store(userDto: UserDto): Promise<UserDto> {
    const hashedPassword = await bcrypt.hash(userDto.password, this.saltRounds);

    const user = new User();
    user.username = userDto.username;
    user.password = hashedPassword;

    return this.repository.save(user);
  }

  async findById(id: number): Promise<UserDto | undefined> {
    return await this.repository.findOne({ where: { id } });
  }

  async findOne(username: string): Promise<UserDto | undefined> {
    return await this.repository.findOne({ where: { username } });
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.repository.findOne({ where: { id } });
    await this.repository.delete(user);
  }

  async uptadeUser(id: number, userDto: UserDto): Promise<void> {
    const user = await this.repository.findOne({ where: { id } });
    await this.repository.update(user, userDto);
  }
}
