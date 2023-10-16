import {createParamDecorator, ExecutionContext} from "@nestjs/common";
import * as jwt from "jsonwebtoken";

export const AuthUser = createParamDecorator((data: any, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  if(!request.user){
    return !!data ? request.user[data] : request.user;
  }

  const token = request.headers.authorization ? (request.headers.authorization as string).split(' ') : null;
  if(token && token[1]){
    const decoded: any = jwt.verify(token[1], process.env.APP_SECRET);
    request.user = decoded;
    return !!data ? request.user[data] : request.user;
  }
})