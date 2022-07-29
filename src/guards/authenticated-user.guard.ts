import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {AUTH_COOKIE_KEY} from "../definitions";
import {verifyJwtUserToken} from "../utils/jwt.util";

@Injectable()
export class AuthenticatedUserGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const authToken = req.cookies[AUTH_COOKIE_KEY];
        const data = verifyJwtUserToken(authToken);
        if (!data) {
            return false;
        }

        req.user = data;
        return true;
    }

}
