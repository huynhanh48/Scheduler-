import "dotenv/config";
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '../../generated/prisma/client.js';

const adapter = new PrismaMariaDb({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    connectionLimit: 5
});
const prisma = new PrismaClient({ adapter }).$extends(
    {
        model: {
            contact: {
                CountPriority: async (userId: number): Promise<Record<string, number>> => {
                    const count = await prisma.contact.groupBy(
                        {
                            by: ["priority"],
                            where: {
                                userId
                            },
                            _count: {
                                priority: true
                            }
                        }
                    )
                    return count.reduce((acc, curr) => {
                        acc["TOTAL"] = (acc["TOTAL"] ?? 0) + curr._count.priority;
                        acc[curr.priority] = curr._count.priority;
                        return acc;
                    }, {} as Record<string, number>);
                },
                countContact: async (userId: number): Promise<Record<string, number>> => {
                    const count = await prisma.contact.groupBy(
                        {
                            by: ["status"],
                            where: {
                                userId
                            },
                            _count: {
                                status: true
                            }
                        })
                    return count.reduce((acc, curr) => {
                        acc["TOTAL"] = (acc["TOTAL"] ?? 0) + curr._count.status
                        acc[curr.status] = curr._count.status;
                        return acc
                    }, {} as Record<string, number>)

                }
            }
        }
    }
);

export { prisma }