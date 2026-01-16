import HttpException from "./root.js";

class BadRequest extends HttpException {
    constructor(message: string, errorcode: number) {
        super(message, 400, errorcode, null)
    }
}
export default BadRequest