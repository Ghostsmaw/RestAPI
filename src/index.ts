import express, { Router } from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import router from "./router";
const dotenv = require("dotenv").config();

const app = express();
const port = 8080;
const MONGO_URL = process.env.MONGO_URL;

app.use(
  cors({
    credentials: true
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use("/", router());

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (error: Error) => {
  console.log("Error connecting with the database");
});
