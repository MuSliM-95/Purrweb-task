import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";


export class clearCookie implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        if(req.method === "DELETE" && req.path === "/users/delete") {
           res.clearCookie('refreshToken')
           res.clearCookie('userId')
           res.clearCookie('role')
        }
        
        next()
    }
}