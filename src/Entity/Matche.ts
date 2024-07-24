import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Team } from './Team';

@Entity()
export class Matche {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Team, (team) => team.homeMatches)
  HomeTeamId: number;

  @Column()
  HomeTeamGoal: number;

  @ManyToOne(() => Team, (team) => team.awayMatches)
  AwayTeamId: number;

  @Column()
  AwayTeamGoal: number;

  @Column()
  InProgress: boolean;
}
