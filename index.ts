import express, { Application, Express } from "express";
require("./utils/db");
require("dotenv").config();
import cors from "cors";
import userRoute from "./router/userRouter";

const port: number = 2109;

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use("/api", userRoute);

app.listen(port, () => {
  console.log(`Server is listening to Post ${port}`);
});
