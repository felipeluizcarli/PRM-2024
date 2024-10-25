import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseIntPipe, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { Movie } from "src/entities/movie-entity";
import { MovieServices } from "src/services/movie.services";

@Controller('movies')
export class MovieController {

    constructor(private service: MovieServices ) {}
    
    @Get()
    findAll(): Promise<Movie[]> {
        return this.service.findAll();
    }

    @Get(':id')
    async findById(@Param('id', new ParseUUIDPipe) id: string): Promise<Movie> {
            
        const found = await this.service.findById(id);

        if(!found){
            throw new HttpException("Movie not found", HttpStatus.NOT_FOUND)
        }
        return found;    
    }

    @Post()
    create (@Body() movie: Movie): Promise<Movie> {
    return this.service.save(movie);
  }
  @Put()
  async update(@Param('id', ParseUUIDPipe) id: string, movie: Movie): Promise<Movie> {
    const found = await this.service.findById(id);

    if (!found) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    movie.id = found.id;

    return this.service.save(movie);
  }
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param(':id', ParseUUIDPipe) id: string):  Promise<void>{
    const found = await this.service.findById(id);

    if(!found){
        throw new HttpException("Category not found", HttpStatus.NOT_FOUND)
    }

    return this.service.remove(id);
}
}