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

dbConnect();

app.listen( PORT, '0.0.0.0', function() {
    console.log( `Servidor lanzado en http://0.0.0.0:${ PORT }` );
});