import express from "express";
import {
  registrationUser,
  activateUser,
  loginUser,
  logoutUser,
  updateAccessToken,
  getUserInfo,
  socialAuth,
  updateUserInfo,
  updateProfilePicture,
  updateUserPassword,
  getAllUsers,
} from "../controllers/user.controller";
import { isAutheticated, authorizeRoles } from "../middleware/auth";

const userRouter = express.Router();

userRouter.post("/registration", registrationUser);

userRouter.post("/activate-user", activateUser);

userRouter.post("/login", loginUser);

userRouter.get("/logout", isAutheticated, logoutUser);

userRouter.get("/refresh", updateAccessToken);

userRouter.get("/me", isAutheticated, getUserInfo);

userRouter.post("/social-auth", socialAuth);

userRouter.put("/update-user-info", isAutheticated, updateUserInfo);

userRouter.put("/update-user-password", isAutheticated, updateUserPassword);

userRouter.put("/update-user-avatar", isAutheticated, updateProfilePicture);

userRouter.get("/get-users", isAutheticated, authorizeRoles("admin"), getAllUsers);

export default userRouter;
