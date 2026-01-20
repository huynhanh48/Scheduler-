import { NextFunction, Request, Response } from "express";
import RootMethod from "./root.js";
import { prisma } from "~/lib/prisma.js";
import ContactSchema from "~/schema/contact.js";

class Contact implements RootMethod {
    async GetAll(req: Request, res: Response, next: NextFunction) {
        const Contacts = await prisma.contact.findMany({
            where: {
                userId: Number(req.user?.id)
            },
            include: {
                cars: true,
                customer: true
            }
        })
        return res.json(Contacts)
    }

    async GetById(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params
        const Contact = await prisma.contact.findFirstOrThrow({
            where: {
                id: Number(id),
            },
            include: {
                cars: true,
                customer: true
            }
        })
        return res.json(Contact)
    }
    async Create(req: Request, res: Response, next: NextFunction) {
        const validationContact = ContactSchema.parse(req.body)
        const newContacts = await prisma.contact.create({
            data: {
                userId: Number(req.user?.id),
                title: validationContact.title,
                body: validationContact.body,
                priority: validationContact.priority,
                cars: {
                    connect: validationContact.cars.map(car => ({ id: car }))
                },
                customer: {
                    connect: validationContact.customers.map(customer => ({ id: customer }))
                }
            }
        })
        return res.json(newContacts)
    }
    async Edit(req: Request, res: Response, next: NextFunction) {
        const validationContact = ContactSchema.parse(req.body)
        const { id } = req.params
        const newContacts = await prisma.contact.update({
            where: {
                id: Number(id)
            },
            data: {
                title: validationContact.title,
                body: validationContact.body,
                priority: validationContact.priority,
                cars: {
                    connect: validationContact.cars.map(car => ({ id: car }))
                },
                customer: {
                    set: validationContact.customers.map(customer => ({ id: customer }))
                }
            }
        })
        return res.json(newContacts)
    }
    async Delete(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params
        const contact = await prisma.contact.delete({
            where: {
                id: Number(id)
            }
        })
        return res.json({
            deleteWithId: id,
            contact
        })
    }
}

const ContactController = new Contact()
export default ContactController