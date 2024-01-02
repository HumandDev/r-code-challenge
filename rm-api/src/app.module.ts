import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InteractionsModule } from "./interactions/interactions.module";
import { CharactersModule } from "./characters/characters.module";
import { ConfigModule } from "@nestjs/config";
import { CommentsModule } from "./comments/comments.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    CharactersModule,
    InteractionsModule,
    CommentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
