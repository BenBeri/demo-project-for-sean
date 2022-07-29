import {IsString, Matches, MinLength, MaxLength, IsEmail, IsEnum} from 'class-validator';
import {Role} from "../../enums/role.enum";

export class RegisterRequestDto {

    @IsString()
    username: string;

    @IsEmail()
    email: string;

    @MinLength(8)
    @MaxLength(32)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'Weak password'})
    password: string;

    @IsEnum(Role)
    role: Role;
}
