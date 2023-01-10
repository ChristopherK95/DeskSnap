import { format } from "util";
import { Request, Response, NextFunction } from "express";
import { Storage } from "@google-cloud/storage";
import { config } from "dotenv";
import fs from "fs";

config();

const storage = new Storage({
  keyFilename: `${__dirname}/../google-storage.json`,
});

const bucket = storage.bucket(process.env.BUCKET_ID);

const uploadFile = (req: Request, res: Response, next: NextFunction) => {
  if (!req.file) {
    res.status(400).json({ message: "No file uploaded." });
    return;
  }

  const blob = bucket.file(req.file.originalname);
  const blobStream = blob.createWriteStream();

  blobStream.on("error", (err) => next(err));

  blobStream.on("finish", () => {
    const publicUrl = format(
      `https://storage.googleapis.com${bucket.name}/${blob.name}`
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

const downloadFile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("download");
  try {
    //not sure where to put downloaded file, download params can set file dest i think
    console.log(req.body.fileName);
    const file = await bucket.file(req.body.fileName).download();
    console.log(file);
    res.status(200).json(file[0]);
  } catch (err) {
    res.status(500).json({ err });
  }
};

export default { uploadFile, deleteFile, downloadFile };
