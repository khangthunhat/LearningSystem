import express from "express";
import { createOrder } from "../controllers/order.controller";
import { isAutheticated, authorizeRoles } from "../middleware/auth";

const orderRouter = express.Router();

orderRouter.post("/create-order", isAutheticated, createOrder);

export default orderRouter; 