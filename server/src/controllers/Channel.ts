import { Request, Response } from 'express';
import channelSchema from '../schemas/channel-schema';
import { inviteAccepted } from './User';

const createChannel = async (req: Request, res: Response) => {
  const { channel_name, user_id } = req.body;
  const newChannel = new channelSchema({
    channel_name,
    users: [user_id],
    owner: user_id,
  });
  try {
    const response = await newChannel.save();
    return res.json({ response });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const removeChannel = async (req: Request, res: Response) => {
  const { user_id, channel_id } = req.body;

  const channel = await channelSchema.findById(channel_id);
  let response;
  if (channel?.owner._id.toString() === user_id) {
    response = channel?.remove();
  }
  if (channel && channel?.owner._id.toString() !== user_id) {
    const users = channel?.users.filter(
      (user) => user._id.toString() !== user_id,
    );
    channel.users = users;
    response = channel.save();
  }
  if (response) {
    return res.status(200).json(response);
  } else {
    return res.status(500).json({ message: 'Channel not found' });
  }
};

const getChannelsByUserId = async (req: Request, res: Response) => {
  try {
    const channels = await channelSchema
      .find({ users: req.body.user_id }, 'id channel_name')
      .exec();
    return res.json(channels);
  } catch (err) {
    return res.json([]);
  }
};

const getUsers = async (req: Request, res: Response) => {
  const { channel_id } = req.body;
  const users = await channelSchema.findById(channel_id, 'users').exec();
  return res.json(users);
};

const getChannelsOverview = async (req: Request, res: Response) => {
  try {
    const channels = await channelSchema
      .find({
        users: req.body.user_id,
      })
      .populate({ path: 'users', select: ['id', 'username'] })
      .populate({ path: 'owner', select: ['id', 'username'] })
      .exec();
    return res.json(channels);
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

const acceptInvite = async (req: Request, res: Response) => {
  const { user_id, channel_id } = req.body;
  const response = await channelSchema.findByIdAndUpdate(channel_id, {
    $push: { users: user_id },
  });
  inviteAccepted(user_id, channel_id);
  if (res.statusCode === 200) {
    return res.json('success');
  }
  return res.json(response);
};

const removeUser = async (req: Request, res: Response) => {
  const { user_id, channel_id } = req.body;
  const response = await channelSchema.findByIdAndUpdate(channel_id, {
    $pull: { users: user_id },
  });
  return res.json(response);
};

export const checkUsersExist = async (channel_id: string, users: string[]) => {
  const existingUsers = await channelSchema.findById({
    _id: channel_id,
  });
  const arr = existingUsers?.users.filter((user) =>
    users.includes(user.toString()),
  );
  console.log('array: ' + arr);
  console.log('array map: ' + arr?.map((user) => user.toString()));
  return arr?.map((user) => user.toString());
};

export default {
  createChannel,
  removeChannel,
  getChannelsByUserId,
  getUsers,
  getChannelName,
  getChannelsOverview,
  acceptInvite,
  removeUser,
};
