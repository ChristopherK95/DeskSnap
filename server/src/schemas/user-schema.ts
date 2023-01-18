import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      minLength: [3, 'Must be at least 3 characters.'],
      maxLength: [20, 'Can be at most 20 characters.'],
      required: true,
      validate: {
        validator: function (v: string) {
          return /^[\w\-]{3,20}[^-_]$/.test(v);
        },
        message: 'Username is not valid',
      },
    },
    password: {
      type: String,
      minLength: 4,
      required: true,
    },
  },
  { collection: 'user' }
);

export default mongoose.model('User', userSchema);
