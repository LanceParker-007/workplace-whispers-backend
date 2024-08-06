import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import config from "./config.js";

const app = express();
const corsOptions = {
  origin: config.CORS_ORIGIN,
  credentials: true,
};

// middleware to handle cors
app.use(cors(corsOptions));

// middleware to handle diff types of requests
app.use(express.json()); // Parses incoming request with JSON payload (it cannot parse files, need multer for that)
app.use(express.urlencoded({ extended: true })); // Parses incming requests with URL-encoded payloads
app.use(cookieParser()); // Parses cookies attached to the client request

//
app.get("/", (req, res) => {
  res.send("Server is up and running");
});

// import routes
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import postsRouter from "./routes/posts.routes.js";

// routes middleware
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/posts", postsRouter);

// Global error handling middleware
// to handle error between request and response cycles
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

export default app;
