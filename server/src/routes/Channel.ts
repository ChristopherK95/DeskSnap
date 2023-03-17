import express from 'express';
import channelController from '../controllers/Channel';

const router = express.Router();

router.post('/createChannel', channelController.createChannel);
router.post('/removeChannel', channelController.removeChannel);
router.post('/updateChannelName', channelController.updateChannelName);
router.post('/getChannelName', channelController.getChannelName);
router.post('/getChannels', channelController.getChannelsByUserId);
router.post('/getUsers', channelController.getUsers);
router.post('/getChannelsOverview', channelController.getChannelsOverview);
router.post('/acceptInvite', channelController.acceptInvite);
router.post('/removeUser', channelController.removeUser);

export = router;
