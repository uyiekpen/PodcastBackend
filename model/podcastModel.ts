import mongoose, { Mongoose } from "mongoose";

type newpodcast = {
  NameOfPodcast: string;
  Image: string;
  details: string;
};

interface newpodcastData extends newpodcast, mongoose.Document {}

const PodcastSchema = new mongoose.Schema(
  {
    NameOfPodcast: {
      type: String,
    },
    details: {
      type: String,
    },
    Image: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },

  { timestamps: true }
);

export default mongoose.model<newpodcastData>("podcasts", PodcastSchema);
