import express from 'express';
import cors from 'cors';

import dbConnect from './mongo.config/mongo.config.mjs';

import auth from './routes/auth.route.mjs';
import rental from './routes/rental.routes.mjs';
import reservation from './routes/reservation.route.mjs';
import user from './routes/user.route.mjs';
import vehicle from './routes/vehicle.route.mjs';

const app = express();
const PORT = process.env.PORT || 3000;

app.use( cors() );
app.use( express.json() );

app.use(auth);
app.use(rental);
app.use(reservation);
app.use(user);
app.use(vehicle);

// Llama a la función de conexión y espera a que la promesa se resuelva
dbConnect()
  .then(() => {
    // Si la conexión es exitosa, inicia el servidor Express
    app.listen( PORT, '0.0.0.0', function() {
      console.log( `Servidor lanzado en http://0.0.0.0:${ PORT }` );
    });
  })
  .catch(error => {
    // Si la conexión falla, muestra el error y detén el proceso
    console.error('Error al conectar a la base de datos. Servidor no iniciado.', error);
    process.exit(1); // Detiene la aplicación con un código de error
  });