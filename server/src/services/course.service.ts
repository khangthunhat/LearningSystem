"use strict";

import { Response } from "express";
import courseModel from "../models/course.model";
import { CatchAsyncError } from "../middleware/catchAsyncError";

//create course
export const createCourse = CatchAsyncError(async (data: any, res:Response)=>{
    const course = await courseModel.create(data);
    res.status(201).json({
        success: true,
        course 
    });
});

//Get all course -- only for admin
export const getAllCourseService = async (res: Response) => {
    const course = await courseModel.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      course,
    });
  };

//delete course -- only for admin
export const deleteCourseService = async (id: string, res: Response) => {
  const course = await courseModel.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    message: "Course deleted successfully",
    course,
  });
};

