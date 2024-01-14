import express from "express";
import * as ItemController from "../controllers/item.controller";
import * as Middleware from "../middlewares";
import { verifyToken } from "../middlewares";

const router = express.Router();

// router.get('/', verifyToken, ItemController.getAllItems);
router.post("/save", ItemController.saveItem);
router.get("/getAll", ItemController.getAllItems);

export default router;
