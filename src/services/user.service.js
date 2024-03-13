import { HTTP_STATUS } from "../constants.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      HTTP_STATUS.INTERNAL_SERVER_ERROR.code,
      "Something went wrong while generating referesh and access token"
    );
  }
};

const registerService = async (data) => {
  //take params form requests
  const { email, fullName, password } = data;

  //find if the email already exists in the db
  const isEmailExist = await User.findOne({ email });
  if (isEmailExist) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND.code, "Email already exists");
  }
  //Save user
  const user = await User.create({
    fullName,
    email,
    password,
  });

  if (!user) {
    throw new ApiError(
      HTTP_STATUS.INTERNAL_SERVER_ERROR.code,
      "Error occured during creating user"
    );
  }
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(
      HTTP_STATUS.INTERNAL_SERVER_ERROR.code,
      "Something went wwrong while registering the user"
    );
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  return { createdUser, accessToken, refreshToken };
};

const loginService = async (data) => {
  const { email, password } = data;
  
  const user = await User.findOne({email});
  
  if (!user) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND.code, "Email does not exist");
  }
  const isPasswordCorrect = await user.isPasswordCorrect(password);
  
  if (!isPasswordCorrect) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND.code, "Password is incorrect");
  }
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );
  
  return { accessToken, refreshToken };
};

export { registerService, loginService };
