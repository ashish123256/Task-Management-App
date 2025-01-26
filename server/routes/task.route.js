import express from 'express';
import { verfiyToken } from '../utils/verfiyuser.js';
import { createTask, deleteTask, getSingleTask, getTasks, updateTask } from '../controllers/taskController.js';



const router = express.Router();

router.post("/create",verfiyToken, createTask)
router.delete("/delete/:id",verfiyToken, deleteTask);
router.put("/update/:id",verfiyToken, updateTask);
router.get("/gettasks",verfiyToken, getTasks);
router.get("/gettask/:id",verfiyToken, getSingleTask);


export default router;