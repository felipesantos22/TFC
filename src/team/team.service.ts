import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamDto } from 'src/dto/TeamDto';
import { Team } from 'src/entity/Team';
import { Repository } from 'typeorm';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private repository: Repository<Team>,
  ) {}

  index(): Promise<TeamDto[]> {
    return this.repository.find();
  }

  store(teamDto: TeamDto): Promise<Team> {
    return this.repository.save(teamDto);
  }
}
