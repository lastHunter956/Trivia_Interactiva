import { Controller, Post, Body, UseGuards, Get, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { CategoryCreateDto } from './dto/category.dto';

@ApiTags('category-question')
@UseGuards(AuthGuard) // Verifica que el usuario esté autenticado
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/getCategory')
  async getCategory(
    @Query('page') page: number,
    @Query('perPage') perPage: number,
  ) {
    return await this.categoryService.getCategory(page, perPage);
  }
  @Post('create')
  async createCategory(@Body() createCategoryDto: CategoryCreateDto) {
    return this.categoryService.createCategory(createCategoryDto);
  }
}
