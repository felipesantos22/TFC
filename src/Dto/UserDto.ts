import { IsNotEmpty } from 'class-validator';

export class UserDto {
  id: number;
  @IsNotEmpty({ message: 'All fields must be filled' })
  username: string;
  @IsNotEmpty({ message: 'All fields must be filled' })
  password: string;
}
