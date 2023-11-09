import db from "@/lib/db";
import Post from "@/models/Post";

export async function GET(req, ctx) {

    await db.connect()

    const id = ctx.params.id


    if (id) {

        try {
            const post = await Post.findById(id)
                .populate("userId")
                .select("-password")

            return new Response(JSON.stringify(post), { status: 200 })
        } catch (error) {
            console.log(error)
        }
    }

    const url = new URL(req.url)
    const userId = url.searchParams.get("userId")

    try {
        const posts = await Post.find({ userId })
            .populate("userId")
            .select("-password")

        return new Response(JSON.stringify(posts), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 })
    }
}