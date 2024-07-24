import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Matche } from './Matche';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  TeamName: string;

  @OneToMany(() => Matche, (match) => match.HomeTeamId)
  homeMatches: Matche[];

  @OneToMany(() => Matche, (match) => match.AwayTeamId)
  awayMatches: Matche[];
}
