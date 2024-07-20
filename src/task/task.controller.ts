import { Body, Controller, Get, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDto } from 'src/Dto/TaskDto';

@Controller('api/v1/task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  index(): Promise<TaskDto[]> {
    return this.taskService.index();
  }

  @Post()
  store(@Body() taskDto: TaskDto) {
    return this.taskService.store(taskDto);
  }
  
}
