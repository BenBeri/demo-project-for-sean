import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {AuthJWTToken, UserSalt} from "../definitions";
import {UserRepository} from "../model/repositories/user.repository";
import {UserEntity} from "../model/entities/user.entity";
import {comparePasswordHash, generateSalt, hashPassword} from "../utils/hashing";
import {generateJwtUserToken} from "../utils/jwt.util";
import {RegisterRequestDto} from "../dtos/request/register.request.dto";
@Injectable()
export class AuthService {

    constructor(private readonly userRepository: UserRepository) {}

    public async authenticateUser(username: string, password: string): Promise<AuthJWTToken> {
        let user: UserEntity;

        // Check if user exists
        try {
            user = await this.userRepository.getUserByUsername(username);
        } catch (e) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        // Compare passwords by hashing input password and validating using the hash in found user record
        const passwordComparison: boolean = await comparePasswordHash(password, user.hash);
        if (!passwordComparison) {
            throw new HttpException('Incorrect credentials', HttpStatus.UNAUTHORIZED);
        }

        // Generate new JWT auth token
        return generateJwtUserToken(user);
    }

    public async createUser(userData: RegisterRequestDto): Promise<void> {
        const userExists = await this.userRepository.isUsernameOrEmailInUse(userData.username, userData.email);
        if (userExists) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }

        // Generate an unique salt
        const salt: UserSalt = await generateSalt();

        // Create password hash
        const passwordHash = await hashPassword(salt, userData.password);

        const entity: UserEntity = {
            username: userData.username,
            email: userData.email,
            hash: passwordHash,
            salt,
            role: userData.role
        }

        // Creates user record in the database
        await this.userRepository.createUser(entity);

    }
}
