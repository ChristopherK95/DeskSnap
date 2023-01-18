import express from 'express';
import channelController from '../controllers/Channel';

const router = express.Router();

router.post('/createChannel', channelController.createChannel);
router.post('/removeChannel', channelController.removeChannel);
router.post('/getChannelName', channelController.getChannelName);
router.get('/getChannels', channelController.getChannels);

export = router;
