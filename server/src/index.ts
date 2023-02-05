import express from 'express';
import mongoose, { Schema } from 'mongoose';
import { config } from 'dotenv';
import { ServerApiVersion } from 'mongodb';
import userRoutes from './routes/User';
import storageRoutes from './routes/Storage';
import urlRoutes from './routes/Url';
import channelRoutes from './routes/Channel';
import cors from 'cors';
import path from 'path';
import session from 'express-session';
import MongoDBSession from 'connect-mongodb-session';
import cookieParser from 'cookie-parser';

type User = {
  id: Schema.Types.ObjectId;
  username: string;
  password: string;
};

declare module 'express-session' {
  interface SessionData {
    user: User;
    isLoggedIn: boolean;
  }
}

config();
const MongoDBStore = MongoDBSession(session);

const credentials = path.join(__dirname, 'mongo-cert.pem');

const app = express();
const store = new MongoDBStore({
  uri: process.env.DATABASE_URL,
  connectionOptions: {
    ssl: true,
    sslValidate: true,
    sslKey: credentials,
    sslCert: credentials,
    serverApi: ServerApiVersion.v1,
  },
  collection: 'sessions',
});

/** Enable requests with JSON body */
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:1420', 'http://127.0.0.1:1420'],
    methods: ['POST', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true,
  }),
);

app.use(
  session({
    cookie: {
      httpOnly: false,
      // secure: true,
      sameSite: 'none',
    },
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: false,
    store: store,
  }),
);

app.use(cookieParser());

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
app.use('/user/', userRoutes);
app.use('/storage/', storageRoutes);
app.use('/url/', urlRoutes);
app.use('/channel/', channelRoutes);

app.listen(3000, () => console.log('Server listening on port 3000'));
