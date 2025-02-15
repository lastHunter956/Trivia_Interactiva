import { Controller, Body, Post, Get, Query } from '@nestjs/common';
import { TypeUserService } from './type-user.service';
import { ApiTags } from '@nestjs/swagger';
import { TypeCreateDto } from './dto/create-type.dto';
import { TypeUserEntity } from './entity/type-user.entity';

@ApiTags('type-user')
@Controller('type-user')
export class TypeUserController {
  constructor(private readonly typeUserService: TypeUserService) {}

  @Get('/Type-users')
  async getTypeUsers(
    @Query('page') page: number,
    @Query('perPage') perPage: number,
  ) {
    return await this.typeUserService.getTypeUser(page, perPage);
  }
  @Post('/create')
  async createController(
    @Body() CreateType: TypeCreateDto,
  ): Promise<TypeUserEntity> {
    return await this.typeUserService.createType(CreateType);
  }
}
