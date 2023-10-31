import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
    canActivate(context: ExecutionContext): boolean {
        // get the roles required
        const roles = this.reflector.getAllAndOverride<string[]>('ROLES_KEY', [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!roles) {
            return false;
        }
        const user = context.switchToHttp().getRequest().username;
        if (!user) {
            throw new UnauthorizedException('User is not authenticated');
        }
        return this.validateRoles(roles, user.role);

    }

    validateRoles(roles: string[], userRoles: string[]) {
        console.log(userRoles);
        return roles.some((role) => userRoles.includes(role));
    }
}
