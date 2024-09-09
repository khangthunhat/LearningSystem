"use strict";

import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import OrderModel, { IOrder } from "../models/order.model";
import CourseModel from "../models/course.model";
import NotificationModel from "../models/notification.model";
import userModel from "../models/user.model";
import sendMail from "../utils/sendEmail";
import ejs from 'ejs';
import { newOrder, getAllOrdersService } from "../services/order.service";
import path from "path";

export const createOrder = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {courseId, paymentInfo} = req.body as IOrder;

      const user = await userModel.findById(req.user?._id);

      const courseExitInUser = user?.courses.some((course: any) => course.courseId == courseId)

      if (courseExitInUser) {
        return next(new ErrorHandler("You have already purchased this course", 400));
      }

      const course = await CourseModel.findById(courseId);

      if (!course) {
        return next(new ErrorHandler("Course not found", 404));
      }

      const data: any = {
        courseId: course._id,
        userId: user?._id,
      }
      

      const mailData = {
        order:{
          _id: course._id.toString().slice(0,7),
          name: course.name,
          price: course.price,
          data: new Date().toLocaleDateString('en-US',{year: 'numeric', month: 'long', day: 'numeric'})
        }
      }

      const html = await ejs.renderFile(path.join(__dirname,'../mails/order-confirmation.ejs'),{order:mailData});

      try {
        if(user){
          await sendMail({
            email: user.email,
            subject: "Order Comfirmation",
            template: "order-confirmation.ejs",
            data: mailData
          })
        }
      } catch (error: any) {
        return next(new ErrorHandler(error.message,500));
      }

      user?.courses.push({courseId: course?._id});

      await user?.save();

      await NotificationModel.create({
        user: user?._id,
        title: "New Order",
        message: `You have a new order from ${course?.name}`,
      });

      course.purchases ? course.purchases += 1 : course.purchases;

      newOrder(data,res,next);

    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Get all orders -- only for admin
export const getAllOrders = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllOrdersService(res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);