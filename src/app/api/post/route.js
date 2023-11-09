import db from "@/lib/db";
import { verifyJwtToken } from "@/lib/jwt";
import Post from "@/models/Post";


export async function GET(req) {

    await db.connect()

    try {
        const posts = await Post.find().limit(16).populate("userId").select("-password")

        return new Response(JSON.stringify(posts), { status: 200 })
    } catch (error) {
        console.log(error)
    }
}


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

        const newPost = await Post.create(body)

        return new Response(JSON.stringify(newPost), { status: 201 })
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 })
    }
}