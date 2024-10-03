import { Request, Response, NextFunction } from "express";

/**
 * CatchAsyncError - a middleware that takes a function and wraps it with a
 * try/catch block. If the function throws an error, it will be passed to the
 * next middleware in the chain.
 *
 * @param {Function} theFunc - The function to be wrapped
 * @returns {Function} A middleware with the same signature as a standard
 *   Express middleware
 */
export const CatchAsyncError =
  (theFunc: any) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(theFunc(req, res, next)).catch(next);
  };
