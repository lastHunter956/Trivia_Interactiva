import { BadRequestException, Injectable } from '@nestjs/common';
import { TypeCreateDto } from './dto/create-type.dto';
import { TypeUserEntity } from './entity/type-user.entity';
import { generateId } from 'src/utils/generateId';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginatedData } from 'src/default/iPaginatedData';

@Injectable()
export class TypeUserService {
  constructor(
    @InjectRepository(TypeUserEntity)
    private readonly typeUserRepository: Repository<TypeUserEntity>,
  ) {}

  async createType(createTypeData: TypeCreateDto): Promise<TypeUserEntity> {
    try {
      const { type_name, type_description } = createTypeData;

      const typeInUse = await this.typeUserRepository.findOne({
        where: { type_name },
      });
      if (typeInUse) {
        throw new BadRequestException(`The type of user is already in use`);
      }
      return await this.typeUserRepository.save({
        id_type: await generateId(
          this.typeUserRepository,
          'id_type',
          'type_user',
        ),
        type_name,
        type_description,
      });
    } catch (error) {
      throw new BadRequestException(
        `An error ocurred during Create the Type`,
        error.message,
      );
    }
  }

  async getTypeUser(page: number, perPage: number): Promise<any> {
    try {
      const [users, total] = await this.typeUserRepository.findAndCount({
        take: perPage,
        skip: perPage * (page - 1),
        order: {
          isActive: 'DESC',
        },
      });
      const paginatedData: PaginatedData<TypeUserEntity> = {
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
