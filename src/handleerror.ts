import { NextFunction, Request, Response } from "express";
import HttpException, { ErrorCode } from "./exception/root.js";

const HandleError = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
    return res.status(error.StatusCode).json({
        message: error.message,
        ErrorCode: error.ErrorCode,
        error: error.Error
    })
}

export default HandleError