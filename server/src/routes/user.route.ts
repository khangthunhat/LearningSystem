"use strict";

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
  updateUserRole,
  deleteUser,
  forgetPassword,
  resetPassword
} from "../controllers/user.controller";
import { isAutheticated, authorizeRoles } from "../middleware/auth";

const userRouter = express.Router();

userRouter.post("/registration", registrationUser);

userRouter.post("/activate-user", activateUser);

userRouter.post("/login", loginUser);

userRouter.post("/logout", isAutheticated, logoutUser);

userRouter.get("/refresh", updateAccessToken);

userRouter.get("/me", isAutheticated, getUserInfo);

userRouter.post("/social-auth", socialAuth);

userRouter.put("/update-user-info", isAutheticated, updateUserInfo);

userRouter.put("/update-user-password", isAutheticated, updateUserPassword);

userRouter.put("/update-user-avatar", isAutheticated, updateProfilePicture);

userRouter.get("/get-users", isAutheticated, authorizeRoles("admin"), getAllUsers);

userRouter.put("/update-user", isAutheticated, authorizeRoles("admin"), updateUserRole);

userRouter.delete("/delete-user/:id", isAutheticated, authorizeRoles("admin"), deleteUser);

userRouter.post("/forget-password", forgetPassword);

userRouter.put("/reset-password", resetPassword);

export default userRouter;
