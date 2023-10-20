import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";
import oauthRouter from "./routes/oauth.routes.js";
dotenv.config();

mongoose
  .connect(process.env.MONGOOSE)
  .then(() => {
    console.log("connected to Mongodb");
  })
  .catch((err) => {
    console.log(err);
  });
const app = express();

app.use(express.json());

app.listen(5000, () => {
  console.log("server is running on port 5000");
});

app.use("/api/user", userRouter);
app.use("/api/oauth", oauthRouter);

//middleware 
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  // Log the error for debugging purposes
  console.error(err);

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

