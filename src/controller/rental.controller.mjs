import rentalModel from "../schemas/rental.schema.mjs";
import bcrypt from "bcrypt";

const createRental = async ( req, res ) => {
    const inputData = req.body;
    try {
        const rentalFound = await rentalModel.findOne({ 
            name: inputData.name
        });

        if( rentalFound ) {
            return res.status( 404 ).json({ msg: 'No pudo registrarse, empresa ya existente' });
        }

        const salt = bcrypt.genSaltSync(10);
        console.log('salt:', salt);

        const hashPassword = bcrypt.hashSync(inputData.password, salt);
        console.log('hashPassword:', hashPassword);

        inputData.password = hashPassword;

        const data = await rentalModel.create( inputData );

        res.status( 201 ).json( data );
    } 
    catch ( error ) {
        console.error( error );
        res.status( 500 ).json({ msg: 'Error: No se pudo crear la empresa' });
    }

};

const getAllRentals = async (req, res) => {

    try {
        const data = await rentalModel.find({})
        res.json(data);
    }
    catch (error) {
        console.error(error);
        res.json({ msg: "Error: no se pudeden obtener las empresas" })
    }
};

const getRentalById = async (req, res) => {
    const RentalsId = req.params.id;
    try {
        const data = await rentalModel.findById(RentalsId);

        if (!data) {
            return res.json({ msg: "La empresa no se encuentra resgistrado" })
        }
        res.json(data);
    }
    catch (error) {
        console.error(error);
        res.json({ msg: "Error: no se pudo encontrar la empresa" })
    }
};

const removeRentalById = async (req, res) => {
    try {
    const productId = req.params.id;
    const data = await rentalModel.findByIdAndDelete(productId);
    if (!data) {
        return res.json({ msg: "La empresa no se encuentra resgistrada" })
    }

    res.json(data);
    }

    catch (error) {
        console.error(error);
        res.json({ msg: "Error: no se pudo encontrar la empresa" })
    }
};

const updateRentalById = async (req, res) => {
    try {
        const rentalsId = req.params.id;
        const inputData = req.body;
        const data = await rentalModel.findByIdAndUpdate( rentalsId, inputData, {new:true}  );
        
        res.json( data );
    }
    catch ( error ) {
        console.error( error )
        res.json({msg: "Error: no se pudo actualizar la empresa"})
    }
};

export {
    createRental,
    getAllRentals,
    getRentalById,
    removeRentalById,
    updateRentalById
};