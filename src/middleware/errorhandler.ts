import { NextFunction, Request, RequestHandler, Response } from "express";
import { ZodError } from "zod";
import BadRequest from "~/exception/bad-request.js";
import HttpException, { ErrorCode } from "~/exception/root.js";
import UnprocessableEntity from "~/exception/unprocessable-entity.js";

const ErrorHandler = (method: RequestHandler) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await method(req, res, next);
        } catch (error) {
            console.log(error)
            let exception: HttpException

            if (error instanceof ZodError) {
                exception = new UnprocessableEntity("Zod Schema invalid!", ErrorCode.MISTAKE_FIELD, error.issues)
            } else {
                exception = new BadRequest("Internal Error !", ErrorCode.INTERNAL_ERROR)
            }
            next(exception)
        }

    }
}
export default ErrorHandler