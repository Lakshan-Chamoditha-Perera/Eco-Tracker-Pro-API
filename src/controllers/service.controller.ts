import express from "express";
import StandardResponse from "../response/StandardResponse";
import ServiceModel from "../model/service.model";
import { IService } from "types/SchemaTypes";

function generateNextServiceId() {
  return ServiceModel.findOne()
    .sort({ service_id: -1 })
    .limit(1)
    .exec()
    .then((lastService) => {
      if (lastService) {
        const lastServiceId = lastService.service_id;
        const lastIdNumber = parseInt(lastServiceId.slice(1), 10);
        console.log("lastIdNumber", lastIdNumber);
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

export const getAll = async (req: express.Request, res: express.Response) => {
  try {
    const services = await ServiceModel.find();
    res.send(new StandardResponse(200, "Success", services));
  } catch (error) {
    res.send(new StandardResponse(500, "Something went wrong", error));
  }
};


export const getById = async (req: express.Request, res: express.Response) => {
    try {
        const serviceId = req.query.service_id;
        const service = await ServiceModel.findOne({service_id: serviceId});
        console.log(service);
        res.send(new StandardResponse(200, "Success", service));
    } catch (error) {
        res.send(new StandardResponse(500, "Something went wrong", error));
    }
}

export const getOngoingServiceId = async (req: express.Request, res: express.Response) => {
    try {
        let id = await generateNextServiceId();
        res.send(new StandardResponse(200, "Success", id));
    } catch (error) {
        res.send(new StandardResponse(500, "Something went wrong", error));
    }
}