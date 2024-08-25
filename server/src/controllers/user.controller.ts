"use strict";

import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import userModel, { IUser } from "../models/user.model";
import jwt from "jsonwebtoken";
import ejs from "ejs";
import path from "path";
import sendMail from "../utils/sendEmail";
import { config } from "dotenv";

config();

const ACTIVATION_TOKEN_EXPIRY = "5m";
const ACTIVATION_CODE_LENGTH = 4;

interface IRegistrationBody {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

interface IActivationToken {
  token: string;
  activationCode: string;
}

interface IActivationRequest {
  activation_token: string;
  activation_code: string;
}

/**
 * Creates an activation token for a user.
 *
 * @param {IRegistrationBody} user - The user to create the activation token for.
 * @return {IActivationToken} An object containing the activation token and code.
 */
const createActivationToken = (user: IRegistrationBody): IActivationToken => {
  const activationCode = Math.floor(
    Math.random() * 10 ** ACTIVATION_CODE_LENGTH
  )
    .toString()
    .padStart(ACTIVATION_CODE_LENGTH, "0");
  const token = jwt.sign(
    { user, activationCode },
    process.env.ACTIVATION_SECRET as string,
    { expiresIn: ACTIVATION_TOKEN_EXPIRY }
  );
  return { token, activationCode };
};

const sendActivationEmail = async (
  user: IRegistrationBody,
  activationCode: string
): Promise<void> => {
  const data = { user: { name: user.name }, activationCode };
  const html = await ejs.renderFile(
    path.join(__dirname, "../mails/activation-mail.ejs"),
    data
  );
  await sendMail({
    email: user.email,
    subject: "Activate Your Account",
    template: "activation-mail.ejs",
    data,
  });
};

export const registrationUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body as IRegistrationBody;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return next(new ErrorHandler("Email already exists", 400));
    }

    const user: IRegistrationBody = { name, email, password };
    const { token, activationCode } = createActivationToken(user);

    try {
      await sendActivationEmail(user, activationCode);
      res.status(201).json({
        success: true,
        message: `Please check your email: ${email} to activate your account!`,
        activationToken: token,
      });
    } catch (error: any) {
      next(
        new ErrorHandler(
          `Failed to send activation email: ${error.message}`,
          500
        )
      );
    }
  }
);

export const activateUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { activation_token, activation_code } =
      req.body as IActivationRequest;

    try {
      const decoded = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET as string
      ) as { user: IUser; activationCode: string };

      if (decoded.activationCode !== activation_code) {
        return next(new ErrorHandler("Invalid activation code", 400));
      }

      const { name, email, password } = decoded.user;

      const user = await userModel.findOneAndUpdate(
        { email },
        { name, email, password },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      res.status(201).json({ success: true, user });
    } catch (error: any) {
      if (error.name === "TokenExpiredError") {
        next(new ErrorHandler("Activation token has expired", 400));
      } else {
        next(new ErrorHandler(`Activation failed: ${error.message}`, 400));
      }
    }
  }
);
