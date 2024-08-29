import express from "express";
import {
  editCourse,
  getSingleCourse,
  uploadCourse,
  getAllCourse,
  getCourseByUser,
} from "../controllers/course.controller";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
const courseRouter = express.Router();

courseRouter.post(
  "/create-course",
  isAutheticated,
  authorizeRoles("admin"),
  uploadCourse
);

courseRouter.put(
  "/edit-course/:id",
  isAutheticated,
  authorizeRoles("admin"),
  editCourse
);

courseRouter.get("/get-course/:id", getSingleCourse);

courseRouter.get("/get-courses", getAllCourse);

courseRouter.get("/get-courses-content/:id", isAutheticated, getCourseByUser);

export default courseRouter;
