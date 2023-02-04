import mongoose, { Schema } from 'mongoose';

export const sessionSchema = new mongoose.Schema(
  {
    expires: Date,
    session: {
      cookie: Object,
      user: {
        id: Schema.Types.ObjectId,
        username: String,
        password: String,
      },
      isLoggedIn: Boolean,
    },
  },
  { collection: 'session' },
);

export default mongoose.model('session', sessionSchema);
