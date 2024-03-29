import { Request, Response } from 'express';
import { Types } from 'mongoose';
import channelSchema from '../schemas/channel-schema';
import { inviteAccepted } from './User';

const createChannel = async (req: Request, res: Response) => {
  const { channel_name, user_id } = req.body;
  const newChannel = new channelSchema({
    channel_name,
    users: [user_id],
    owner: user_id,
  });

  newChannel.save((err, doc) => {
    if (err) {
      return res.status(500).json(err.message);
    }
    return res.json(doc);
  });
};

const removeChannel = async (req: Request, res: Response) => {
  const { user_id, channel_id } = req.body;

  const channel = await channelSchema.findById(channel_id);
  let response;
  if (channel?.owner.toString() === user_id) {
    response = channel?.remove();
  }
  if (channel && channel?.owner.toString() !== user_id) {
    const users = channel?.users.filter((user) => user.toString() !== user_id);
    channel.users = users;
    response = channel.save();
  }
  if (response) {
    return res.status(200).json(response);
  } else {
    return res.status(500).json({ message: 'Channel not found' });
  }
};

const updateChannelName = async (req: Request, res: Response) => {
  const { channel_id, channel_name } = req.body;

  try {
    await channelSchema.findByIdAndUpdate(
      channel_id,
      { channel_name: channel_name },
      {
        returnOriginal: false,
      },
    );
    return res.json('Success');
  } catch (err) {
    return res.status(500).json(err);
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
  return arr?.map((user) => user.toString());
};

export const getUserAmount = async (channel_id: string) => {
  const users = await channelSchema
    .findById<Types.ObjectId[]>(channel_id)
    .select({ users: 1, _id: 0 });
  return users?.length;
};

export default {
  createChannel,
  removeChannel,
  updateChannelName,
  getChannelsByUserId,
  getUsers,
  getChannelName,
  getChannelsOverview,
  acceptInvite,
  removeUser,
};
