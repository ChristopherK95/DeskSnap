import mongoose from 'mongoose';

export interface Url {
  channel_id: string;
  file_name: string;
  date: Date;
  seen: mongoose.Types.Array<string>;
}

export const urlSchema = new mongoose.Schema<Url>(
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
      type: [String],
      required: true,
    },
  },
  { collection: 'url' },
);

export default mongoose.model('url', urlSchema);
