import { createNotification } from "@/lib/createNotification"
import db from "@/lib/db"
import { verifyJwtToken } from "@/lib/jwt"
import Comment from "@/models/Comment"

export async function PUT(req, ctx) {
    await db.connect()

    const accessToken = req.headers.get("authorization")

    const token = accessToken.split(" ")[1]

    const decodedToken = verifyJwtToken(token)

    if (!accessToken || !decodedToken) {
        return new Response(JSON.stringify({ error: "unauthorized (wrong or expired token)" }), { status: 403 })
    }

    try {
        const id = ctx.params.id
        const userId = decodedToken._id

        const comment = await Comment.findById(id)

        if (comment?.likes?.includes(userId)) {
            await Comment.findByIdAndUpdate(id, { $pull: { likes: userId } })

            await createNotification(comment.userId, "Someone unliked your comment!")
            return new Response(JSON.stringify({ msg: "Post successfully has been unliked" }), { status: 200 })
        } else {
            await Comment.findByIdAndUpdate(id, { $push: { likes: userId } })

            await createNotification(comment.userId, "Someone liked your comment!")
            return new Response(JSON.stringify({ msg: "Post successfully has been liked" }), { status: 200 })
        }

    } catch (error) {
        return new Response(JSON.stringify(error.message), { status: 500 })
    }
}