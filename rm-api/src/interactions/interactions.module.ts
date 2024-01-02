import { Module } from "@nestjs/common";
import { InteractionsService } from "./interactions.service";
import { Interaction } from "./interaction.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Interaction])],
  providers: [InteractionsService],
  exports: [InteractionsService],
})
export class InteractionsModule {}
