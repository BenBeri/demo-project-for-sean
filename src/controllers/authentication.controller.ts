import { Req } from "@nestjs/common";
import { Body } from "@nestjs/common";
import { Res } from "@nestjs/common";
import { Post } from "@nestjs/common";
import { Controller } from "@nestjs/common";
import {AuthenticationRequestDto} from "../dtos/request/authentication.request.dto";
import {AuthProvider} from "../providers/auth.provider";
import {RegisterRequestDto} from "../dtos/request/register.request.dto";
import {AUTH_COOKIE_KEY, AuthJWTToken} from "../definitions";
import {verifyJwtUserToken} from "../utils/jwt.util";

@Controller('authentication')
export class AuthenticationController {

    constructor(private readonly userProvider: AuthProvider) {
    }

    /**
     * Logins user to the system
     * @Response User data  sets token cookie
     */
    @Post('login')
    public async login(@Req() req, @Res() res, @Body() body: AuthenticationRequestDto) {
        const token: AuthJWTToken = await this.userProvider.createSessionTokenForCredentials(body.username, body.password);
        res.cookie(AUTH_COOKIE_KEY, token, {
            httpOnly: true,
        });

        const userData = verifyJwtUserToken(token);
        return res.status(200).json(userData);
    }

    /**
     * Creates a new user
     * @Response void   sets token cookie
     */
    @Post('register')
    public async register(@Req() req, @Res() res, @Body() body: RegisterRequestDto) {
        const token: AuthJWTToken = await this.userProvider.createUser(body);
        res.cookie(AUTH_COOKIE_KEY, token, {
            httpOnly: true,
        });
        return res.status(200).send();
    }
}
