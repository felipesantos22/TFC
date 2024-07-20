import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskDto } from 'src/Dto/TaskDto';
import { Task } from 'src/Entity/Task';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private repository: Repository<Task>,
  ) {}

  index(): Promise<TaskDto[]> {
    return this.repository.find();
  }

  store(taskDto: TaskDto): Promise<Task> {
    return this.repository.save(taskDto);
  }
}
