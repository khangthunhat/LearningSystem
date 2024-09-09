"use strict";

import { NextFunction, Request, Response } from "express";
import { Document , Model} from "mongoose";

interface MonthData {
    month: string;
    count: number;
}

interface CourseAnalytics extends Document {
    courseId: string;
    
}
