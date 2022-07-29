import {Injectable} from "@nestjs/common";
import {AuthService} from "../services/auth.service";
import {AuthJWTToken} from "../definitions";
import {RegisterRequestDto} from "../dtos/request/register.request.dto";

@Injectable()
export class AuthProvider {

    constructor(private readonly authService: AuthService) {}

    /**
     * Creates a session token for given user credentials
     * @param username  Username of the user
     * @param password  Password of the user
     */
    public async createSessionTokenForCredentials(username: string, password: string): Promise<AuthJWTToken> {
        return await this.authService.authenticateUser(username, password);
    }

    /**
     * Creates a new user
     * @param createData    The user data
     */
    public async createUser(createData: RegisterRequestDto): Promise<AuthJWTToken> {
        await this.authService.createUser(createData);
        return await this.authService.authenticateUser(createData.username, createData.password);
    }
}
