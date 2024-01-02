import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommentsService } from "./comments.service";
import { Comment } from "./comment.entity";
import { CharactersModule } from "src/characters/characters.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
    forwardRef(() => CharactersModule),
  ],
  providers: [CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {}
