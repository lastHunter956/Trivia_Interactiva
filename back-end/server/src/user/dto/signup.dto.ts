import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Matches, MinLength } from 'class-validator';

export class SignupDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(6)
  @Matches(/^(?=.*[0-9]).*$/, {
    message: 'Password must contain at least one number',
  })
  password: string;

  @ApiProperty()
  type_id: string;
}
