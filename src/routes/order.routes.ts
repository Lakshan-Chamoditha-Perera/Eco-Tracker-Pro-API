import express from "express";
import * as OrderController from "../controllers/order.controller";
import * as Middleware from "../middlewares";
import { verifyToken } from "../middlewares";

const router = express.Router();

router.post("/save", OrderController.saveOrder);
router.get("/getAll", OrderController.getAllOrders);
// router.get("/getById", OrderController.getOrderById);

export default router;