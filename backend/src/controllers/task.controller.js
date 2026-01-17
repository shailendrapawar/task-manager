

import { createBoardSchema, updateBoardSchema } from "../validations/board.validators.js";
import { handleError, handleResponse } from "../utils/reponseHandler.js";

import Board from "../models/board.model.js";
import Task from "../models/task.model.js";

import mongoose from "mongoose";
import { updateTaskSchema } from "../validations/task.validators.js";

const statusMap = {
    'todo': ["in-progress", "done"],
    'in-progress': ["todo", "done"],
    'done': []
}

export const getTask = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || id.trim() === '' || mongoose.Types.ObjectId.isValid(id) === false) {
            return handleError(res, 400, ' Invalid Task ID');
        }
        const task = await Task.findById(id).lean();
        console.log('Task', task);
        if (!task) {
            return handleError(res, 404, 'Task not found', null);
        }
        return handleResponse(res, 200, 'Task retrieved successfully', task);

    }
    catch (error) {
        return handleError(res, 500, `Internal Server Error: ${error.message}`);
    }
}

export const searchTasks = async (req, res) => {
    try {
        const { status, assignedTo, boardId, priority } = req.query;
        const filter = {};

        if (status) {
            filter.status = status;
        }
        if (priority) {
            filter.priority = priority;
        }
        if (assignedTo) {
            filter.assignedTo = assignedTo;
        }
        if (boardId) {
            filter.boardId = boardId;
        }

        let tasks = await Task.find(filter).lean();
        tasks = tasks.length ? { items: tasks, count: tasks.length } : { items: [], count: 0 };
        return handleResponse(res, 200, 'Tasks retrieved successfully', tasks);

    } catch (error) {
        return handleError(res, 500, `Internal Server Error: ${error.message}`);
    }
}

export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || id.trim() === '' || mongoose.Types.ObjectId.isValid(id) === false) {
            return handleError(res, 400, ' Invalid Task ID');
        }
        const { value, error } = updateTaskSchema.validate(req.body);
        if (error) {
            return handleError(res, 400, `Validation Error: ${error.message}`);
        }

        let task = await Task.findById(id);
        if (!task) {
            return handleError(res, 404, 'Task not found');
        }

        //check status transition validity
        if (value.status) {
            const allowedStatuses = statusMap[task.status];
            if (!allowedStatuses.includes(value.status)) {
                return handleError(res, 400, `Invalid status transition from ${task.status} to ${value.status}`);
            }
        }
        task = Object.assign(task, value);
        const updatedTask = await task.save();
        return handleResponse(res, 200, 'Task updated successfully', updatedTask);

    } catch (error) {
        return handleError(res, 500, `Internal Server Error: ${error.message}`);
    }
}

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || id.trim() === '' || mongoose.Types.ObjectId.isValid(id) === false) {
            return handleError(res, 400, ' Invalid Task ID');
        }
        const task = await Task.findByIdAndDelete(id);

        if (!task) {
            return handleError(res, 404, 'Task not found');
        }
        return handleResponse(res, 200, 'Task deleted successfully', task);

    } catch (error) {
        return handleError(res, 500, `Internal Server Error: ${error.message}`);
    }
}   