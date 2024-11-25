import { Router } from 'express'

import { createBill, getBill, getAllBills } from '../controllers/bill.controller.js';

const billRouter = Router()

billRouter.post("/bill", createBill);
billRouter.get("/bill/:id", getBill);
billRouter.get("/bill", getAllBills);

export default billRouter;