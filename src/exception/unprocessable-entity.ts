import HttpException from "./root.js";

class UnprocessableEntity extends HttpException {
    constructor(message: string, errorcode: number, error: any) {
        super(message, 422, errorcode, error)
    }
}

export default UnprocessableEntity