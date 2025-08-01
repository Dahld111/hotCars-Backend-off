import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        require: true
    },
    email: {
    type: String,
    trim: true,
    required: true,
    match: [/.+\@.+\..+/, 'Por favor ingresa un correo válido']
    },
    documentType: {
        type: String,
        require: true
    },
    documentNumber: {
        type: String,
        trim: true,
        require: true
    },
    password: {
        type: String,
        trim: true,
        require: true
    }
},{
    timestamps: true,
    versionKey: false
})

const userModel = mongoose.model(
    "user",
    userSchema
);
export default userModel;