import { Request, Response } from 'express';
import userSchema from '../schemas/user-schema';
import bcrypt from 'bcrypt';
import { checkUsersExist } from './Channel';
import { Schema } from 'mongoose';
import { match } from 'ts-pattern';

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
    }
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(201).json(doc);
  });
};

const getUser = async (req: Request, res: Response) => {
  const { user_id } = req.body;

  const user = await userSchema.findById(user_id);
  if (user) {
    return res.status(200).json({ user });
  }
  return res.status(404).json({ message: 'User not found' });
};

const getUsers = async (req: Request, res: Response) => {
  const users = await userSchema.find();
  if (users.length > 0) {
    return res.status(200).json(users);
  }
  return res.status(500).json({ message: 'No users found' });
};

const changeUsername = async (req: Request, res: Response) => {
  const { user_id, username } = req.body;

  userSchema.findByIdAndUpdate(
    user_id,
    {
      username: username,
    },
    (err, doc) => {
      if (err?.message.split(' ', 2)[0] === 'E11000') {
        return res.status(500).json({ message: 'Duplicate username' });
      }
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(201).json(doc);
    },
  );
};

const changePassword = async (req: Request, res: Response) => {
  const { user_id, password } = req.body;

  const cryptedPassword = bcrypt.hashSync(password, 10);

  userSchema.findByIdAndUpdate(
    user_id,
    {
      password: cryptedPassword,
    },
    (err, doc) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(201).json(doc);
    },
  );
};

const deleteUser = async (req: Request, res: Response) => {
  const { user_id } = req.body;
  try {
    const response = await userSchema.findByIdAndDelete(user_id);
    if (response != null) {
      return res.json(response);
    }
    return res.json({ message: 'User not found' });
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
  const invite = { channel: channel_id, sender, seen: false };

  const users = await userSchema.find({ username: { $in: usernames } });
  let arr: string[] = [];
  if (users.length > 0) arr = users.map((user) => user.id);

  let existList: string[] | undefined;
  if (users.length > 0) {
    existList = await checkUsersExist(channel_id, arr);
  }

  const alreadyIn = users.filter((user) => existList?.includes(user.id));

  try {
    await userSchema.updateMany(
      {
        username: { $in: usernames },
        _id: { $nin: existList },
        'invites.channel': { $ne: channel_id },
      },
      {
        $push: { invites: invite },
      },
    );
    if (alreadyIn.length > 1) {
      return res.json({
        amount: 'none',
        message: `${alreadyIn.map((user, i) =>
          match(i)
            .with(0, () => user.username)
            .with(alreadyIn.length - 1, () => ` ${user.username},`)
            .otherwise(() => ` ${user.username}`),
        )} are already in the channel`,
      });
    }
    if (alreadyIn.length === 1) {
      return res.json({
        amount: 'none',
        message: `${alreadyIn.map(
          (user) => user.username,
        )} is already in the channel`,
      });
    }
    if (usernames.length > 1) {
      return res.json({
        amount: 'all',
        message: 'Invites sent',
      });
    }
    if (usernames.length === 1) {
      return res.json({ amount: 'all', message: 'Invite sent' });
    }
  } catch (err) {
    return res.json(err);
  }
};

const getInvites = async (req: Request, res: Response) => {
  const invites = await userSchema
    .findById(req.body.user_id)
    .populate({
      path: 'invites.channel',
      select: 'channel_name',
    })
    .select('invites.sender invites.channel invites.seen -_id')
    .exec();
  return res.json(invites?.invites);
};

export const inviteAccepted = async (user_id: string, channel_id: string) => {
  await userSchema.findByIdAndUpdate(user_id, {
    $pull: { invites: { channel: channel_id } },
  });
};

const declineInvite = async (req: Request, res: Response) => {
  const response = await userSchema.findByIdAndUpdate(req.body.user_id, {
    $pull: { 'invites.channel': req.body.channel_id },
  });
  return res.json(response);
};

const invitesSeen = async (req: Request, res: Response) => {
  await userSchema.findByIdAndUpdate(req.body.user_id, {
    $set: { 'invites.$[].seen': true },
  });
  return res.json('Invites set as seen');
};

export default {
  createUser,
  getUser,
  getUsers,
  changeUsername,
  changePassword,
  deleteUser,
  login,
  logout,
  checkSession,
  invite,
  getInvites,
  declineInvite,
  invitesSeen,
};
