import { Body, Controller, Get, Post } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamDto } from 'src/dto/TeamDto';

@Controller('api/v1/task')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  index(): Promise<TeamDto[]> {
    return this.teamService.index();
  }

  @Post()
  store(@Body() teamDto: TeamDto) {
    return this.teamService.store(teamDto);
  }
  
}
