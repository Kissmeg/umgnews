import mongoose, { mongo } from "mongoose";

const moderatorSchema = new mongoose.Schema({
    username:{ type: String, required: true, unique: true},
    password:{ type: String, required: true}
})

export default mongoose.model("moderators", moderatorSchema)