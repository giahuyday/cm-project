import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorResponse } from '../errors/ErrorResponse';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    private HttpResponseCode(status: number): string {
        const errorCodes = {
            [HttpStatus.BAD_REQUEST]: 'BAD_REQUEST_INPUT',
            [HttpStatus.UNAUTHORIZED]: 'UNAUTHORIZED',
            [HttpStatus.FORBIDDEN]: 'FORBIDDEN',
            [HttpStatus.NOT_FOUND]: 'NOT_FOUND',
            [HttpStatus.INTERNAL_SERVER_ERROR]: 'INTERNAL_SERVER_ERROR',
            [HttpStatus.CONFLICT]: 'CONFLICT_DATA',
        };

        return errorCodes[status] || 'UNKNOWN_ERROR';
    }

    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const status = exception.getStatus();
        const errorCode = this.HttpResponseCode(status);
        const errorDetail = exception.getResponse();

        const devMessage =
            typeof errorDetail === 'string' ? errorDetail : (errorDetail as any).message || 'Unexpected error occured';
        const responseData = new ErrorResponse(request.url, errorCode, devMessage, request.body);

        response.status(status).json(responseData);
    }
}
