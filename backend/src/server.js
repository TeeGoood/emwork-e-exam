import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes.js";

mongoose.connect(
  "mongodb+srv://tee:Rh5MV5xkXSYtpivU@emwwork.tq1n3ez.mongodb.net/emwwork?retryWrites=true&w=majority&appName=project"
);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/", router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
