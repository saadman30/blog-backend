import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// routes import
import userRouter from "./routes/user.routes.js";
import { ApiError } from "./utils/ApiError.js";
import { ApiResponse } from "./utils/ApiResponse.js";
import { HTTP_STATUS } from "./constants.js";

// routes declarartion
app.use("/api/v1/users", userRouter);

//Common error response middleware
app.use((err, req, res, next) => {
  // Check if the error is an instance of ApiError
  if (err instanceof ApiError) {
    return res
      .status(err.statusCode)
      .json(new ApiResponse(err.statusCode, null, err.message));
  }

  // Handle other types of errors
  return res
    .status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code)
    .json(
      new ApiResponse(
        HTTP_STATUS.INTERNAL_SERVER_ERROR.code,
        err,
        "Internal server error"
      )
    );
});

export { app };
