import express from "express";
import { getNotifications, updateNotification } from "../controllers/notification.controller";
import { isAutheticated, authorizeRoles } from "../middleware/auth";

const orderRouter = express.Router();

orderRouter.get("/get-all-notifications", isAutheticated, authorizeRoles("admin"), getNotifications);
orderRouter.put("/update-notification/:id", isAutheticated, authorizeRoles("admin"), updateNotification);

export default orderRouter; 