import { Character } from "src/characters/character.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

export enum InteractionType {
  UPDATE = "Update",
  DELETE = "Delete",
}

@Entity()
export class Interaction {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    type: "enum",
    enum: InteractionType,
    default: InteractionType.UPDATE,
  })
  type: InteractionType;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  createdAt: Date;

  @ManyToOne(() => Character, (character) => character.interactions)
  character: Character;
}
