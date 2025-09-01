    import mongoose from "mongoose";

    const reservationSchema = new mongoose.Schema({
    TravelItineraryId: {
        type: String,
        required: true,
        trim: true
    },
    PickupDate: {
        type: Date,
        required: true
    },
    DropOffDate: {
        type: Date,
        required: true
    },
    Vehicle: {
        Image: { type: String, trim: true },
        Model: { type: String, trim: true },
        VehicleCategory: { type: String, trim: true },
        TransmissionType: { type: String, trim: true },
        AirConditioned: { type: Boolean }
    },
    PickupLocation: {
        Address: { type: String, trim: true }
    },
    DropOffLocation: {
        Address: { type: String, trim: true }
    },
    Driver: [{
        FirstName: { type: String, trim: true },
        LastName: { type: String, trim: true },
        Email: { type: String, trim: true },
        Phone: { type: String, trim: true },
        NationalityDescription: { type: String, trim: true }
    }],
    Price: {
        Total: { type: Number, required: true },
        CurrencyCode: { type: String, trim: true }
    },
    CommentContracts: {
        type: String
    },
    userId: {
        type: String
    }
    },{
        timestamps: true,   
        versionKey: false
    });

    const reservationModel = mongoose.model(
        "reservation",
        reservationSchema
    );

    export default reservationModel;