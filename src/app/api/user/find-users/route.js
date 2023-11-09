import db from "@/lib/db";
import { verifyJwtToken } from "@/lib/jwt";
import User from "@/models/User";

export async function GET(req) {
    await db.connect()

    const accessToken = req.headers.get("authorization")
    console.log(accessToken)

    const token = accessToken.split(" ")[1]

    const decodedToken = verifyJwtToken(token)

    if (!accessToken || !decodedToken) {
        return new Response(JSON.stringify({ error: "unauthorized (wrong or expired token)" }), { status: 403 })
    }

    try {
        const userId = decodedToken._id

        const currentUser = await User.findById(userId)
        let users = await User.find({})

        // it will return users that are not our user 
        // and users we are not following
        users = users.filter((user) => {
            if (
                user._id.toString() !== currentUser._id.toString()
                &&
                !currentUser.followings.includes(user._id.toString())
            ) {
                return user
            }
        }).slice(0, 3)

        return new Response(JSON.stringify(users), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({ error: "An error occured" }), { status: 500 })
    }
}