import { IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CategoryCreateDto {
  @ApiProperty()
  @IsString()
  category_name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  category_description?: string;
}
