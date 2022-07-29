import {UserSalt} from "../definitions";
const bcrypt = require('bcrypt');

export const hashPassword = async (salt: UserSalt, password: string) => {
    return await bcrypt.hash(password, salt);
}

export const generateSalt = async () => {
    return await bcrypt.genSalt(16);
}

export const comparePasswordHash = async (password: string, passwordHash: string): Promise<boolean> => {
    return await bcrypt.compare(password, passwordHash);
}
