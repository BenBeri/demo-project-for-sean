import {IsString, Matches, MinLength, MaxLength} from 'class-validator';

export class AuthenticationRequestDto {
    @IsString()
    username: string;

    @IsString()
    password: string;

}
