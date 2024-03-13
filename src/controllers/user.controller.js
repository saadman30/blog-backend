import { HTTP_STATUS } from "../constants.js";
import { loginService, registerService } from "../services/user.service.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const registerController = asyncHandler(async (req, res) => {
  const { createdUser, accessToken, refreshToken } = await registerService(
    req.body
  );

  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(HTTP_STATUS.OK.code)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        HTTP_STATUS.OK.code,
        {
          createdUser,
          accessToken,
          refreshToken,
        },
        "User registered successfully"
      )
    );
});

const loginController = asyncHandler(async (req, res) => {
  const { accessToken, refreshToken } = await loginService(req.body);

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(HTTP_STATUS.OK.code)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        HTTP_STATUS.OK.code,
        {
          accessToken,
          refreshToken,
        },
        "User logged in successfully"
      )
    );
});

export { registerController, loginController };
