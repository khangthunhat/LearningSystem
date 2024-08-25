import express from "express";
import { registrationUser, activateUser } from "../src/controllers/user.controller";
import { isAutheticated, authorizeRoles } from "../src/middleware/auth";

const userRouter = express.Router();

userRouter.post("/registration", registrationUser);

userRouter.post("/activate-user", activateUser);

export default userRouter;