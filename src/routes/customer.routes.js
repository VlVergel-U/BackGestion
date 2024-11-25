import { Router } from 'express'

import { createCustomer, getCustomer, deleteCustomer, updateCustomer, getAllCustomers } from '../controllers/customer.controller.js';

const customerRouter = Router()

customerRouter.post("/customer", createCustomer);
customerRouter.get("/customer/:id", getCustomer);
customerRouter.get("/customer", getAllCustomers);
customerRouter.put("/customer/:id", updateCustomer);
customerRouter.delete("/customer/:id", deleteCustomer);

export default customerRouter;