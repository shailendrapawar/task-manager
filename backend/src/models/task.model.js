import mongoose from "mongoose";
const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['todo', 'in-progress', 'done'],
        default: 'todo'
    },
    dueDate: {
        type: Date,
        default: null
    },
    assignedTo: {
        type: String,
        trim: true,
        default: null
    },

    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    boardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board',
        required: true
    }
},
    {
        timestamps: true
    });
const TaskModel = mongoose.model('Task', TaskSchema);
export default TaskModel;