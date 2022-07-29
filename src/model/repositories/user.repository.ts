import {EntityRepository, Repository} from "typeorm";
import {UserEntity} from "../entities/user.entity";
import {InsertResult} from "typeorm/query-builder/result/InsertResult";
import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class UserRepository {

    constructor(@InjectRepository(UserEntity) private readonly repo: Repository<UserEntity>) {}

    public async getUserByUsername(username: string): Promise<UserEntity> {
        return await this.repo.findOneOrFail({where: {username}});
    }

    /**
     * Checks if username OR email are in use, if one of them is in use, request fails
     * @param username  The username of the user
     * @param email     The email of the user
     */
    public async isUsernameOrEmailInUse(username: string, email: string) {
        const count = await this.repo.createQueryBuilder()
            .where('username = :username OR email = :email', {username, email})
            .getCount();
        return count > 0;
    }

    /**
     * Creates a new user entity record in the database
     * @param user  The user data
     */
    public async createUser(user: UserEntity) {
        await this.repo.insert(user);
    }
}
