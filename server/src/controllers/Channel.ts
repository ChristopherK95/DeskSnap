import { NextFunction, Request, Response } from 'express';
import { Schema } from 'mongoose';
import channelSchema from '../schemas/channel-schema';
import { addChannelConnection } from './User';

const createChannel = async (req: Request, res: Response) => {
  const { channel_name, user_id } = req.body;
  const newChannel = new channelSchema({
    channel_name,
    users: [user_id],
  });
  try {
    const response = await newChannel.save();
    const refResp = await addChannelConnection(response.id, user_id);
    return res.json({ response, refResp });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const removeChannel = async (req: Request, res: Response) => {
  const { channel_id } = req.body;

  const response = await channelSchema.findByIdAndRemove(channel_id);
  if (response) {
    return res.json(response);
  } else {
    return res.status(500).json({ message: 'Channel not found' });
  }
};

const getUsers = async (req: Request, res: Response) => {
  const { channel_id } = req.body;
  const users = await channelSchema.findById(channel_id, 'users').exec();
  return users;
};

const getChannelsOverview = async (req: Request, res: Response) => {
  try {
    const channels = await channelSchema.find({});
    return res.json();
  } catch (err) {
    return res.json();
  }
};

const getChannelName = async (req: Request, res: Response) => {
  const { channel_id } = req.body;

  const channel_name = await channelSchema.findById(channel_id, {
    channel_name: 1,
    _id: 0,
  });

  if (channel_name != null) {
    return res.status(200).json(channel_name);
  } else return res.status(404).json({ message: 'Channel not found' });
};

export default {
  createChannel,
  removeChannel,
  getUsers,
  getChannelName,
};
