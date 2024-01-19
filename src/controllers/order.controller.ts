import express from "express";
import StandardResponse from "../response/StandardResponse";
import OrderModel from "../model/order.model";
import { save } from "./service.controller";
import { IOrder } from "types/SchemaTypes";

export const saveOrder = async (
  req: express.Request,
  res: express.Response
) => {
  console.log("save order");
  try {
    let order = await OrderModel.create(req.body);
    res.send(new StandardResponse(200, "Order saved", order));
  } catch (err) {
    res.send(new StandardResponse(500, "Something went wrong", null));
  }
};

export const getAllOrders = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    let orders = await OrderModel.find();
    res.send(new StandardResponse(200, "Orders fetched", orders));
  } catch (err) {
    res.send(new StandardResponse(500, "Something went wrong", null));
  }
};

export const getOrdersCount = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    let count = await OrderModel.countDocuments();
    res.send(new StandardResponse(200, "Orders count fetched", count));
  } catch (err) {
    res.send(new StandardResponse(500, "Something went wrong", null));
  }
};

export const getOrdersTotal = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const orderList = await OrderModel.find();

    let total: number = 0;
    orderList.map((order: IOrder) => {
      total += order.total;
    });

    res.send(new StandardResponse(200, "Orders total fetched", total));
  } catch (err) {
    console.error("Error fetching orders total:", err);
    res.send(new StandardResponse(500, "Something went wrong", null));
  }
};
