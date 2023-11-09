import { createNotification } from "@/lib/createNotification";
import db from "@/lib/db";
import { verifyJwtToken } from "@/lib/jwt";
import Comment from "@/models/Comment";
import Post from "@/models/Post";

export async function POST(req) {
    await db.connect()

    const accessToken = req.headers.get("authorization")

    const token = accessToken.split(" ")[1]

    const decodedToken = verifyJwtToken(token)

    if (!accessToken || !decodedToken) {
        return new Response(JSON.stringify({ error: "unauthorized (wrong or expired token)" }), { status: 403 })
    }

    try {
        const body = await req.json()

        const post = await Post.findById(post.userId)
        const newComment = await Comment.create(body)

        await Post.findByIdAndUpdate(body.postId, { $push: { comments: newComment._id } }, { new: true })
        await createNotification(post.userId, "Someone commented on your post!")

        return new Response(JSON.stringify(newComment), { status: 201 })
    } catch (error) {
        return new Response(JSON.stringify(error.message), { status: 500 })
    }
}