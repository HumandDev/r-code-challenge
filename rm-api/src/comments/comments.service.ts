import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Comment } from "./comment.entity";
import { CharactersService } from "src/characters/character.service";
import { CommentDTO } from "./comment.dto";

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
    private readonly charactersService: CharactersService
  ) {}

  async createComment(characterId: number, commentDTO: CommentDTO) {
    const character = await this.charactersService.findById(characterId);
    const comment = this.commentsRepository.create({
      character,
      body: commentDTO.body,
    });
    return await this.commentsRepository.save(comment);
  }

  async getComments(characterId: number): Promise<Comment[]> {
    return await this.commentsRepository
      .createQueryBuilder("comment")
      .innerJoinAndSelect("comment.character", "character")
      .where("character.id = :characterId", { characterId })
      .getMany();
  }
}
