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

export interface IService extends Document {
  service_id: string;
  name: string;
  description: string;
  price: number;
  availability: boolean;
  remarks: string;
  img_url: string;
}

export interface IItem extends Document {
  id: string;
  name: string;
  price: number;
  qty: number;
  description: string;
  image: string;
}

export interface IPackage extends Document {
  _id: string;
  name: string;
  description: string;
  price: number;
  availability: boolean;
  remarks: string;
}

export interface IOrder extends Document {
  order_id: string;
  status: string;
  itemlist: [];
  total: number;
  date: Date;
  user: IUser;
}

export interface IBooking extends Document {
  booking_id: string;
  user: IUser;
  service: IService;
  date: Date;
  status: string;
  total: number;
}