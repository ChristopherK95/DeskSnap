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
    return res.status(500).json({ err });
  }
};

const readUser = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;

  try {
    const user = await userSchema.findById(userId);
    if (user) {
      return res.status(200).json({ user });
    } else {
      return res.status(404).json({ message: 'Not found' });
    }
  } catch (err) {
    return res.status(500).json({ err });
  }
};

const readAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userSchema.find();
    return res.status(200).json({ users });
  } catch (err) {
    return res.status(500).json({ err });
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
  const userId = req.params.userId;
  await userSchema.findByIdAndDelete(userId, (err: Error, docs: any) => {
    if (err) {
      return res.status(500).json({ err });
    } else {
      return res.status(201).json({ docs });
    }
  });
};

export default { createUser, readUser, readAllUsers, updateUser, deleteUser };
