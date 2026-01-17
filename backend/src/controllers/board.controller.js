import { createBoardSchema, updateBoardSchema } from "../validations/board.validators.js";
import { handleError, handleResponse } from "../utils/reponseHandler.js";

import Board from "../models/board.model.js";
import Task from "../models/task.model.js";

import mongoose from "mongoose";
import { createTaskSchema } from "../validations/task.validators.js";
import TaskModel from "../models/task.model.js";

export const getBoard = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || id.trim() === '' || mongoose.Types.ObjectId.isValid(id) === false) {
            return handleError(res, 400, ' Invalid Board ID');
        }

        const board = await Board.findById(id).lean();

        if (!board) {
            return handleError(res, 404, 'Board not found');
        }
        return handleResponse(res, 200, 'Board retrieved successfully', board);

    } catch (error) {
        return handleError(res, 500, `Internal Server Error: ${error.message}`);
    }
}

export const searchBoards = async (req, res) => {

    try {
        const Boards = await Board.find({}).lean();
        const agg = await TaskModel.aggregate([
            {
                $group: {
                    _id: "$boardId",
                    totalTask: {
                        $sum: 1
                    }
                }
            }
        ])

        let data = Boards.length ? { items: Boards, count: Boards.length, agg } : { items: [], count: 0, agg: null };

        return handleResponse(res, 200, 'Boards retrieved successfully', data);
    } catch (error) {
        return handleError(res, 500, `Internal Server Error: ${error.message}`);
    }
}

export const createBoard = async (req, res) => {

    try {
        const { value, error } = createBoardSchema.validate(req.body);

        if (error) {
            return handleError(res, 400, `Validation Error: ${error.message}`);
        }

        let newBoard = null;
        newBoard = new Board(value);
        newBoard = await newBoard.save()

        return handleResponse(res, 201, 'Board created successfully', newBoard);
    } catch (error) {
        return handleError(res, 500, `Internal Server Error: ${error.message}`);
    }
}

export const updateBoard = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || id.trim() === '' || mongoose.Types.ObjectId.isValid(id) === false) {
            return handleError(res, 400, ' Invalid Board ID');
        }

        const board = await Board.findById(id);

        if (!board) {
            return handleError(res, 404, 'Board not found');
        }
        const { value, error } = updateBoardSchema.validate(req.body);
        if (error) {
            return handleError(res, 400, `Validation Error: ${error.message}`);
        }

        Object.assign(board, value);
        await board.save();

        return handleResponse(res, 200, 'Board updated successfully', board);

    } catch (error) {
        return handleError(res, 500, `Internal Server Error: ${error.message}`);
    }
}

export const createTask = async (req, res) => {
    // To be implemented
    try {
        const { id } = req.params;
        if (!id || id.trim() === '' || mongoose.Types.ObjectId.isValid(id) === false) {
            return handleError(res, 400, ' Invalid Board ID');
        }
        const board = await Board.findById(id);

        if (!board) {
            return handleError(res, 404, 'Board not found');
        }
        // console.log('Board', board);

        const { error, value } = createTaskSchema.validate(req.body);
        if (error) {
            return handleError(res, 400, `Validation Error: ${error.message}`);
        }

        let newtask = new Task({
            ...value,
            boardId: board._id
        });

        newtask = await newtask.save();

        return handleResponse(res, 201, 'Task created successfully', newtask);
    } catch (error) {
        return handleError(res, 500, `Internal Server Error: ${error.message}`);
    }
}
