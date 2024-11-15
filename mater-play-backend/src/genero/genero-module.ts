import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Genero } from "./genero-entity";
import { GeneroService } from "./genero-services";
import { GeneroController } from "./genero-controller";
import { Category, Movie } from "@mui/icons-material";


@Module({
  imports: [TypeOrmModule.forFeature([Movie, Genero, Category])],
  providers: [GeneroService],
  controllers: [GeneroController],
})
export class GeneroModule {}