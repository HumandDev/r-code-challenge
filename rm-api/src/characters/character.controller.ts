import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { CharactersService } from "./character.service";
import { Character } from "./character.entity";
import { PaginatedResult } from "src/utils/types";
import { CommentsService } from "src/comments/comments.service";
import { Comment } from "../comments/comment.entity";
import { Interaction } from "src/interactions/interaction.entity";
import { InteractionsService } from "src/interactions/interactions.service";
import { CommentDTO } from "src/comments/comment.dto";

@Controller("character")
export class CharactersController {
  constructor(
    private readonly charactersService: CharactersService,
    private readonly commentsService: CommentsService,
    private readonly interactionsService: InteractionsService
  ) {}

  @Get("/")
  getCharacters(@Query() query: any): Promise<PaginatedResult<Character[]>> {
    return this.charactersService.getCharacters(query);
  }

  @Get("/:id")
  getCharacterById(@Param("id", ParseIntPipe) id: number): Promise<Character> {
    return this.charactersService.getCharacterById(id);
  }

  @Put("/:id")
  editCharacter(
    @Param("id", ParseIntPipe) id: number,
    @Body() character: Partial<Character>
  ) {
    return this.charactersService.editCharacter(character, id);
  }

  @Delete("/:id")
  deleteCharacter(@Param("id", ParseIntPipe) id: number) {
    return this.charactersService.deleteCharacter(id);
  }

  @Get("/:id/comments")
  getComments(@Param("id", ParseIntPipe) id: number): Promise<Comment[]> {
    return this.commentsService.getComments(id);
  }

  @Post("/:id/comments")
  createComment(
    @Param("id", ParseIntPipe) id: number,
    @Body() commentDTO: CommentDTO
  ): Promise<Comment> {
    return this.commentsService.createComment(id, commentDTO);
  }

  @Get("/:id/interactions")
  getInteractions(
    @Param("id", ParseIntPipe) id: number
  ): Promise<Interaction[]> {
    return this.interactionsService.getInteractions(id);
  }
}
