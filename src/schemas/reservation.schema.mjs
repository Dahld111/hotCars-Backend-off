import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        require: true
    },
    document:{
        type: String,
        trim: true,
        require: true
    },
    pickup: {
        type: Date,
        require: true
    },
    dropoff: {
        type: Date,
        require: true
    }
},{
    timestamps: true,
    versionKey: false
});

const reservationModel = mongoose.model(
    "reservation",
    reservationSchema
);

export default reservationSchema;