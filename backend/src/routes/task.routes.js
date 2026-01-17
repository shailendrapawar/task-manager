import expres from "express";
import { configDotenv } from "dotenv";
configDotenv();
import {
    getTask, searchTasks, updateTask, deleteTask
} from "../controllers/task.controller.js";

const router = expres.Router();

router.get('/:id', getTask);

router.get('/', searchTasks);

router.put('/:id', updateTask);

router.delete('/:id', deleteTask);

export default router;