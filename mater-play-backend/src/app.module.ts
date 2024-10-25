
import { CategoryController } from './controllers/category-controller';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieController } from './controllers/movie-controller';
import { MovieServices } from './services/movie.services';
import { Movie } from './entities/movie-entity';
import { Category } from './entities/category-entily';
import { CategoryService } from './services/category.services';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      entities: [Category, Movie],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Category, Movie]),
  ],
  controllers: [CategoryController, MovieController],
  providers: [CategoryService, MovieServices],
})
export class AppModule {}
