import { Injectable, CanActivate, ExecutionContext, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';
import { GraphQLError } from 'graphql';
@Injectable()
export class StudentGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}
    private roles = ['admin', 'principal', 'teacher'];

    canActivate(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        const { req } = ctx.getContext();
        const roles = this.reflector.get<string[]>('roles', context.getHandler());

        const authHeader = req.headers['authorization'];

        if (!authHeader) {
            throw new UnauthorizedException('Missing Authorization header');
        }

        const token = authHeader.split(' ')[1];
        let userRole = '';
        for (const role of this.roles) {
            if (role == token) userRole = token;
        }

        if (!roles.includes(userRole)) {
            throw new GraphQLError('You do not have access to this resource');
        }

        return true;
    }
}
