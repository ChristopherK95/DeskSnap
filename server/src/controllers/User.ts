import { NextFunction, Request, Response } from 'express';
import userSchema from '../schemas/user-schema';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  const newUser = new userSchema({
    username,
    password,
  });

  try {
    const response = await newUser.save();
    return res.status(201).json({ response });
  } catch (err) {
    return res.status(500).json(err);
  }
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
  try {
    const response = await userSchema.findByIdAndUpdate(req.body.id, {
      username: req.body.username,
      password: req.body.password,
    });
    if (response != null) {
      return res.status(201).json({ response });
    } else {
      return res.status(404).json({ message: 'Not found' });
    }
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

export default { createUser, getUser, getUsers, updateUser, deleteUser };
