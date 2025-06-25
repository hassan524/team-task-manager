import express from 'express';
import asyncErrorHandler from '../utils/AsyncErrorHandler';
import { isAuthenticated } from '../middleware/auth';
import { createtasks, gettasks, updatetasks, deletetasks, toggleComplete } from '../controller/taskController';

const router = express.Router();

router.post('/create', isAuthenticated, asyncErrorHandler(createtasks));
router.get('/GetTasks', isAuthenticated, asyncErrorHandler(gettasks));
router.post('/update', isAuthenticated, asyncErrorHandler(updatetasks));
router.post('/delete', isAuthenticated, asyncErrorHandler(deletetasks));
router.post('/toggle', isAuthenticated, asyncErrorHandler(toggleComplete));


export default router;
