import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Interaction, InteractionType } from "./interaction.entity";
import { Character } from "src/characters/character.entity";

@Injectable()
export class InteractionsService {
  constructor(
    @InjectRepository(Interaction)
    private readonly interactionsRepository: Repository<Interaction>
  ) {}

  async createInteraction(character: Character, type: InteractionType) {
    const interaction = this.interactionsRepository.create({
      character,
      type: type,
    });
    return await this.interactionsRepository.save(interaction);
  }

  async getInteractions(characterId: string): Promise<Interaction[]> {
    const interactions = await this.interactionsRepository
      .createQueryBuilder("interaction")
      .innerJoinAndSelect("interaction.character", "character")
      .where("character.id = :characterId", { characterId })
      .getMany();
    return interactions;
  }
}
