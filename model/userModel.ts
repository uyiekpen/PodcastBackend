import mongoose from "mongoose";

type newUser = {
  username: string;
  fullname: string;
  email: string;
  password: string;
  avatar: string;
  avatarID: string;
  verified: boolean;
  token: string;
  _doc: {}[];
  podcast: {}[];
};

interface newUserData extends newUser, mongoose.Document {}

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    fullname: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    avatar: {
      type: String,
    },
    avatarID: {
      type: String,
    },
    verified: {
      type: Boolean,
    },

    token: {
      type: String,
    },
    podcast: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "podcasts",
        },
      ],
    },
  },

  { timestamps: true }
);

export default mongoose.model<newUserData>("users", userSchema);
