import express from 'express';
import { login, register, logout, validateLogin, validateRegister, checkAuth, getauth} from '../controller/authController';
import asyncErrorHandler from '../utils/AsyncErrorHandler';

const router = express.Router();

router.post('/signup', validateRegister, asyncErrorHandler(register));
router.post('/login', validateLogin, asyncErrorHandler(login));
router.post('/logout', logout);
router.get("/check-auth", checkAuth);
router.get("/get-auth", asyncErrorHandler(getauth));

export default router;
