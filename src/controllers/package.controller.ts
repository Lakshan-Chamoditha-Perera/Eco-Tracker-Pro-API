import express from "express";
import StandardResponse from "../response/StandardResponse";
import PackageModel from "../model/package.model";
import { IPackage } from "../types/SchemaTypes";

// getAll---------------------------------------------------------------------------------------------------------------------
export const getAllPackages = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    let packages = await PackageModel.find();
    res.send(new StandardResponse(200, "Packages found", packages));
  } catch (err) {
    res.send(new StandardResponse(500, "Something went wrong", null));
  }
};

// save---------------------------------------------------------------------------------------------------------------------
export const savePackage = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    let packageDto = req.body;
    if (validatePackage(packageDto)) {
      let packageObj = await PackageModel.create(packageDto);
      res.send(new StandardResponse(200, "Package saved", packageObj));
    } else {
      res.send(new StandardResponse(400, "Invalid package", null));
    }
  } catch (err) {
    res.send(new StandardResponse(500, "Something went wrong", err));
  }
};

const validatePackage = (packageDto: IPackage) => {
  if (!(packageDto.name && packageDto.name.length > 0)) {
    throw new Error("Invalid package name");
  }
  if (!(packageDto.price && packageDto.price > 0)) {
    throw new Error("Invalid package price");
  }
  if (!(packageDto.description && packageDto.description.length > 0)) {
    throw new Error("Invalid package description");
  }
  if (!(packageDto.remarks && packageDto.remarks.length > 0)) {
    throw new Error("Invalid package remarks");
  }

  return true;
};

// delete---------------------------------------------------------------------------------------------------------------------
export const deletePackage = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    let id = req.query.id;
    console.log(id);
    if (id) {
      let packageObj = await PackageModel.deleteOne({ _id: id });
      res.send(new StandardResponse(200, "Package deleted", packageObj));
    } else {
      res.send(new StandardResponse(400, "Invalid package id", null));
    }
  } catch (err) {
    res.send(new StandardResponse(500, "Something went wrong", err));
  }
};
