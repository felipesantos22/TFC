import { IsNotEmpty } from 'class-validator';

export class TeamDto {
  id: number;
  @IsNotEmpty({ message: 'All fields must be filled' })
  TeamName: string;
}
