import { NextFunction, Request, Response } from "express";
import RootMethod from "./root.js";
import { prisma } from "~/lib/prisma.js";
import ContactSchema from "~/schema/contact.js";

class Contact implements RootMethod {

    async GetAll(req: Request, res: Response, next: NextFunction) {
        const whereOptions = {
            where: {
                userId: Number(req.user?.id)
            },
            include: {
                cars: true,
                customers: {
                    select: {
                        customer: true
                    }
                },
                contents: true
            },
            orderBy: {
                createAt: "desc" as const
            }
        }
        const [contacts, countTotal, countContact] = await Promise.all([prisma.contact.findMany(whereOptions), prisma.contact.CountPriority(Number(req.user?.id)), prisma.contact.countContact(Number(req.user?.id))])
        return res.json({ contacts, countTotal, countContact })
    }

    async GetById(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params
        const Contact = await prisma.contact.findFirstOrThrow({
            where: {
                id: Number(id),
            },
            include: {
                cars: true,
                customers: true
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
                contents: {
                    create: validationContact.contents.map((content) => ({ text: content }))
                },
                priority: validationContact.priority,
                status: validationContact.status,
                cars: {
                    connect: validationContact.cars.map(car => ({ id: car }))
                },
                customers: {
                    create: validationContact.customers.map(customerId => ({
                        customer: {
                            connect: { id: customerId }
                        }
                    }))
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
                contents: {
                    deleteMany: {},
                    create: validationContact.contents.map((content) => ({ text: content }))
                },
                priority: validationContact.priority,
                status: validationContact.status,
                cars: {
                    connect: validationContact.cars.map(car => ({ id: car }))
                },
                customers: {
                    deleteMany: {},
                    create: validationContact.customers.map(customerId => ({
                        customer: {
                            connect: { id: customerId }
                        }
                    }))
                }
            }
        })
        return res.json(newContacts)
    }
    async Delete(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const contactId = Number(id);

        const result = await prisma.$transaction(async (tx) => {
            await tx.car.updateMany({
                where: { contactId: contactId },
                data: { contactId: null }
            });

            await tx.contactOnCustomer.deleteMany({
                where: { contactId: contactId }
            });

            return await tx.contact.delete({
                where: { id: contactId }
            });
        });

        return res.json({
            deleteWithId: id,
            contact: result
        });
    }
    async GETROOT(req: Request, res: Response, next: NextFunction) {
        const userId = req.user?.id
        const sortDate = {
            orderBy: {
                createAt: "desc" as const
            },
            where: {
                userId
            }
        }
        const whereOptionsOfContact = {
            where: {
                userId: Number(req.user?.id)
            },
            include: {
                cars: true,
                customers: {
                    select: {
                        customer: {
                            select: {
                                id: true,
                                email: true,
                                phoneNumber: true,
                                name: true
                            }
                        }

                    }
                },
                contents: true
            },
            orderBy: {
                createAt: "desc" as const
            }
        }
        const [contacts, customers, cars] = await Promise.all([prisma.contact.findMany(whereOptionsOfContact), prisma.customer.findMany(sortDate), prisma.car.findMany(sortDate)])
        return res.json({ contacts, customers, cars })
    }
}

const ContactController = new Contact()
export default ContactController