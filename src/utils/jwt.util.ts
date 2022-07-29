import {UserEntity} from "../model/entities/user.entity";
import {AuthJWTToken} from "../definitions";

const jwt = require('jsonwebtoken');

export const generateJwtUserToken = (user: UserEntity): Promise<AuthJWTToken> => {
    return jwt.sign({
        id: user.id,
        username: user.username,
        role: user.role,
        time: new Date(),
    }, process.env.JWT_SECRET);
}

export const verifyJwtUserToken = (token: AuthJWTToken): any => {
    return jwt.verify(token, process.env.JWT_SECRET);
}
