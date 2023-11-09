import db from "@/lib/db"
import { verifyJwtToken } from "@/lib/jwt"
import Notification from "@/models/Notification"
import User from "@/models/User"

export async function PUT(req, ctx) {

    await db.connect()


    const accessToken = req.headers.get("authorization")

    const token = accessToken.split(" ")[1]

    const decodedToken = verifyJwtToken(token)

    if (!accessToken || !decodedToken) {
        return new Response(JSON.stringify({ error: "unauthorized (wrong or expired token)" }), { status: 403 })
    }

    try {
        const otherUserId = ctx.params.id
        const currentUserId = decodedToken?._id

        if (currentUserId === otherUserId) {
            return new Response(JSON.stringify({ error: "You can follow yourself" }), { status: 403 })
        }

        const currentUser = await User.findById(currentUserId)

        if (currentUser?.followings?.includes(otherUserId)) {
            await User.findByIdAndUpdate(otherUserId, { $pull: { followers: currentUserId } }, { new: true })
            await User.findByIdAndUpdate(currentUserId, { $pull: { followings: otherUserId } }, { new: true })

            // notifications 
            await Notification.create({
                userId: otherUserId,
                text: 'Someone unfollowed you!'
            })
            await User.findByIdAndUpdate(otherUserId, { $set: { hasNotifications: true } }, { new: true })

            return new Response(JSON.stringify({ message: "Successfully unfollowed the user" }), { status: 200 })

        } else {
            await User.findByIdAndUpdate(otherUserId, { $push: { followers: currentUserId } }, { new: true })
            await User.findByIdAndUpdate(currentUserId, { $push: { followings: otherUserId } }, { new: true })

            // notifications 
            await Notification.create({
                userId: otherUserId,
                text: 'Someone followed you!'
            })
            await User.findByIdAndUpdate(otherUserId, { $set: { hasNotifications: true } }, { new: true })

            return new Response(JSON.stringify({ message: "Successfully followed the user" }), { status: 200 })
        }
    } catch (error) {
        return new Response(JSON.stringify({ error: "An error occured" }), { status: 500 })
    }
}