import mongoose from "mongoose";
import { IService } from "types/SchemaTypes";

const serviceSchema = new mongoose.Schema({
    service_id: { type: String },
    name: { type: String },
    description: { type: String },
    price: { type: Number },
    availability: { type: Boolean },
    remarks: { type: String },
});

const ServiceModel = mongoose.model<IService>("Service", serviceSchema);
export default ServiceModel;
                