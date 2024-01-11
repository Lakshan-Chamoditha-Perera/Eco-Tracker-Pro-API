import express from "express";
import UserModel from "../model/user.model";
import StandardResponse from "../response/StandardResponse";
import * as SchemaTypes from "../types/SchemaTypes";
import jwt, {Secret} from 'jsonwebtoken';
import {nameRegex} from "../util/validations";


function validateUserData(userdto: any) {
    if (!userdto.fname && !nameRegex.test(userdto.fname)) {
        throw new Error("Invalid first name");
    }
    if (!userdto.lname && !nameRegex.test(userdto.lname)) {
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

export const signup = async (req: express.Request, res: express.Response) => {
    try {
        let userdto = req.body;
        if (userdto && validateUserData(userdto)) {
            let userModel = new UserModel({
                fname: userdto.fname, lname: userdto.lname, email: userdto.email, password: userdto.password
            });
            let user = await UserModel.findOne({email: userdto.email});
            if (user) {
                console.log("user already exists");
                res.status(409).send(new StandardResponse(409, "User already exists", null));
                return;
            }
            let savedUser: SchemaTypes.IUser | null = await userModel.save();
            if (savedUser) {
                console.log("saved");
                res.status(200).send(new StandardResponse(200, "User created successfully", savedUser));
            } else {
                console.log("not saved");
                res.status(500).send(new StandardResponse(500, "Something went wrong", null));
            }
        } else {
            res.status(400).send(new StandardResponse(400, "Invalid data", null));
        }
    } catch (err: any) {
        console.log(err);
        res.status(500).send(new StandardResponse(500, "Something went wrong!", null));
    }
}
// ---------------------------------------------------------------------------------------------------------------------
export const signin = async (req: express.Request, res: express.Response) => {
    console.log('sign in')

    async function generateToken() {
        return jwt.sign({email: req.body.email}, process.env.JWT_SECRET as Secret, {expiresIn: "2w"});
    }

    try {
        let login_req = req.body;
        let user: SchemaTypes.IUser | null = await UserModel.findOne({email: login_req.email});
        if (user) {
            if (user.password == login_req.password) {
                let token = await generateToken();
                res.status(200).send(new StandardResponse(200, "User logged in successfully", {
                    "email": user.email, token: token, role: user.role
                }));
            } else {
                res.status(401).send(new StandardResponse(401, "Invalid credentials", null));
            }
        }
    } catch (err) {
        res.status(500).send(new StandardResponse(500, "Something went wrong", null));
    }
}
