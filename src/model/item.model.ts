import mongoose from "mongoose";
import { IItem } from "../types/SchemaTypes";

const itemSchema = new mongoose.Schema({
    name: { type: String },
    price: { type: Number },
    qty: { type: Number },
    description: { type: String },
    image: { type: String },
});

const ItemModel = mongoose.model<IItem>("Item", itemSchema);
export default ItemModel;
