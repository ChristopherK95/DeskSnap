import { format } from 'util';
import { Request, Response, NextFunction } from 'express';
import { Storage, GetSignedUrlConfig, File } from '@google-cloud/storage';
import { config } from 'dotenv';
config();

const storage = new Storage({
  keyFilename: `${__dirname}/../google-storage.json`,
});

const bucket = storage.bucket(process.env.BUCKET_ID);

export const uploadFile = (req: Request, res: Response, next: NextFunction) => {
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

export const uploadFiles = async (files: Express.Multer.File[]) => {
  const arr: Promise<string>[] = [];
  if (Array.isArray(files))
    files.forEach((file) => {
      arr.push(
        new Promise((resolve, reject) => {
          const blob = bucket.file(file.originalname);

          const blobStream = blob.createWriteStream({
            resumable: false,
          });

          blobStream.on('error', (err) => {
            reject(err);
          });

          blobStream.on('finish', async () => {
            const publicUrl = format(
              `https://storage.googleapus.com/${bucket.name}/${blob.name}`,
            );
            resolve(publicUrl);
          });

          blobStream.end(file.buffer);
        }),
      );
    });
  const result = await Promise.all(arr);
  return result;
};

export const deleteFile = async (filename: string) => {
  try {
    const response = await bucket.file(filename).delete();
    return { success: true, message: response };
  } catch (err) {
    return { success: false, message: err };
  }
};

export const getSignedUrl = async (fileName: string) => {
  const options: GetSignedUrlConfig = {
    version: 'v4',
    action: 'read',
    expires: Date.now() + 10 * 60 * 1000,
  };

  try {
    const url = await bucket.file(fileName).getSignedUrl(options);
    return url;
  } catch (err) {
    return err;
  }
};

export default { uploadFile, uploadFiles, deleteFile, getSignedUrl };
