import express from 'express';
import asyncErrorHandler from '../utils/AsyncErrorHandler';
import { createTeam, GetTeamMembers, getUserTeams } from '../controller/teamController';
import { isAuthenticated } from '../middleware/auth';

const router = express.Router();

router.post('/create', isAuthenticated, asyncErrorHandler(createTeam));
router.get('/GetTeams', isAuthenticated, asyncErrorHandler(getUserTeams));
router.post('/GetTeamsMember', isAuthenticated, asyncErrorHandler(GetTeamMembers));

export default router;
