import express from 'express';
import channelController from '../controllers/Channel';

const router = express.Router();

router.post('/createChannel', channelController.createChannel);
router.delete('/removeChannel', channelController.removeChannel);
router.post('/getChannelName', channelController.getChannelName);
router.get('/getChannelsByUserId', channelController.getUsers);

export = router;
