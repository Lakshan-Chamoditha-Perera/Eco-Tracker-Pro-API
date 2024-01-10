import express from "express";
import UserModel from "../model/user.model";

export const saveUser = async (req: express.Request, res: express.Response) => {
    let user = req.body;
    console.log(user);
    res.send(user);
}

export const signup = async (req: express.Request, res: express.Response) => {
    let findOne = UserModel.findOne({email: req.body.email});
    findOne.then((e: any) => {
        if (e) {
            res.status(409).send("User already exists");
        } else {
            let user = new UserModel(req.body);
            user.save().then((e: any) => {
                res.status(200).send(e);
            }).catch((err: any) => {
                console.log(err);
            })
        }
    }).catch((err: any) => {
        console.log(err);
    })
}

