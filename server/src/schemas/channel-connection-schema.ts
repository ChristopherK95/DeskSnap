import mongoose from 'mongoose';

export const channelConnectionSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    channel_id: {
      type: String,
      required: true,
    },
  },
  { collection: 'channel_connection' }
);

export default mongoose.model('channel_connection', channelConnectionSchema);
