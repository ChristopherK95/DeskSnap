import mongoose, { Types } from 'mongoose';

export const channelSchema = new mongoose.Schema(
  {
    channel_name: {
      type: String,
      minLength: 3,
      maxLength: 20,
      required: true,
    },
    owner: {
      type: Types.ObjectId,
      required: true,
      ref: 'user',
    },
    users: [
      {
        type: Types.ObjectId,
        required: true,
        ref: 'user',
      },
    ],
  },
  { collection: 'channel' },
);

export default mongoose.model('channel', channelSchema);
