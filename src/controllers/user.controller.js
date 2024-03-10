import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const registerController = asyncHandler(async (req, res) => {
  const response = ApiResponse.success(200, "Operation successful");
  response.send(res);
});

export { registerController };
