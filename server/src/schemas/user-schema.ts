import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minLength: 3,
    maxLength: 20,
    required: true,
  },
  password: {
    type: String,
    minLength: 4,
    required: true,
  },
});

export default mongoose.model('User', userSchema);
