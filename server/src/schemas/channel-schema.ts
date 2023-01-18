import mongoose from 'mongoose';

export const channelSchema = new mongoose.Schema(
  {
    channel_name: {
      type: String,
      minLength: 3,
      maxLength: 20,
      required: true,
    },
  },
  { collection: 'channel' }
);

export default mongoose.model('channel', channelSchema);
