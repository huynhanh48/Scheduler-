import { NextFunction, Request, Response } from "express";
import RootMethod from "./root.js";
import { prisma } from "~/lib/prisma.js";
import { CustomerSchema } from "~/schema/customer.js";

class Customer implements RootMethod {
    async GetAll(req: Request, res: Response, next: NextFunction) {
        const userId = req.user?.id
        const customers = await prisma.customer.findMany({ where: { userId } });
        return res.json(customers);
    }

    async GetById(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;

        const customer = await prisma.customer.findFirstOrThrow({
            where: {
                id: Number(id)
            }
        });
        return res.json(customer);
    }
    async Create(req: Request, res: Response, next: NextFunction) {
        const validationCustomer = CustomerSchema.parse(req.body)
        const userId = Number(req.user?.id)
        const customer = await prisma.customer.create({
            data: {
                name: validationCustomer.name,
                phoneNumber: validationCustomer.phoneNumber,
                email: validationCustomer.email,
                career: validationCustomer.career,
                userId: userId
            }
        })
        return res.json(customer)
    }
    async Edit(req: Request, res: Response, next: NextFunction) {
        const validationCustomer = CustomerSchema.parse(req.body)
        const { id } = req.params

        const customer = await prisma.customer.update({
            where: {
                id: Number(id)
            },
            data: {
                name: validationCustomer.name,
                phoneNumber: validationCustomer.phoneNumber,
                email: validationCustomer.email,
                career: validationCustomer.career
            }
        })

        return res.json(customer)
    }
    async Delete(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params

        const customer = await prisma.customer.delete({
            where: { id: Number(id) }
        })

        return res.json({ deleteWithId: id, customer })
    }

}

const CustomerController = new Customer()
export default CustomerController;