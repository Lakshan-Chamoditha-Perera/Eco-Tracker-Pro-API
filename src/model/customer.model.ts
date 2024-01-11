import mongoose from "mongoose";
import { ICustomer } from "../types/SchemaTypes";
import { IAddress } from "../types/SchemaTypes";

const customerSchema = new mongoose.Schema({
    customer_id: { type: String, unique: true },
    fname: { type: String },
    lname: { type: String },
    gender: { type: String },
    dob: { type: Date },
    nic_no: { type: String },
    mobile: { type: String },
    address: {
        no: { type: String },
        street: { type: String },
        city: { type: String },
        postal_code: { type: String },
    },
    family_members: { type: Number },
});

const CustomerModel = mongoose.model<ICustomer>("Customer", customerSchema);
export default CustomerModel;