import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    desc: {
        type: String,
        required: true,
        min: 8,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: [],
    },
    comments: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Comment",
        default: [],
    },
    image: {
        type: String
    }
}, {
    timestamps: true
})

export default mongoose?.models?.Post || mongoose.model("Post", PostSchema)