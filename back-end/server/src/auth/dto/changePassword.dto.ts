import { IsString, Matches, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class changePasswordDto {
    @ApiProperty()
    @IsString()
    oldPassword: string;

    @ApiProperty()
    @MinLength(6)
    @Matches(/^(?=.*[0-9]).*$/, { message: 'Password must contain at least one number' })
    newPassword: string;
}