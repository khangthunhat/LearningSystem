import { NextFunction } from "express";
import OrderModel from "../models/order.model";
import { CatchAsyncError } from "../middleware/catchAsyncError";

// create new order
export const newOrder = CatchAsyncError(async (data: any, res: Response, next: NextFunction) => {
    const order = await OrderModel.create(data);
    next(order);
})