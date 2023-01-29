import mongoose from 'mongoose';

export const urlSchema = new mongoose.Schema(
  {
    channel_id: {
      type: String,
      required: true,
    },
    file_name: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    seen: {
      type: Array<string>,
      required: true,
    },
  },
  { collection: 'url' }
);

export default mongoose.model('url', urlSchema);
