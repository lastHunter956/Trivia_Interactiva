import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entity/category.entity';
import { Repository } from 'typeorm';
import { CategoryCreateDto } from './dto/category.dto';
import { generateId } from 'src/utils/generateId';
import { PaginatedData } from 'src/default/iPaginatedData';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly CategoryRepository: Repository<CategoryEntity>,
  ) {}

  async createCategory(
    createCategoryData: CategoryCreateDto,
  ): Promise<CategoryEntity> {
    try {
      const { category_name, category_description } = createCategoryData;
      const categoryInUse = await this.CategoryRepository.findOne({
        where: { category_name },
      });
      if (categoryInUse) {
        throw new BadRequestException(
          `The category of question is already un use`,
        );
      }
      return await this.CategoryRepository.save({
        category_id: await generateId(
          this.CategoryRepository,
          'category_id',
          'category',
        ),
        category_name,
        category_description,
      });
    } catch (error) {
      throw new BadRequestException(
        `An eror Ocurred during create the category`,
        error,
      );
    }
  }

  async getCategory(page: number, perPage: number): Promise<any> {
    try {
      const [users, total] = await this.CategoryRepository.findAndCount({
        take: perPage,
        skip: perPage * (page - 1),
        order: {
          isActive: 'DESC',
        },
      });
      const paginatedData: PaginatedData<CategoryEntity> = {
        currentPage: page,
        totalPages: Math.ceil(total / perPage),
        pageSize: perPage,
        data: users,
      };

      return { message: 'success', data: paginatedData };
    } catch (e) {
      return new BadRequestException(
        'The error in consults users',
        `${e.message}, ${e.status}`,
      );
    }
  }
}
