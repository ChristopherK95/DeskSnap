import express from "express";
import Multer from "multer";
import storageController from "../controllers/Storage";

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

const router = express.Router();

router.post("/uploadFile", multer.single("file"), storageController.uploadFile);
router.delete("/deleteFile", storageController.deleteFile);
router.post("/downloadFile", storageController.downloadFile);

export = router;
