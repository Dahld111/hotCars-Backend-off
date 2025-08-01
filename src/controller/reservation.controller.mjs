import reservationModel from "../schemas/reservation.schema.mjs";
import bcrypt from "bcrypt";

const createReservation = async ( req, res ) => {
    const inputData = req.body;

    try {
        const salt = bcrypt.genSaltSync(10);
        console.log('salt:', salt);

        const hashPassword = bcrypt.hashSync(inputData.password, salt);
        console.log('hashPassword:', hashPassword);

        inputData.password = hashPassword;

        const data = await reservationModel.create( inputData );

        res.status( 201 ).json( data );
    } 
    catch ( error ) {
        console.error( error );
        res.status( 500 ).json({ msg: 'Error: No se pudo crear la reservación' });
    }

};

const getAllReservations = async (req, res) => {

    try {
        const data = await reservationModel.find({})
        res.json(data);
    }
    catch (error) {
        console.error(error);
        res.json({ msg: "Error: no se pudo optener el resultado de reservaciones" })
    }
};

const getReservationById = async (req, res) => {
    const ReservationsId = req.params.id;
    try {
        const data = await reservationModel.findById(ReservationsId);

        if (!data) {
            return res.json({ msg: "No se encuentra la reservación" })
        }
        res.json(data);
    }
    catch (error) {
        console.error(error);
        res.json({ msg: "Error: no se pudo encontrar la reservación" })
    }
};

const removeReservationById = async (req, res) => {
    try {
    const productId = req.params.id;
    const data = await reservationModel.findByIdAndDelete(productId);
    if (!data) {
        return res.json({ msg: "La reservacion no se encuentra" })
    }

    res.json(data);
    }

    catch (error) {
        console.error(error);
        res.json({ msg: "Error: no se pudo encontrar la reservación" })
    }
};


export {
    createReservation,
    getAllReservations,
    getReservationById,
    removeReservationById
};