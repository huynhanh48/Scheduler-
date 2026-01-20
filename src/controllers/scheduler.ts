import { NextFunction, Request, Response } from "express";
import RootMethod from "./root.js";
import { prisma } from "~/lib/prisma.js";
import SchedulerSchema from "~/schema/scheduler.js";

class Scheduler implements RootMethod {
    async GetAll(req: Request, res: Response, next: NextFunction) {
        const Scheduler = await prisma.scheduler.findMany({
            where: {
                userId: Number(req.user?.id)
            },
            include: {
                contacts: true
            }
        })
        return res.json(Scheduler)
    }

    async GetById(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params
        const Scheduler = await prisma.scheduler.findFirstOrThrow({
            where: {
                id: Number(id),
            },
            include: {
                contacts: true
            }
        })
        return res.json(Scheduler)
    }
    async Create(req: Request, res: Response, next: NextFunction) {
        const validationScheduler = SchedulerSchema.parse(req.body)
        const newScheduler = await prisma.scheduler.create({
            data: {
                userId: Number(req.user?.id),
                startDate: validationScheduler.startDate,
                dueDate: validationScheduler.dueDate,
                isNotification: validationScheduler.isNotification ?? false,
                isSeen: validationScheduler.isSeen ?? false,
                contacts: { connect: validationScheduler.contacts.map(contact => ({ id: contact })) }
            }
        })
        return res.json(newScheduler)
    }
    async Edit(req: Request, res: Response, next: NextFunction) {
        const validationScheduler = SchedulerSchema.parse(req.body)
        const { id } = req.params

        const updatedScheduler = await prisma.scheduler.update({
            where: {
                id: Number(id)
            },
            data: {
                startDate: validationScheduler.startDate,
                dueDate: validationScheduler.dueDate,
                isNotification: validationScheduler.isNotification ?? false,
                isSeen: validationScheduler.isSeen ?? false,
                contacts: {
                    set: validationScheduler.contacts.map(contactId => ({ id: contactId }))
                }
            }
        })
        return res.json(updatedScheduler)
    }
    async Delete(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params

        const deletedScheduler = await prisma.scheduler.delete({
            where: {
                id: Number(id)
            }
        })

        return res.json({
            deleteWithId: id,
            deletedScheduler
        })
    }
}

const SchedulerController = new Scheduler()
export default SchedulerController