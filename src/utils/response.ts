import { Response } from 'express';

export const successResponse = (response: Response, data: any = undefined, message: any = undefined, status: any = undefined) => {
    response.status(status ?? 200).json({
        status: 'success',
        message: message,
        data: data
    });
};

export const successPaginateResponse = (response: Response, data: any = undefined, message: any = undefined, status: any = undefined) => {
    response.status(status ?? 200).json({
        status: 'success',
        message: message,
        ...data
    });
};

export const clientErrorResponse = (response: Response, data: any = undefined, message: any = 'Bad Request Error', status: any = undefined) => {
    response.status(status ?? 400).json({
        status: 'error',
        message: message,
        data: data
    });
};

export const serverErrorResponse = (response: Response, data: any = undefined, message: any = 'Internal Server Error', status: any = undefined) => {
    response.status(status ?? 500).json({
        status: 'error',
        message: message,
        data: data
    });
};