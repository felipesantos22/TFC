import { IsNotEmpty } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  @IsNotEmpty({"message": "All fields must be filled"})
  username: string;

  @Column({ length: 20 })
  @IsNotEmpty({"message": "All fields must be filled"})
  password: string;
}
