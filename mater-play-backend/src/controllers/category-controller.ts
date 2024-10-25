import { Http } from "@mui/icons-material";
import { Body, Controller, ParseIntPipe, Get, HttpException, HttpStatus, Param, ParseUUIDPipe, Patch, Post, Put, Delete, HttpCode } from "@nestjs/common";
import { Category } from "src/entities/category-entily";
import { CategoryService } from "src/services/category.services";

@Controller('categories')
export class CategoryController {
  constructor(private service: CategoryService) { }

  @Get()
  findAll(): Promise<Category[]> {
    return this.service.findALl();
  }

  @Get(':id')
  async findById(
    @Param('id', new ParseUUIDPipe()) id: number,
  ): Promise<Category> {

    const found = await this.service.findById(id);

    if (!found) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }
    return found;
  }
  @Post()
  create(@Body() category: Category): Promise<Category> {
    return this.service.save(category);
  }
  @Put()
  async update(@Param('id', ParseIntPipe) id: number, category: Category): Promise<Category> {
    const found = await this.service.findById(id);

    if (!found) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    category.id = found.id;

    return this.service.save(category);
  }
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param(':id', ParseIntPipe) id: number):  Promise<void>{
    const found = await this.service.findById(id);

    if(!found){
        throw new HttpException("Category not found", HttpStatus.NOT_FOUND)
    }

    return this.service.remove(id);
}
}
