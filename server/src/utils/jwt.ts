require("dotenv").config();
import { Request, Response, NextFunction } from "express";
import { IUser } from "../models/user.model";
import { redis } from "./redis";


interface ITokenOption {
  expires: Date;
  maxAge: number;
  httpOnly: boolean;
  sameSite: "lax" | "strict" | "none" | undefined;
  secure?: boolean;
}

  //parse enviroment variables to interger with fallback values
 const accessTokenExprise = parseInt(
    process.env.ACCESS_TOKEN_EXPRISE || "300",
    10
  );
  const refreshTokenExprise = parseInt(
    process.env.REFRESH_TOKEN_EXPRISE || "1200",
    10
  );

  //options for cookies
export const accessTokenOptions: ITokenOption = {
    expires: new Date(Date.now() + accessTokenExprise * 60 * 60 * 1000),
    maxAge: accessTokenExprise * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "lax",
  };

export  const refreshTokenOptions: ITokenOption = {
    expires: new Date(Date.now() + refreshTokenExprise * 24 * 60 * 60 * 1000),
    maxAge: refreshTokenExprise * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "lax",
  };

export const sendToken = (user: IUser, statusCode: number, res: Response) => {
  
  const accessToken = user.SignAccessToken();
  const refreshToken = user.SignRefreshToken();

  //upload session to redis
  try {
    redis.set(user._id.toString(), JSON.stringify(user));
  } catch (error) {
    console.error("Redis Error:", error);
  }



  //only set secure to true in production
  if (process.env.NODE_ENV === "production") {
    accessTokenOptions.secure = true;
  }

  res.cookie("access_token", accessToken, accessTokenOptions);
  res.cookie("refresh_token", refreshToken, refreshTokenOptions);

  res.status(statusCode).json({
    success: true,
    user,
    accessToken,
  });
};
