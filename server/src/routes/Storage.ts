import express from 'express';
import Multer from 'multer';
import storageController from '../controllers/Storage';

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 100 * 1024 * 1024,
  },
});

const router = express.Router();

router.post('/uploadFile', multer.single('file'), storageController.uploadFile);
router.post(
  '/uploadFiles',
  multer.array('files', 10),
  storageController.uploadFiles,
);
router.delete('/deleteFile', storageController.deleteFile);

export = router;
