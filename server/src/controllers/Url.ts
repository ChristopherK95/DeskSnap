import { Request, Response } from 'express';
import urlSchema from '../schemas/url-schema';
import { getSignedUrl } from './Storage';

interface Url {
  url: string;
  channel_id: string;
  date: Date;
  seen: string;
}

const createUrl = async (req: Request, res: Response) => {
  const { channel_id, file_name, date, seen } = req.body;

  const newUrl = new urlSchema({
    channel_id,
    file_name,
    date,
    seen,
  });

  const response = await newUrl.save();
  if (response != null) {
    return res.status(201).json({ message: 'Object created', response });
  } else {
    return res.status(500).json({ message: 'Object could not be created' });
  }
};

const getUrlsNotSeen = async (req: Request, res: Response) => {
  const { channel_id, user_id } = req.body;
  const regex = new RegExp(`${user_id}`);

  const url = await urlSchema
    .find<{ file_name: string }>(
      { channel_id, seen: { $not: regex } },
      'file_name',
    )
    .sort('date')
    .exec();
  if (url.length > 0) {
    const signedUrl = await getSignedUrl(url[0].file_name);
    return res.status(200).json({ url, signedUrl });
  } else return res.status(404).json({ message: 'File not found' });
};

const getUrlsByChannelId = async (req: Request, res: Response) => {
  const channel_id = req.body.channel_id;

  const url = await urlSchema.find({ channel_id }).exec();
  if (url.length > 0) {
    return res.status(200).json({ url });
  } else {
    return res.status(500).json({ message: 'Channel not found' });
  }
};

const nextVideo = async (req: Request, res: Response) => {
  const { nextFile, prevFile, user_id, channel_id } = req.body;

  await urlSchema
    .findOneAndUpdate(
      { file_name: prevFile, channel_id },
      { $push: { seen: user_id } },
      { returnOriginal: false },
    )
    .exec();
  if (nextFile) {
    const signedUrl = getSignedUrl(nextFile);
    return res.json(signedUrl);
  } else return res.status(404).json({ message: 'Not found' });
};

const removeUrl = async (req: Request, res: Response) => {
  const { file_name } = req.body;

  const response: { acknowledged: boolean; deletedCount: number } =
    await urlSchema.deleteOne({ file_name });
  if (response.deletedCount > 0) {
    return res.json({ response });
  } else {
    return res.status(404).json({ message: 'Object not found' });
  }
};

export default {
  createUrl,
  getUrlsNotSeen,
  getUrlsByChannelId,
  nextVideo,
  removeUrl,
};
