import mongoose from "mongoose";
import { IPackage } from "types/SchemaTypes";

const packageSchema = new mongoose.Schema({
    package_id: { type: String },
    description: { type: String },
    price: { type: Number },
    bin_size: { type: String },
    renewal_duration: { type: String }
});

const PackageModel = mongoose.model<IPackage>("Package", packageSchema);
export default PackageModel;