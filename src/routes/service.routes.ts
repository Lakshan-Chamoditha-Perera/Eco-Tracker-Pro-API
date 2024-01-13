import express from "express";
import * as ServiceController from "../controllers/service.controller";
import * as Middleware from "../middlewares";
import {verifyToken} from "../middlewares";

const router = express.Router();

router.post('/save', ServiceController.save);



export default router;