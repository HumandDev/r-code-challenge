import { Injectable, NotFoundException } from "@nestjs/common";
import { Character } from "./character.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { PaginatedResult } from "src/utils/types";
import { DEFAULT_PAGE, PER_PAGE } from "src/utils/constants";
import { InteractionsService } from "src/interactions/interactions.service";
import { InteractionType } from "src/interactions/interaction.entity";

@Injectable()
export class CharactersService {
  constructor(
    @InjectRepository(Character)
    private readonly charactersRepository: Repository<Character>,
    private readonly interactionsService: InteractionsService
  ) {}

  async getCharacters(query: any): Promise<PaginatedResult<Character[]>> {
    const page = query.page || DEFAULT_PAGE;
    const name = query.name || "";
    const [characters, count] = await this.charactersRepository.findAndCount({
      where: {
        name: ILike(`%${name}%`),
      },
      take: PER_PAGE,
      skip: PER_PAGE * (page - 1),
    });
    return {
      data: characters,
      meta: {
        page,
        total: Math.ceil(count / PER_PAGE),
      },
    };
  }

  async getCharacterById(id: number): Promise<Character> {
    return this.charactersRepository.findOne({
      where: {
        id,
      },
    });
  }

  async editCharacter(
    character: Partial<Character>,
    id: number
  ): Promise<Character> {
    const maybeCharacter = await this.findById(id);

    const updatedCharacter = {
      ...maybeCharacter,
      ...character,
    };

    this.interactionsService.createInteraction(
      maybeCharacter,
      InteractionType.UPDATE
    );

    await this.charactersRepository.update(id, updatedCharacter);
    return updatedCharacter;
  }

  async findById(id: number): Promise<Character> {
    try {
      return await this.charactersRepository.findOneOrFail({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new NotFoundException(`Character with id ${id} not found`);
    }
  }

  async deleteCharacter(id: number): Promise<any> {
    const character = await this.findById(id);

    const updatedCharacter = {
      ...character,
      deleted: true,
    };

    await this.charactersRepository.update(id, updatedCharacter);
    return updatedCharacter;
  }
}
