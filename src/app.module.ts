import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './Entity/Task';
import { UserModule } from './user/user.module';
import { User } from './Entity/User';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './src/data/database.sqlite',
      entities: [Task, User],
      synchronize: true,
      migrations: [],
    }),
    TaskModule,
    UserModule,
    AuthModule,
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
