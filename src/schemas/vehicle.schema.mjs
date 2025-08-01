import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        require: true
    },
    type: {
        type: String,
        trim: true,
        require: true
    },
    color: {
        type: String,
        trim: true,
        require: true
    },
    model: {
        type: String,
        trim: true,
        require: true
    },
    rental: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "rental"
    },
    transmission: {
        type: Boolean,
        require: true
    }
},{
    timestamps: true,
    versionKey: false
});

const vehicleModel = mongoose.model(
    "vehicle",
    vehicleSchema
);

export default vehicleModel;