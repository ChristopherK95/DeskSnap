import { format } from 'util';
import { Request, Response, NextFunction } from 'express';
import { Storage, GetSignedUrlConfig } from '@google-cloud/storage';
import { config } from 'dotenv';
import { nanoid } from 'nanoid';

config();

const storage = new Storage({
  keyFilename: `${__dirname}/../google-storage.json`,
});

const bucket = storage.bucket(process.env.BUCKET_ID);

const uploadFile = (req: Request, res: Response, next: NextFunction) => {
  if (!req.file) {
    res.status(400).json({ message: 'No file uploaded.' });
    return;
  }

  const fileName =
    req.body.userId +
    new Date()
      .toLocaleDateString('en-se', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
      .replace(', ', '_')
      .replaceAll(':', '-');

  const blob = bucket.file(fileName);
  const blobStream = blob.createWriteStream();

  blobStream.on('error', (err) => next(err));

  blobStream.on('finish', () => {
    const publicUrl = format(
      `https://storage.googleapis.com${bucket.name}/${blob.name}`,
    );
    res.status(200).send(publicUrl);
  });

  blobStream.end(req.file.buffer);
};

const deleteFile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await bucket.file(req.body.fileName).delete();
    res.status(200).json({ response });
  } catch (err) {
    res.status(500).json({ err });
  }
};

export const getSignedUrl = async (fileName: string) => {
  const options: GetSignedUrlConfig = {
    version: 'v4',
    action: 'read',
    expires: Date.now() + 1 * 60 * 1000,
  };

  try {
    const url = await bucket.file(fileName).getSignedUrl(options);
    return url;
  } catch (err) {
    return err;
  }
};

export default { uploadFile, deleteFile, getSignedUrl };
