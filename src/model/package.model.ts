import mongoose from "mongoose";
import { IPackage } from "types/SchemaTypes";

const packageSchema = new mongoose.Schema({
    package_id: { type: String },
    name: { type: String },
    description: { type: String },
    price: { type: Number },
    availability: { type: Boolean },
    remarks: { type: String }
});

const PackageModel = mongoose.model<IPackage>("Package", packageSchema);
export default PackageModel;