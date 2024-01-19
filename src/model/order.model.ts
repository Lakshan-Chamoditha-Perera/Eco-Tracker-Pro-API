import mongoose from "mongoose";
import { IOrder } from "types/SchemaTypes";

const orderSchema = new mongoose.Schema({
  order_id: { type: String },
  status: { type: String },
  itemlist: { type: Array },
  total: { type: Number },
  date: { type: Date , default: Date.now()},
  user: { type: Object },
});

const OrderModel = mongoose.model<IOrder>("order", orderSchema);
export default OrderModel;
