import mongoose from "mongoose";

const packageSchema = new mongoose.Schema({
    package_id: { type: String },
    name: { type: String },
    description: { type: String },
    price: { type: Number },
    availability: { type: Boolean },
    remarks: { type: String },
    renewal_duration:{String}
});

const PackageModel = mongoose.model("Package", packageSchema);
export default PackageModel;