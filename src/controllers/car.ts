import { NextFunction, Request, Response } from "express";
import RootMethod from "./root.js";
import { prisma } from "~/lib/prisma.js";
import CarSchema from "~/schema/car.js";

class Car implements RootMethod {
    async GetAll(req: Request, res: Response, next: NextFunction) {
        const userId = Number(req.user?.id)
        const Cars = await prisma.car.findMany({
            where: { userId },
            orderBy: {
                createAt: "desc"
            }
        })
        return res.json(Cars)
    }
    async GetById(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const Car = await prisma.car.findFirstOrThrow({ where: { id: Number(id) } })
        return res.json(Car)
    }
    async Create(req: Request, res: Response, next: NextFunction) {
        const validationCar = CarSchema.parse(req.body)
        const userId = Number(req.user?.id)

        const Car = await prisma.car.create({
            data: {
                name: validationCar.name,
                colors: validationCar.colors.join(","),
                price: validationCar.price,
                userId: userId
            }
        })
        res.json(Car)
    }
    async Edit(req: Request, res: Response, next: NextFunction) {
        const validationCar = CarSchema.parse(req.body)
        const { id } = req.params
        const Car = await prisma.car.update({
            where: {
                id: Number(id)
            },
            data: {
                name: validationCar.name,
                colors: validationCar.colors.join(","),
                price: validationCar.price

            }
        })
        res.json(Car)
    }
    async Delete(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params
        const Car = await prisma.car.delete({
            where: {
                id: Number(id)
            }
        })
        return res.json({
            deleteWithId: id,
            Car
        })
    }
}
const CarController = new Car()
export default CarController