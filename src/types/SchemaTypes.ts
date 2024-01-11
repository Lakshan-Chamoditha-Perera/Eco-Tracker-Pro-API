import mongoose,{Document} from "mongoose";
export interface IUser extends Document {
    fname: string,
    lname: string,
    email: string,
    password: string,
    role: string,
    createdAt: Date
}
