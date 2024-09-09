"use strict";

import { Response } from "express";
import { redis } from "../utils/redis";
import  UserModel  from "../models/user.model";
//get user by id
export const getUserById = async (id: string, res: Response) => {
  const userJson = await redis.get(id);
  if (userJson) {
    const user = JSON.parse(userJson);
    res.status(201).json({
      success: true,
      user,
    });
  }
};

//Get all users -- only for admin
export const getAllUsersService = async (res: Response) => {
  const users = await UserModel.find().sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    users,
  });
};

//Update user role -- only for admin
export const updateUserRoleService = async (id: string, role: string, res: Response) => {
  const user = await UserModel.findByIdAndUpdate(id, { role }, { new: true });
  res.status(200).json({
    success: true,
    user,
  });
};

//delete user -- only for admin
export const deleteUserService = async (id: string, res: Response) => {
  const user = await UserModel.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    message: "User deleted successfully",
    user,
  });
};