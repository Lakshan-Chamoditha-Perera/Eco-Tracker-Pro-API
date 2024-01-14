import express from "express";
import ItemModel from "../model/item.model";
import { IItem } from "../types/SchemaTypes";
import StandardResponse from "../response/StandardResponse";

// getAll---------------------------------------------------------------------------------------------------------------------
export const getAllItems = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    let items = await ItemModel.find();
    res.send(new StandardResponse(200, "Items found", items));
  } catch (err) {
    res.send(new StandardResponse(500, "Something went wrong", null));
  }
};
// save---------------------------------------------------------------------------------------------------------------------
export const saveItem = async (req: express.Request, res: express.Response) => {
  try {
    let item = await ItemModel.create(req.body);

    res.send(new StandardResponse(200, "Item saved", item));
  } catch (err) {
    res.send(new StandardResponse(500, "Something went wrong", null));
  }
};

// update-------------------------------------------------------------------------------------------------------------------
async function updateItem(req: express.Request, res: express.Response) {
  let isExits = await ItemModel.exists({ _id: req.body._id });
  console.log(isExits);
}
// delete-------------------------------------------------------------------------------------------------------------------
// get by id----------------------------------------------------------------------------------------------------------------
// update qty---------------------------------------------------------------------------------------------------------------
