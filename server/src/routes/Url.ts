import urlController from '../controllers/Url';
import express from 'express';
import Multer from 'multer';

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 25 * 1024 * 1024,
  },
});

const router = express.Router();

router.post('/createUrl', multer.array('files', 10), urlController.createUrl);
router.post('/getUrlsNotSeen', urlController.getUrlsNotSeen);
router.post('/getUrlsByChannelId', urlController.getUrlsByChannelId);
router.post('/getNextUrl', urlController.nextVideo);
router.delete('/removeUrl', urlController.removeUrl);

export = router;
