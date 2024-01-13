import express from "express";
import UserModel from "../model/user.model";
import StandardResponse from "../response/StandardResponse";
import * as SchemaTypes from "../types/SchemaTypes";
import jwt, { Secret } from "jsonwebtoken";
import { nameRegex } from "../util/validations";
import CustomerModel from "../model/customer.model";

// ---------------------------------------------------------------------------------------------------------------------
function validateUserData(userdto: any) {
  if (!userdto.customer.fname && !nameRegex.test(userdto.customer.fname)) {
    throw new Error("Invalid first name");
  }
  if (!userdto.customer.lname && !nameRegex.test(userdto.customer.lname)) {
    throw new Error("Invalid last name");
  }
  if (!userdto.email && !nameRegex.test(userdto.email)) {
    throw new Error("Invalid email");
  }
  if (!userdto.password && !nameRegex.test(userdto.password)) {
    throw new Error("Invalid password");
  }
  return true;
}
async function getOnGoingCustomerId() {
  try {
    const lastCustomer = await CustomerModel.findOne()
      .sort({ createdAt: -1 })
      .limit(1)
      .exec();
    if (!lastCustomer) return "C001";

    const lastCustomerId = lastCustomer.customer_id;
    const nextCustomerId = incrementCustomerId(lastCustomerId);
    return nextCustomerId;
  } catch (error) {
    console.error("Error getting the last customer ID:", error);
    throw error;
  }
}
function incrementCustomerId(lastCustomerId: string) {
  console.log("incrementing customer ID : " + lastCustomerId);
  const lastIdNumber = parseInt(lastCustomerId.slice(1), 10);
  const nextIdNumber = lastIdNumber + 1;
  const nextCustomerId = `C${nextIdNumber.toString().padStart(3, "0")}`;
  console.log("next customer ID : " + nextCustomerId);
  return nextCustomerId;
}
export const signup = async (req: express.Request, res: express.Response) => {
  try {
    const userdto = req.body;
    console.log(userdto);

    if (userdto && validateUserData(userdto)) {
      const existingUser = await UserModel.findOne({ email: userdto.email });

      if (existingUser) {
        console.log("User already exists");
        return res
          .status(409)
          .send(new StandardResponse(409, "User already exists", null));
      }

      // const customerId = await getOnGoingCustomerId();  // Await the result here

      const newCustomer = new CustomerModel({
        fname: userdto.customer.fname,
        lname: userdto.customer.lname,
      });

      const savedCustomer = await newCustomer.save();

      console.log("saved customer : " + savedCustomer);

      const newUser = new UserModel({
        email: userdto.email,
        password: userdto.password,
        customer: savedCustomer._id,
      });

      const savedUser = await newUser.save();

      if (savedUser) {
        return res
          .status(200)
          .send(
            new StandardResponse(200, "User created successfully", savedUser)
          );
      } else {
        console.log("User not saved");
        return res
          .status(500)
          .send(new StandardResponse(500, "Something went wrong", null));
      }
    } else {
      return res
        .status(400)
        .send(new StandardResponse(400, "Invalid data", null));
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send(new StandardResponse(500, "Something went wrong!", null));
  }
};
// ---------------------------------------------------------------------------------------------------------------------
export const signin = async (req: express.Request, res: express.Response) => {
  console.log("sign in");

  async function generateToken() {
    return jwt.sign(
      { email: req.body.email },
      process.env.JWT_SECRET as Secret,
      { expiresIn: "2w" }
    );
  }

  try {
    let login_req = req.body;
    let user: SchemaTypes.IUser | null = await UserModel.findOne({
      email: login_req.email,
    });
    if (user) {
      console.log("user found");
      if (user.password == login_req.password) {
        console.log("user logged in successfully");
        let token = await generateToken();
        res.send(
          new StandardResponse(200, "User logged in successfully", {
            email: user.email,
            token: token,
            role: user.role,
          })
        );
      } else {
        console.log("invalid credentials");
        res.send(new StandardResponse(401, "Invalid credentials", null));
      }
    } else {
      res.send(new StandardResponse(404, "User not found", null));
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send(new StandardResponse(500, "Something went wrong", null));
  }
};
// ---------------------------------------------------------------------------------------------------------------------
export const getUserByEmail = async (
  req: express.Request,
  res: express.Response
) => {
  console.log("get user by email : " + req.query.email);
  try {
    let user: SchemaTypes.IUser | null = await UserModel.findOne({
      email: req.query.email,
    });
    if (user) {
      res.status(200).send(new StandardResponse(200, "User found", user));
    } else {
      res.status(404).send(new StandardResponse(404, "User not found", null));
    }
  } catch (err) {
    res
      .status(500)
      .send(new StandardResponse(500, "Something went wrong", null));
  }
};
// ---------------------------------------------------------------------------------------------------------------------
export const getCustomerByEmail = async (
  req: express.Request,
  res: express.Response
) => {
  console.log("get customer by email : " + req.query.email);
  try {
    let user: SchemaTypes.IUser | null = await UserModel.findOne({
      email: req.query.email,
    });

    if (user) {
      let customer: SchemaTypes.ICustomer | null = await CustomerModel.findById(
        user.customer
      );
      if (customer) {
        res
          .status(200)
          .send(new StandardResponse(200, "Customer found", customer));
      } else {
        res
          .status(404)
          .send(new StandardResponse(404, "Customer not found", null));
      }
    } else {
      res.status(404).send(new StandardResponse(404, "User not found", null));
    }
  } catch (err) {}
};
