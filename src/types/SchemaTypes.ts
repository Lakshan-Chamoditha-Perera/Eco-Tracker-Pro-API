import mongoose, { Document } from "mongoose";

export interface IAddress extends Document {
    no: string;
    street: string;
    city: string;
    postal_code: string;
}

export interface ICustomer extends Document {
    customer_id: string;
    fname: string;
    lname: string;
    gender: string;
    dob: Date;
    nic_no: string;
    mobile: string;
    address: IAddress;
    family_members: number;
}

export interface IUser extends Document {
    email: string;
    password: string;
    role: string;
    createdAt: Date;
    customer: ICustomer;
}
