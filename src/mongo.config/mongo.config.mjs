import mongoose from "mongoose";

async function dbconnection () {
    try {
    await mongoose.connect( "mongodb+srv://silvamateo:juancarlos@cluster0.8gq7clq.mongodb.net/Hot-cars-backend" )
    console.log(`te has conectado a la base de datos`)
    }
    catch( error ) {
        console.error( `base de datos no se ha podido conectar` )
    }
}

export default dbconnection;