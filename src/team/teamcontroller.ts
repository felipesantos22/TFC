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
import { TeamService } from './team.service';
import { TeamDto } from 'src/dto/TeamDto';

@Controller('api/v1/team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  index(): Promise<TeamDto[]> {
    return this.teamService.index();
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async store(@Body() teamDto: TeamDto) {
    let findUser = await this.teamService.findOne(teamDto.TeamName);
    if (findUser) {
      throw new HttpException('Team already exists', HttpStatus.CONFLICT);
    }
    return this.teamService.store(teamDto);
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<TeamDto | undefined> {
    return await this.teamService.findById(id);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<{ message: string }> {
    const user = this.teamService.deleteTeam(id);
    if (user) {
      throw new HttpException('Team not exists', HttpStatus.CONFLICT);
    }
    return { message: 'Team deleted successfully' };
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() teamDto: TeamDto,
  ): Promise<{ message: string }> {
    let findTeam = await this.teamService.findOne(teamDto.TeamName);
    if (findTeam) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }
    this.teamService.uptadeTeam(id, teamDto);
    return { message: 'Team updated successfully' };
  }
}
