import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import OrderModel, {IOrder} from "../models/order.model";
import CourseModel from "../models/course.model";
import NotificationModel from "../models/notification.model";
import userModel from "../models/user.model";
import path from "path";
import ejs from "ejs";
import sendMail from "../utils/sendEmail";
import { newOrder } from "../services/order.service";

export const createOrder = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
   try {
    const {courseId, paymentInfo} = req.body as IOrder;

    const user = await userModel.findById(req.user?._id);

    const courseExistInUser = user?.courses.some((course: any) => course.id.toString() === courseId);

    if(courseExistInUser) {
      return next(new ErrorHandler("You already purchased this course", 400));
    }

    const course = await CourseModel.findById(courseId);

    if(!course) {
      return next(new ErrorHandler("Course not found", 404));
    }

    const data: any = {
        courseId: course._id,
        userId: user?._id,
    }


    newOrder(data, res ,next);

    const mailData = {
        order: {
            _id: course  ._id.toString().slice(0, 6),
            name: course.name,
            price: course.price,
            date: new Date().toLocaleDateString("vi-VN", {
                day: "numeric",
                month: "long",
                year: "numeric",
            }),
        },
    }

    const html = await ejs.renderFile(path.join(__dirname, "../mails/order-confirmation.ejs"), mailData);


   } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
   }
    
}   
)