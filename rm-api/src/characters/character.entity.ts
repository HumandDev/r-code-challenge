import { Interaction } from "src/interactions/interaction.entity";
import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";

export class Origin {
  name: string;
  url: string;
}

@Entity()
export class Character {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  status: string;

  @Column()
  species: string;

  @Column()
  type: string;

  @Column()
  gender: string;

  @Column({ type: "json" })
  origin: Origin;

  @Column({ type: "json" })
  location: Origin;

  @Column()
  image: string;

  @Column("simple-array")
  episode: string[];

  @Column()
  url: string;

  @Column()
  created: string;

  @Column({ default: false })
  deleted: boolean;

  @OneToMany(() => Interaction, (interaction) => interaction.character)
  interactions: Interaction[];
}
