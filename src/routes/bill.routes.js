import { Router } from 'express'

import { createBill, getBill, getAllBills, updateBill, deleteBill } from '../controllers/bill.controller.js';

const billRouter = Router()

billRouter.post("/bill", createBill);
billRouter.get("/bill/:id", getBill);
billRouter.get("/bill", getAllBills);
billRouter.put("/bill/:id", updateBill);
billRouter.delete("/bill/:id", deleteBill);

export default billRouter;