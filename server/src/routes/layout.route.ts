import express from "express";
import { createLayout, editLayout , getLayoutByType} from "../controllers/layout.controller";
import { authorizeRoles, isAutheticated } from "../middleware/auth";

const LayoutRouter = express.Router();

LayoutRouter.post(
  "/create-layout",
  isAutheticated,
  authorizeRoles("admin"),
  createLayout
);

LayoutRouter.put(
  "/edit-layout",
  isAutheticated,
  authorizeRoles("admin"),
  editLayout
);

LayoutRouter.get("/get-layout" ,getLayoutByType);


export default LayoutRouter;
