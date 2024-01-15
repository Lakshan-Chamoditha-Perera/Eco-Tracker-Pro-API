import express from "express";
import StandardResponse from "response/StandardResponse";
import PackageModel from "model/package.model";
import { IPackage } from "types/SchemaTypes";

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
  