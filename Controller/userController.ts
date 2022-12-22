import userModel from "../model/userModel";
import { Request, Response, Router } from "express";
import cloudinary from "../utils/cloudinary";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const getUser = async (req: Request, res: Response) => {
  try {
    const userdata = await userModel.find();
    return res.status(200).json({
      message: "Users data",
      data: userdata,
    });
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

const CreateUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { username, fullname, email, password } = req.body;
    const cloudFile = await cloudinary.uploader.upload(req?.file!.path);
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const userdata = await userModel.create({
      username,
      fullname,
      email,
      password: hashed,
      avatar: cloudFile.secure_url,
      avatarID: cloudFile.public_id,
    });
    return res.status(200).json({
      message: "Users data updated successfully",
      data: userdata,
    });
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

const signinUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;
    const findUser = await userModel.findOne({ email });

    if (findUser) {
      const checkpassword = await bcrypt.compare(password, findUser.password);
      if (checkpassword) {
        const { ...info } = findUser._doc;

        return res.status(200).json({
          message: " welcome back",
          data: info,
        });
      } else {
        return res.status(404).json({ message: `password is incorrect` });
      }
    } else {
      return res.status(404).json({
        message: `user dosent exist`,
      });
    }
  } catch (error) {
    return res.status(404).json({ message: `error ${error}` });
  }
};

const resetPassword = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({ email });
    if (user) {
      if (user.verified && user?.token === "") {
        const token = crypto.randomBytes(5).toString("hex");
        const myToken = jwt.sign({ token }, "ThisisMyPodcast");

        const username = user?.fullname;

        await userModel.findByIdAndUpdate(
          user._id,
          { token: myToken },
          { new: true }
        );

        return res.status(200).json({
          message: "Please check your email to continue",
        });
      } else {
        return res
          .status(404)
          .json({ message: "You do not have enough right to do this!" });
      }
    } else {
      return res.status(404).json({ message: "user can't be found" });
    }
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

export { getUser, CreateUser, signinUser };
