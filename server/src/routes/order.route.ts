import express from "express";
import { createOrder, getAllOrders } from "../controllers/order.controller";
import { isAutheticated, authorizeRoles } from "../middleware/auth";

const orderRouter = express.Router();

orderRouter.post("/create-order", isAutheticated, createOrder);

orderRouter.get(
  "/get-all-orders",
  isAutheticated,
  authorizeRoles("admin"),
  getAllOrders
);
export default orderRouter;
