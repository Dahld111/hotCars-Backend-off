import vehicleModel from "../schemas/vehicle.schema.mjs";
import bcrypt from "bcrypt";

const createVehicle = async ( req, res ) => {
    const inputData = req.body;

    try {
        const vehicleFound = await vehicleModel.findOne({ 
            name: inputData.name
        });

        if( vehicleFound ) {
            return res.status( 404 ).json({ msg: 'No pudo registrarse, vehiculo ya existente' });
        }

        const salt = bcrypt.genSaltSync(10);
        console.log('salt:', salt);

        const hashPassword = bcrypt.hashSync(inputData.password, salt);
        console.log('hashPassword:', hashPassword);

        inputData.password = hashPassword;

        const data = await vehicleModel.create( inputData );

        res.status( 201 ).json( data );
    } 
    catch ( error ) {
        console.error( error );
        res.status( 500 ).json({ msg: 'Error: No se pudo crear el vehiculo' });
    }

};

const getAllVehicles = async (req, res) => {

    try {
        const data = await vehicleModel.find({})
        res.json(data);
    }
    catch (error) {
        console.error(error);
        res.json({ msg: "Error: no se pudeden obtener los vehiculos" })
    }
};

const getVehicleById = async (req, res) => {
    const VehiclesId = req.params.id;
    try {
        const data = await vehicleModel.findById(VehiclesId);

        if (!data) {
            return res.json({ msg: "el vehiculo no se encuentra resgistrado" })
        }
        res.json(data);
    }
    catch (error) {
        console.error(error);
        res.json({ msg: "Error: no se pudo encontrar el vehiculo" })
    }
};

const removeVehicleById = async (req, res) => {
    try {
    const productId = req.params.id;
    const data = await vehicleModel.findByIdAndDelete(productId);
    if (!data) {
        return res.json({ msg: "el vehiculo no se encuentra resgistrado" })
    }

    res.json(data);
    }

    catch (error) {
        console.error(error);
        res.json({ msg: "Error: no se pudo encontrar el vehiculo" })
    }
};

const updateVehicleById = async (req, res) => {
    try {
        const vehiclesId = req.params.id;
        const inputData = req.body;
        const data = await vehicleModel.findByIdAndUpdate( vehiclesId, inputData, {new:true}  );
        
        res.json( data );
    }
    catch ( error ) {
        console.error( error )
        res.json({msg: "Error: no se pudo actualizar el vehiculo"})
    }
};

export {
    createVehicle,
    getAllVehicles,
    getVehicleById,
    removeVehicleById,
    updateVehicleById
};