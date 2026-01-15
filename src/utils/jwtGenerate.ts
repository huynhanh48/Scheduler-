import jwt from "jsonwebtoken"

interface GenerationJWT {
    payload: any,
    privateKey: string
}
interface CodeJWT {
    token: string,
    privateKey: string
}

const generateJwt = ({ payload, privateKey }: GenerationJWT) => {
    return jwt.sign(payload, privateKey)
}
const deCodeJwt = ({ token, privateKey }: CodeJWT) => {
    return jwt.verify(token, privateKey)
}
export { generateJwt, deCodeJwt }