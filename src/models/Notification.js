import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        min: 8,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    new: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

export default mongoose?.models?.Notification || mongoose.model("Notification", NotificationSchema)