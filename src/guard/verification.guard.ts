import { BadRequestException, CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";

@Injectable()

export class UserVerification implements CanActivate {
    constructor(private reflector: Reflector) {}
     canActivate(context: ExecutionContext): boolean   { 
      const req: Request = context.switchToHttp().getRequest()

      const { userId } = req.cookies
      const createdUserId = req.params.userId

      console.log(  createdUserId,  userId);
      

      if(userId != createdUserId) {
        throw new BadRequestException('У вас нет доступа к этим данным')
      }

      return true
  }
    
}