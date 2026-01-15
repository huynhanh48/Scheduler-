import { User } from "generated/prisma/client.ts";

declare module "express"
{
    export interface Request {
        user?: User
    }
}