import mongoose from "mongoose";

interface IUser {
    name: string;
    email: string;
    password: string;
    createdAt?: Date;
}


const userSchema = new mongoose.Schema({
    fname: {type: String, required: true},
    lname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    createdAt: {type: Date, default: new Date()}
})
// what is Schema? Schema is a blueprint of how the data will be stored in the database
// what is model? model is a wrapper around the schema
// why schema and model? schema is used to define the structure of the data and model is used to perform CRUD operations
// what is mongoose? mongoose is a library that helps us to connect to the database and perform CRUD operations

let UserModel = mongoose.model<IUser>("User", userSchema);

export default UserModel;