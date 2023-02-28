import { Request, Response } from 'express';
import urlSchema, { Url } from '../schemas/url-schema';
import { getSignedUrl, uploadFiles } from './Storage';

const createUrl = async (req: Request, res: Response) => {
  const { channel_id, user_id, date } = req.body;

  if (!req.files) {
    return res.json({ message: 'No files' });
  }

  const urlArray: Url[] = [];
  if (Array.isArray(req.files))
    req.files.forEach((file, index) => {
      file.originalname =
        user_id +
        '_' +
        new Date()
          .toLocaleDateString('en-se', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          })
          .replace(', ', '_')
          .replaceAll(':', '-') +
        '_' +
        index;

      urlArray.push(
        new urlSchema({
          channel_id: channel_id,
          file_name: file.originalname,
          date: date,
          seen: [],
        }),
      );
    });

  const uploadRes = await uploadFiles(req.files as Express.Multer.File[]);

  const response = await urlSchema.insertMany(urlArray);
  if (response != null) {
    return res
      .status(201)
      .json({ message: 'Object created', response, uploadRes });
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
