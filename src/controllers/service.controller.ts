import express from "express";
import StandardResponse from "../response/StandardResponse";
import ServiceModel from "../model/service.model";
import { IService } from "types/SchemaTypes";

function generateNextServiceId() {
  console.log("generateNextServiceId");
  return ServiceModel.findOne()
    .sort({ createdAt: -1 })
    .limit(1)
    .exec()
    .then((lastService) => {
      console.log("lastService", lastService);
      if (lastService) {
        const lastServiceId = lastService.service_id;
        const lastIdNumber = parseInt(lastServiceId.slice(1), 10);
        const nextIdNumber = lastIdNumber + 1;
        const nextServiceId = `S${nextIdNumber.toString().padStart(3, "0")}`;
        return nextServiceId;
      } else {
        return "S001";
      }
    })
    .catch((error) => {
      console.error("Error fetching the last service:", error);
      throw error;
    });
}

export const save = async (req: express.Request, res: express.Response) => {
  const serviceDto: IService = req.body;
  console.log(serviceDto);
  try {
    if (serviceDto && validateServiceDto(serviceDto)) {
      generateNextServiceId()
        .then((nextServiceId) => {
          serviceDto.service_id = nextServiceId;
          const service = new ServiceModel(serviceDto);
          service.save();
          res.send(
            new StandardResponse(200, "Service saved successfully", service)
          );
        })
        .catch((error) => {
          res.send(new StandardResponse(500, "Something went wrong", error));
        });
    }
  } catch (error) {
    console.log(error);
    res.send(new StandardResponse(500, "Something went wrong", error));
  }
};

function validateServiceDto(serviceDto: IService) {
  console.log("validateServiceDto called");

  if (!(serviceDto.name && serviceDto.name.length > 0)) {
    throw new Error("Invalid service name");
  }
  if (!(serviceDto.price && serviceDto.price > 0)) {
    throw new Error("Invalid service price");
  }
  if (!(serviceDto.description && serviceDto.description.length > 0)) {
    throw new Error("Invalid service description");
  }
  console.log("service validated");
  return true;
}
