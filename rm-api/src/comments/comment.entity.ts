import { Character } from "src/characters/character.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  body: string;

  @ManyToOne(() => Character, (character) => character.interactions)
  character: Character;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  createdAt: Date;
}
