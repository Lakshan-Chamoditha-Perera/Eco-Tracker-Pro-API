import express from "express";
import ItemModel from "../model/item.model";
import { IItem } from "../types/SchemaTypes";
import StandardResponse from "../response/StandardResponse";

// getAll-------------------------------------------------------------------------------------------------------------------
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
export const saveItem = async (
  req: express.Request, 
  res: express.Response
  ) => {
  try {
    let item = await ItemModel.create(req.body);

    res.send(new StandardResponse(200, "Item saved", item));
  } catch (err) {
    res.send(new StandardResponse(500, "Something went wrong", null));
  }
};
// update-------------------------------------------------------------------------------------------------------------------
export const updateItem = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    let isExits = await ItemModel.exists({ _id: req.body._id });

    let updatedItem = await ItemModel.updateOne(
      { _id: req.body._id },
      {
        $set: {
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
          qty: req.body.qty,
        },
      }
    );
    console.log(updatedItem);
    res.send(new StandardResponse(200, "Item updated", updateItem));
  } catch (err) {
    res.send(new StandardResponse(404, "Item not exists", null));
  }
};
// delete-------------------------------------------------------------------------------------------------------------------
export const deleteItem = async (
  req: express.Request,
  res: express.Response
) => {
  const id = req.query.id;
  console.log(id);
  try {
    await ItemModel.exists({ _id: id });
    await ItemModel.deleteOne({ _id: id });
    res.send(new StandardResponse(200, "Item deleted"));
  } catch (err) {
    res.send(new StandardResponse(404, "Item not exists", null));
  }
};

// get by id----------------------------------------------------------------------------------------------------------------
// update qty---------------------------------------------------------------------------------------------------------------
