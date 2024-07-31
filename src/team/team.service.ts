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

  async index(): Promise<TeamDto[]> {
    return await this.repository.find();
  }

  async store(teamDto: TeamDto): Promise<Team> {
    return await this.repository.save(teamDto);
  }

  async findOne(TeamName: string): Promise<TeamDto | undefined> {
    return await this.repository.findOne({ where: { TeamName } });
  }

  async findById(id: number): Promise<TeamDto | undefined> {
    return await this.repository.findOne({ where: { id } });
  }

  async deleteTeam(id: number): Promise<void> {
    const team = await this.repository.findOne({ where: { id } });
    await this.repository.delete(team);
  }

  async uptadeTeam(id: number, teamDto: TeamDto): Promise<void> {
    const team = await this.repository.findOne({ where: { id } });
    await this.repository.update(team, teamDto);
  }
}
