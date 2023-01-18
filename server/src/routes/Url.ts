import urlController from '../controllers/Url';
import express from 'express';

const router = express.Router();

router.post('/createUrl', urlController.createUrl);
router.post('/getUrlsNotSeen', urlController.getUrlsNotSeen);
router.post('/getUrlsByChannelId', urlController.getUrlsByChannelId);
router.post('/getNextUrl', urlController.nextVideo);
router.delete('/removeUrl', urlController.removeUrl);

export = router;
