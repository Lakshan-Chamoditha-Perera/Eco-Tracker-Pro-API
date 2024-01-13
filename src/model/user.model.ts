import mongoose from "mongoose";
import { IUser } from "../types/SchemaTypes";
import { ICustomer } from "../types/SchemaTypes";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "client" },
    createdAt: { type: Date, default: new Date() },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer',require:false },
});

const UserModel = mongoose.model<IUser>("User", userSchema);
export default UserModel;

// what is Schema? Schema is a blueprint of how the data will be stored in the database
// what is model? model is a wrapper around the schema
// why schema and model? schema is used to define the structure of the data and model is used to perform CRUD operations
// what is mongoose? mongoose is a library that helps us to connect to the database and perform CRUD operations
