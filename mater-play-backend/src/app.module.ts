import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieController } from './controllers/movie-controller';
import { MovieServices } from './services/movie.services';
import { Movie } from './entities/movie-entity';

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
      entities: [Movie],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Movie]),
  ],
  controllers: [MovieController],
  providers: [MovieServices],
})
export class AppModule {}
