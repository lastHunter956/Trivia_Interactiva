import { IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TypeCreateDto {
  @ApiProperty()
  @IsString()
  type_name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  type_description?: string;
}
