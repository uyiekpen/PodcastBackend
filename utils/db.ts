import mongoose from "mongoose";

const url = "mongodb://127.0.0.1/PodcastDb";

mongoose
  .connect(url)
  .then(() => {
    console.log(`connected`);
  })
  .catch((err) => {
    console.log(err.message);
  });
