"use strict";

import ErrorHandler from "../utils/ErrorHandler";
import { Request, Response, NextFunction } from "express";

/**
 * Centralized error handling middleware
 * @param {Error} err - error object
 * @param {Request} req - express request object
 * @param {Response} res - express response object
 * @param {NextFunction} next - express next function
 *
 * Handles different types of errors and sends a standardized error response
 */
export const ErrorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //wrong mongodb id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  //Duplicate key error
  if (err.name === 11000 && err.keyValue && typeof err.keyValue === "object") {
    const message = `Dupplicate ${Object.keys(err.keyValue)} entared`;
    err = new ErrorHandler(message, 400);
  }

  //wrong jwt error
  if (err.name === "JsonwebTokenError") {
    const message = `Json web token is invalid, try again`;
    err = new ErrorHandler(message, 400);
  }

  //JWT expired error
  if (err.name === "JsonwebTokenError") {
    const message = `Ison web token is expired, try again`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
