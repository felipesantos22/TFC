import { IsNotEmpty } from 'class-validator';
import { Team } from 'src/entity/Team';

export class TeamDto {
  id: number;
  @IsNotEmpty({ message: 'All fields must be filled' })
  TeamName: string;

  constructor(team: Team) {
    this.id = team.id;
    this.TeamName = team.TeamName;
  }
}
