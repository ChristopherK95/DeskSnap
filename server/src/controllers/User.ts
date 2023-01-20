import { NextFunction, Request, Response } from 'express';
import userSchema from '../schemas/user-schema';
import bcrypt from 'bcrypt';
import { MongoServerError } from 'mongodb';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  const cryptedPassword = bcrypt.hashSync(password, 10);

  const newUser = new userSchema({
    username,
    password: cryptedPassword,
  });

  newUser.save((err, doc) => {
    if (err?.message.split(' ', 2)[0] === 'E11000') {
      return res.status(500).json({ message: 'Duplicate username' });
    } else {
      return res.status(201).json(doc);
    }
  });
};

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  const { user_id } = req.body;

  const user = await userSchema.findById(user_id);
  console.log(user);
  if (user) {
    return res.status(200).json({ user });
  } else {
    return res.status(404).json({ message: 'User not found' });
  }
};

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  const users = await userSchema.find();
  if (users.length > 0) {
    return res.status(200).json({ users });
  } else {
    return res.status(500).json({ message: 'No users found' });
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
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

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const { user_id } = req.body;
  await userSchema.findByIdAndDelete(user_id, (err: Error, docs: any) => {
    if (err) {
      return res.status(500).json({ err });
    } else {
      return res.status(201).json({ docs });
    }
  });
};

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await userSchema.findOne({ username }).exec();
    if (!user) {
      return res.status(400).json({ message: 'No user with that username' });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({ message: 'The password is invalid' });
    }
    res.json({ message: 'The username and password combination are correct!' });
  } catch (err) {
    res.status(500).json(err);
  }
};

export default { createUser, getUser, getUsers, updateUser, deleteUser, login };
