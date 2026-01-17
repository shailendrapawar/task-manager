import expres from "express";
import { configDotenv } from "dotenv";
configDotenv();

import {
    createBoard, createTask, getBoard, searchBoards, updateBoard
} from "../controllers/board.controller.js";


const router = expres.Router();


router.get('/:id', getBoard);

router.get('/', searchBoards);

router.post('/', createBoard);

router.put('/:id', updateBoard);

router.post('/:id/tasks', createTask)

export default router;