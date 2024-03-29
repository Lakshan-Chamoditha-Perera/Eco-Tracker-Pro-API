import express from "express";
import * as ServiceController from "../controllers/service.controller";
import * as Middleware from "../middlewares";
import {verifyToken} from "../middlewares";

const router = express.Router();

router.post('/save', ServiceController.save);
router.get('/getAll', ServiceController.getAll);
router.get('/getById', ServiceController.getById);
router.get('/getOngoingServiceId', ServiceController.getOngoingServiceId);
router.delete('/delete', ServiceController.deleteService);
router.put('/update', ServiceController.updateService);


export default router;