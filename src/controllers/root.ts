import { RequestHandler } from "express";

interface RootMethod {
    GetAll: RequestHandler
    GetById: RequestHandler
    Create: RequestHandler
    Edit: RequestHandler
    Delete: RequestHandler
}
export default RootMethod