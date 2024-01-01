import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/oauth.routes.js';
import listingRouter from './routes/listing.routes.js';
import cookieParser from 'cookie-parser';
import path from 'path';
dotenv.config();

mongoose
  .connect(process.env.MONGOOSE)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log(err);
  });

  const __dirname = path.resolve();

const app = express();

app.use(express.json());

app.use(cookieParser());

app.listen(5000, () => {
  console.log('Server is running on port 5000!');
});

app.use('/api/user', userRouter);
app.use('/api/oauth', authRouter);
app.use('/api/listing', listingRouter);


app.use(express.static(path.join(__dirname, '/client-side/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client-side', 'dist', 'index.html'));
})

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

