import HttpException from "./root.js";

// 500
class InternalRequest extends HttpException {
    constructor(message: string, errorcode: number) {
        super(message, 500, errorcode, null)
    }
}
export default InternalRequest