import mongoose from "mongoose";
const BoardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
},
    {
        timestamps: true
    });

const BoardModel = mongoose.model('Board', BoardSchema);
export default BoardModel;