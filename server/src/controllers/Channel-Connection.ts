import { Request, Response } from 'express';
import channelConnectionSchema from '../schemas/channel-connection-schema';

const getConnections = async (req: Request, res: Response) => {
  const connections = await channelConnectionSchema.find();
  if (connections.length > 0) {
    return res.json({ connections });
  } else return res.status(404).json({ message: 'No connection found' });
};

const getConnectionsByUserId = async (req: Request, res: Response) => {
  const user_id = req.body.user_id;

  const connection = await channelConnectionSchema.findById(user_id);
  if (connection != null) {
    return res.json({ connection });
  } else return res.status(404).json({ message: 'No connections not found' });
};

const getConnectionsByChannelId = async (req: Request, res: Response) => {
  const channel_id = req.body.channel_id;

  const connection = await channelConnectionSchema.findById(channel_id);
  if (connection != null) {
    return res.json({ connection });
  } else return res.status(404).json({ message: 'No connections not found' });
};

const removeConnectionByUserId = async (req: Request, res: Response) => {
  const { user_id } = req.body;

  const response = await channelConnectionSchema.findByIdAndRemove(user_id);
  if (response != null) {
    return res.json(response);
  } else return res.status(404).json({ message: 'Connection not found' });
};

const removeConnectionByChannelId = async (req: Request, res: Response) => {
  const { channel_id } = req.body;

  const response = await channelConnectionSchema.findByIdAndRemove(channel_id);
  if (response != null) {
    return res.json(response);
  } else return res.status(404).json({ message: 'Connection not found' });
};

export const createConnection = async (params: {
  user_id: string;
  channel_id: string;
}) => {
  const newConnection = new channelConnectionSchema(params);

  try {
    const response = await newConnection.save();
    return response;
  } catch (err) {
    return err;
  }
};

export default {
  getConnections,
  getConnectionsByUserId,
  getConnectionsByChannelId,
  removeConnectionByUserId,
  removeConnectionByChannelId,
};
