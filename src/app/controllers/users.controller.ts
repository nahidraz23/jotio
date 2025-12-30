import express, { Request, Response } from "express";
import { User } from "../models/user.model";
import z from "zod";
import bcrypt from "bcryptjs";

export const userRoutes = express.Router();

const CreateUserZodSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  age: z.number(),
  email: z.string(),
  password: z.string(),
  role: z.string().optional(),
});

userRoutes.get("/", async (req: Request, res: Response) => {
  const user = await User.find();

  res.status(201).json({
    success: true,
    message: "Users found!",
    user,
  });
});

userRoutes.get("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;

  const user = await User.findById(userId);

  res.status(201).json({
    success: true,
    message: "User found successfully!",
    user,
  });
});

userRoutes.post("/create-user", async (req: Request, res: Response) => {
  try {
    //  const zodBody = await CreateUserZodSchema.parseAsync(req.body)
    const body = req.body;

    // const password = bcrypt.hash(req.body.password, "10")

    // const user = await User.create(body);

    const user = new User(body);

    const password = await user.hashPassword(body.password)

    user.password = password;

    await user.save();

    res.status(201).json({
      success: true,
      message: "User created successfully!",
      user,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
      error,
    });
    console.log(error);
  }
});

userRoutes.patch("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const updatedBody = req.body;

  const user = await User.findByIdAndUpdate(userId, updatedBody, { new: true });

  res.status(201).json({
    success: true,
    message: "User updated successfully",
    user,
  });
});

userRoutes.delete("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;

  const deletedUser = await User.findByIdAndDelete(userId);

  res.status(201).json({
    success: true,
    message: "User deleted successfully!",
    deletedUser,
  });
});
