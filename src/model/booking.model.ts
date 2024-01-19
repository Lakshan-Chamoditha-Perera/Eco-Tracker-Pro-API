import mongoose from "mongoose";
import { IBooking } from "types/SchemaTypes";

const bookingSchema = new mongoose.Schema({
  user: { type: Object, required: true },
  service: { type: Object, required: true },
  date: { type: Date, required: true },
  status: { type: String, required: true },
  total: { type: Number, required: true },
});

const BookingModel = mongoose.model<IBooking>("Booking", bookingSchema);
export default BookingModel;
