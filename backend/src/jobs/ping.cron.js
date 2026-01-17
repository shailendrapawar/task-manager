import cron from "node-cron";
import { configDotenv } from "dotenv";
configDotenv()

export const startPingCron = () => {
    cron.schedule("*/5 * * * *", async () => {
        try {
            const url = process.env.BACKEND_URL || null
            const environment = process.env.NODE_ENV || null
            if (!url) {
                console.log("No backend Url found to ping")
                return
            }
            await fetch(url+ "/health", { signal: AbortSignal.timeout(5000) });
            console.log("Pinged self=============>>>>>");
        } catch (e) {
            console.log("Ping failed==============>>>>");
        }
    });
    console.log("Ping cron started");
};