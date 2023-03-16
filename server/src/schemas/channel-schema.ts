import mongoose, { Schema } from 'mongoose';

export const channelSchema = new mongoose.Schema(
  {
    channel_name: {
      type: String,
      minLength: 3,
      maxLength: 20,
      required: true,
      unique: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user',
      },
    ],
  },
  { collection: 'channel' },
);

export default mongoose.model('channel', channelSchema);
