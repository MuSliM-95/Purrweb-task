import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { Observable } from "rxjs";


@Injectable()

export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const req: Request = context.switchToHttp().getRequest()
        const { role } = req.cookies

        
        if (!role || role !== 'admin') {
            throw new UnauthorizedException('У вас нет прав администратора.');
        }

        return true
        
    }
}