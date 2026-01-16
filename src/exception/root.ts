class HttpException extends Error {
    // messaging , ErrorCode, StatusCode , Error
    public StatusCode: number
    public ErrorCode: number
    public Error?: any
    constructor(message: string, statuscode: number, errorcode: number, error: any) {
        super(message)
        this.StatusCode = statuscode
        this.ErrorCode = errorcode
        this.Error = error
    }
}
export default HttpException

const ErrorCode = {
    NOT_FOUND: 1000,
    INCORRECT_PASSWORD: 1001,
    ALREADY_EXITS: 1002,
    TOKEN_INVALID: 1003,
    INTERNAL_ERROR: 2000,
    MISTAKE_FIELD: 3000
}

type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode]

export {
    ErrorCode
}