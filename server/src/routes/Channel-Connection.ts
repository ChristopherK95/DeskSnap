import express from 'express';
import channelConnectionController from '../controllers/Channel-Connection';

const router = express.Router();

router.get('/getConnections', channelConnectionController.getConnections);
router.post(
  '/getConnectionsByUserId',
  channelConnectionController.getConnectionsByUserId
);
router.post(
  '/getConnectionsByChannelId',
  channelConnectionController.getConnectionsByChannelId
);
router.post(
  '/removeConnectionByUserId',
  channelConnectionController.removeConnectionByUserId
);
router.post(
  '/removeConnectionByChannelId',
  channelConnectionController.removeConnectionByUserId
);

export = router;
