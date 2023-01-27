import { NextFunction, Request, Response } from 'express';
import userSchema from '../schemas/user-schema';
import bcrypt from 'bcrypt';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  const cryptedPassword = bcrypt.hashSync(password, 10);

  const newUser = new userSchema({
    username,
    password: cryptedPassword,
    channels: [],
  });

  newUser.save((err, doc) => {
    if (err?.message.split(' ', 2)[0] === 'E11000') {
      return res.status(500).json({ message: 'Duplicate username' });
    } else {
      return res.status(201).json(doc);
    }
  });
};

const getUser = async (req: Request, res: Response) => {
  const { user_id } = req.body;

  const user = await userSchema.findById(user_id);
  console.log(user);
  if (user) {
    return res.status(200).json({ user });
  } else {
    return res.status(404).json({ message: 'User not found' });
  }
};

const getUsers = async (req: Request, res: Response) => {
  const users = await userSchema.find();
  if (users.length > 0) {
    return res.status(200).json(users);
  } else {
    return res.status(500).json({ message: 'No users found' });
  }
};

const getChannels = async (req: Request, res: Response) => {
  const { user_id } = req.body;
  const result = await userSchema
    .findById(user_id, { channels: 1, _id: 0 })
    .populate({ path: 'channels', select: 'channel_name' })
    .exec();
  console.log(result?.channels);
  return res.json(result?.channels);
};

const updateUser = async (req: Request, res: Response) => {
  const { user_id, username, password } = req.body;

  const user = await userSchema.findById(user_id).exec();
  if (!user) return res.status(404).json({ message: 'User not found' });
  if (!bcrypt.compareSync(password, user.password)) {
    user.password = password;
  }
  if (username !== user.username) {
    user.username = username;
  }
  try {
    const response = await user.save();
    return res.json(response);
  } catch (err) {
    return res.status(500).json({ err });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const { user_id } = req.body;
  try {
    const response = await userSchema.findByIdAndDelete(user_id);
    if (response != null) {
      return res.json(response);
    } else return res.json({ message: 'User not found' });
  } catch (err) {
    console.log('error');
    return res.json(err);
  }
};

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await userSchema
      .findOne({ username: username.toLowerCase() })
      .exec();
    if (!user) {
      return res.json({ message: 'No user with that username', login: false });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return res
        .status(401)
        .json({ message: 'Invalid password', login: false });
    }
    res.json({
      message: 'The username and password combination are correct!',
      login: true,
      user_id: user.id,
      username: user.username,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const addChannelConnection = async (
  channel_id: string,
  user_id: string
) => {
  const response = await userSchema.findByIdAndUpdate(user_id, {
    $push: { channels: channel_id },
  });
  return response;
};

export default {
  createUser,
  getUser,
  getUsers,
  getChannels,
  updateUser,
  deleteUser,
  login,
};
