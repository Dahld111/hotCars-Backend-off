import reservationModel from "../schemas/reservation.schema.mjs";
import bcrypt from "bcrypt";
import userModel from "../schemas/user.schema.mjs";

const createReservation = async ( req, res ) => {
    const inputData = req.body;
    console.log('reservation:', inputData);
    try {
        /*const salt = bcrypt.genSaltSync(10);
        console.log('salt:', salt);

        const hashPassword = bcrypt.hashSync(inputData.password, salt);
        console.log('hashPassword:', hashPassword);

        inputData.password = hashPassword;*/

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

const getReservationByUserId = async (req, res) => {
    const userId = req.params.userId;

    try {
        // Verifica si el usuario existe
        const userExists = await userModel.findById(userId);
        if (!userExists) {
            return res.status(404).json({ msg: "Usuario no encontrado" });
        }

        // Busca las reservaciones asociadas al userId
        const reservations = await reservationModel.find({ userId });

        if (!reservations || reservations.length === 0) {
        return res.status(404).json({ msg: "No se encontraron reservaciones para este usuario" });
        }

        return res.status(200).json({ ok: true, data: reservations });
    } catch (error) {
        console.error("Error al obtener reservas por userId:", error);
        return res.status(500).json({ msg: "Error: no se pudo obtener las reservaciones del usuario" });
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
    getReservationByUserId,
    removeReservationById
};