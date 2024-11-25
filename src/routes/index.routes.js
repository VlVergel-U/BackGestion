import { Router } from "express";
import customerRouter from "./customer.routes.js";
import productRouter from "./product.routes.js";
import billRouter from "./bill.routes.js";

const indexRouter = Router();

indexRouter.use("/api", [customerRouter, productRouter, billRouter]);

export default indexRouter;