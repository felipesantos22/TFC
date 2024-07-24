import { Module } from '@nestjs/common';
import { TeamModule } from './team/team.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entity/Team';
import { UserModule } from './user/user.module';
import { User } from './entity/User';
import { AuthModule } from './auth/auth.module';
import { MatcheController } from './matche/matche.controller';
import { MatcheService } from './matche/matche.service';
import { MatcheModule } from './matche/matche.module';
import { Matche } from './entity/Matche';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './src/data/database.sqlite',
      entities: [Team, User, Matche],
      synchronize: true,
      migrations: [],
    }),
    TeamModule,
    UserModule,
    AuthModule,
    MatcheModule,
  ],
  providers: [MatcheService],
  controllers: [MatcheController],
})
export class AppModule {}
