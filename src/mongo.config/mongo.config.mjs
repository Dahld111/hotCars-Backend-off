import mongoose from "mongoose";

async function dbconnection () {
    try {
    await mongoose.connect( "mongodb://localhost:27017/hotcars" )
    console.log(`te has conectado a la base de datos`)
    }
    catch( error ) {
        console.error( `base de datos no se ha podido conectar` )
    }
}

export default dbconnection;