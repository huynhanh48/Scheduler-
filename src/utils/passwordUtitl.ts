import { hashSync, compareSync, compare } from "bcrypt"

interface PasswordHash {
    password: string,
    salt: number
}
interface PasswordCompare {
    passwordTarget: string,
    passwordSource: string
}

const hashPassword = ({ password, salt }: PasswordHash) => {
    return hashSync(password, salt)
}
const verifyPassword = ({ passwordTarget, passwordSource }: PasswordCompare) => {
    return compareSync(passwordTarget, passwordSource)
}

export {
    hashPassword,
    verifyPassword
}