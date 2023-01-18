import express from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import { ServerApiVersion } from 'mongodb';
import userRoutes from './routes/User';
import storageRoutes from './routes/Storage';
import urlRoutes from './routes/Url';
import channelRoutes from './routes/Channel';
import channelConnectionRoutes from './routes/Channel-Connection';
import cors from 'cors';

config();

const app = express();

/** Enable requests with JSON body */
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:1420',
  })
);

const credentials = `${__dirname}/mongo-cert.pem`;

/** Connect to MongoDB */
try {
  mongoose.set('strictQuery', true);
  mongoose.connect(process.env.DATABASE_URL, {
    ssl: true,
    sslValidate: true,
    sslKey: credentials,
    sslCert: credentials,
    serverApi: ServerApiVersion.v1,
  });
} catch (err) {
  console.log(err);
}

/** Routes */
app.use('/users/', userRoutes);
app.use('/storage/', storageRoutes);
app.use('/url/', urlRoutes);
app.use('/channel/', channelRoutes);
app.use('/connection/', channelConnectionRoutes);

app.listen(3000, () => console.log('Server listening on port 3000'));
