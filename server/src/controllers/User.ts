import { Request, Response } from 'express';
import userSchema from '../schemas/user-schema';
import bcrypt from 'bcrypt';

const createUser = async (req: Request, res: Response) => {
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
    req.session.user = {
      id: user.id,
      username: user.username,
      password: user.password,
    };
    req.session.isLoggedIn = true;
    req.session.save();
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

const logout = async (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) return res.json('No active session');
    res.clearCookie('connect.sid');
    return res.json(`User logged out`);
  });
};

const checkSession = async (req: Request, res: Response) => {
  if (req.session.isLoggedIn) {
    return res.json({
      isLoggedIn: true,
      user: { id: req.session.user?.id, username: req.session.user?.username },
    });
  }
  return res.json({
    isLoggedIn: false,
    user: { id: undefined, username: undefined },
  });
};

const invite = async (req: Request, res: Response) => {
  const { usernames, channel_id, sender } = req.body;
  const invite = { channel_id, sender };

  try {
    const result = await userSchema.updateMany(
      {
        username: { $in: usernames },
        channels: { $ne: channel_id },
        'invites.channel_id': { $ne: channel_id },
      },
      {
        $push: { invites: invite },
      },
    );
    if (result.modifiedCount === 0) {
      return res.json(
        'The users are in the channel or already have an invite pending for this channel.',
      );
    }
    if (result.modifiedCount < usernames.length) {
      return res.json(
        `${
          usernames.length - result.modifiedCount
        } users are in the channel or already have an invite pending for this channel.`,
      );
    }
    return res.json(`${usernames} have been sent invites to the channel.`);
  } catch (err) {
    return res.json(err);
  }
};

export const addChannelConnection = async (
  channel_id: string,
  user_id: string,
) => {
  const response = await userSchema.findByIdAndUpdate(user_id, {
    $push: { channels: channel_id },
  });
  return response;
};

export const removeChannelConnection = async (
  user_id: string,
  channel_id: string,
) => {
  const response = await userSchema.findByIdAndUpdate(user_id, {
    $pull: { channels: channel_id },
  });
  return response;
};

export default {
  createUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  login,
  logout,
  checkSession,
  invite,
};
