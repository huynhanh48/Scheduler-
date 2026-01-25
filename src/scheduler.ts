import moment from "moment";
import { prisma } from "./lib/prisma.js";
import { CronJob } from 'cron';

const checkAndSetNotifications = async () => {
    try {
        const now = new Date();
        const tomorrow = moment().add(1, 'days').toDate();
        console.log("cron : ", tomorrow)
        const upcomingSchedulers = await prisma.scheduler.updateMany({
            where: {
                dueDate: {
                    gte: now,
                    lte: tomorrow
                },
                isNotification: false
            },
            data: {
                isNotification: true
            }
        });

        if (upcomingSchedulers.count > 0) {
            console.log(`[Cron Job] Success: Updated ${upcomingSchedulers.count} tasks.`);
        }
    } catch (error) {
        console.error("[Cron Job Error]:", error);
    }
};

const job = new CronJob(
    '* * * * *',
    checkAndSetNotifications,
    null,
    true,
    'Asia/Ho_Chi_Minh'
);

export default job;