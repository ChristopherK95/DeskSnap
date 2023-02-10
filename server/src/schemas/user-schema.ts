import mongoose, { Schema } from 'mongoose';

export const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      minLength: [3, 'Must be at least 3 characters.'],
      maxLength: [20, 'Can be at most 20 characters.'],
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (v: string) {
          return /^(?=^[^_-]+[-_]?[^_-]+$)[\w-]{3,20}$/.test(v);
        },
        message: 'Username is not valid',
      },
    },
    password: {
      type: String,
      minLength: 4,
      required: true,
    },
    invites: [
      {
        sender: String,
        channel: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: 'channel',
        },
        seen: Boolean,
      },
    ],
  },
  { collection: 'user' },
);

export default mongoose.model('user', userSchema);
