import db from "@/lib/db"
import { verifyJwtToken } from "@/lib/jwt"
import User from "@/models/User"

export async function GET(req, ctx) {

    await db.connect()

    const id = ctx.params.id

    try {
        const user = await User.findById(id).select("-password")

        return new Response(JSON.stringify(user), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({ error: "An error occured" }), { status: 500 })
    }
}

export async function PUT(req, ctx) {

    await db.connect()

    const id = ctx.params.id

    const accessToken = req.headers.get("authorization")

    const token = accessToken.split(" ")[1]

    const decodedToken = verifyJwtToken(token)

    if (!accessToken || !decodedToken) {
        return new Response(JSON.stringify({ error: "unauthorized (wrong or expired token)" }), { status: 403 })
    }

    try {
        const body = await req.json()
        const userId = decodedToken?._id

        if(userId !== id){
            return new Response(JSON.stringify({ error: "You can only update your own profike" }), { status: 403 })
        }

        // check if a field is empty
        if (Object.values((body)).some((v) => v === "")) {
            return new Response(JSON.stringify({ error: "Fill all fields" }), { status: 403 })
        }

        await User.findByIdAndUpdate(id, { $set: { ...body } }, { new: true })

        return new Response(JSON.stringify(userId), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({ error: "An error occured" }), { status: 500 })
    }
}