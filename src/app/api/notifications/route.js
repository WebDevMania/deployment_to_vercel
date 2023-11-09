import db from "@/lib/db";
import { verifyJwtToken } from "@/lib/jwt";
import Notification from "@/models/Notification";
import User from "@/models/User";

export async function GET(req) {
    await db.connect()

    const accessToken = req.headers.get("authorization")

    const token = accessToken.split(" ")[1]

    const decodedToken = verifyJwtToken(token)

    if (!accessToken || !decodedToken) {
        return new Response(JSON.stringify({ error: "unauthorized (wrong or expired token)" }), { status: 403 })
    }

    const userId = decodedToken._id

    try {
        await Notification.updateMany({ userId }, { $set: { new: false } }, { new: true })

        const notifications = await Notification.find({ userId }).sort({ createdAt: -1 })
        await User.findByIdAndUpdate(userId, { $set: { hasNotifications: false } }, { new: true })

        return new Response(JSON.stringify(notifications), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 })
    }
}