import { Module } from "@nestjs/common";
import { CharactersController } from "./character.controller";
import { CharactersService } from "./character.service";
import { Character } from "./character.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InteractionsModule } from "src/interactions/interactions.module";
import { CommentsModule } from "src/comments/comments.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Character]),
    InteractionsModule,
    CommentsModule,
  ],
  controllers: [CharactersController],
  providers: [CharactersService],
  exports: [CharactersService],
})
export class CharactersModule {}
