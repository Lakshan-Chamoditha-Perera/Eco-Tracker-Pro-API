import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import * as process from "process";

import UserRoutes from "./routes/user.routes";
import ServiceRoutes from "./routes/service.routes";
import ItemRoutes from "./routes/item.routes";
import PackageRoutes from "./routes/package.routes";
import OrderRoutes from "./routes/order.routes";

import ImagesController from "./controllers/image.controller";

dotenv.config();

const ObjectId = require("mongoose").Types.ObjectId;

const app = express();

app.listen(3001, () => {
  console.log("server started at http://localhost:3001");
});
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log("error connecting to mongodb", err);
  });
mongoose.connection.on("error", (err) => {
  console.log("error connecting to mongodb", err);
});

const cors = require("cors");
app.use(cors());

app.use("/user", UserRoutes);
// ---------------------------------------------------------------------------------------------------------------------
app.use("/service", ServiceRoutes);
// ---------------------------------------------------------------------------------------------------------------------
app.use("/item", ItemRoutes);
// ---------------------------------------------------------------------------------------------------------------------
app.use("/package", PackageRoutes);
// ---------------------------------------------------------------------------------------------------------------------
app.use("/order", OrderRoutes);




//----------------------------------------------------------------------------------------------------------------------
app.use("/image", ImagesController);
