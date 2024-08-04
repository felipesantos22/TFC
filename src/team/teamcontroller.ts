import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
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
    let teamUser = await this.teamService.findOne(teamDto.TeamName);
    if (teamUser) {
      throw new HttpException('Team already exists', HttpStatus.CONFLICT);
    }
    return this.teamService.store(teamDto);
  }

  @Get(':id')
  @HttpCode(200)
  async findById(@Param('id') id: number): Promise<TeamDto | undefined> {
    const findTeam = await this.teamService.findById(id);
    if (!findTeam) {
      throw new HttpException('Team not found', HttpStatus.CONFLICT);
    }
    return await this.teamService.findById(id);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<{ message: string }> {
    const team = this.teamService.deleteTeam(id);
    if (!team) {
      throw new HttpException('Team not found', HttpStatus.CONFLICT);
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
      throw new HttpException('Team not found', HttpStatus.CONFLICT);
    }
    this.teamService.uptadeTeam(id, teamDto);
    return { message: 'Team updated successfully' };
  }
}
