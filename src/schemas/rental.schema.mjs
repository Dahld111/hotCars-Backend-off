import mongoose from "mongoose";

const rentalSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        require: true
    },
    address: {
        type: String,
        trim: true,
        require: true
    },
    legalRepresentative: {
        type: String,
        trim: true,
        require: true
    }
},{
    timestamps: true,
    versionKey: false
});

const rentalModel = mongoose.model(
    "rental",
    rentalSchema
);

export default rentalSchema;