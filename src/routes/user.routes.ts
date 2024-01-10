import express from "express";
import * as UserController from "../controllers/user.controller";
import * as Middleware from "../middlewares";


const router = express.Router();


router.get('/signin',Middleware.verifyToken, UserController.saveUser)
router.post('/signup', UserController.signup)
export default router;
