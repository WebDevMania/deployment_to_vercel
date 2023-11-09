import Notification from "@/models/Notification"
import User from "@/models/User"

export const createNotification = async (userId, text) => {
    await Notification.create({
        userId,
        text
    })

    await User.findByIdAndUpdate(
        userId,
        { $set: { hasNotifications: true } },
        { new: true }
    )
} 