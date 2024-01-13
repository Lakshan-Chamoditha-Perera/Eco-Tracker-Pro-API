import express from "express";
import * as UserController from "../controllers/user.controller";
import * as Middleware from "../middlewares";
import {verifyToken} from "../middlewares";

const router = express.Router();

router.post('/signup', UserController.signup)
router.post('/signin', UserController.signin)
router.get('/getUserByEmail',UserController.getUserByEmail);   
router.get('/getCustomer',UserController.getCustomerByEmail);
































export default router;
