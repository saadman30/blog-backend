import { body, validationResult } from "express-validator";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { HTTP_STATUS } from "../../constants.js";

export const registrationValidation = [
  body("email").isEmail().withMessage("Email is invalid"),
  body("fullName").notEmpty().withMessage("fullName is required"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(HTTP_STATUS.NOT_FOUND.code)
        .json(
          new ApiResponse(
            HTTP_STATUS.NOT_FOUND.code,
            errors.array(),
            errors.array()[0].msg
          )
        );
    }
    next();
  },
];
