import { Router } from "express";
import {
  changePasswordController,
  loginController,
  // getCurrentUser,
  // logoutUser,
  registerController,
} from "../controllers/user.controller.js";
import { registrationValidation } from "../middlewares/validators/register.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
// import { upload } from "../middlewares/multer.middleware.js";
// import { verifyJwt } from "../middlewares/auth.middleware.js"
const router = Router();

router.route("/register").post(registrationValidation, registerController);

router.route("/login").post(loginController);

// //secured routes
// router.route("/logout").post(verifyJwt, logoutUser);

router.route("/change-password").post(verifyJwt, changePasswordController);

// router.route("/current-user").post(verifyJwt, getCurrentUser);

export default router;
