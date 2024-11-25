import Bill from "../models/bill.model.js";
import BillingDetail from "../models/bill_detail.model.js";

export async function createBill(req, res) {
  const { id_customer, date, details } = req.body;

  try {
    const bill = new Bill({ id_customer, date });
    await bill.save();

    const billingDetails = details.map(detail => ({
      id_bill: bill._id,
      id_products: detail.id_products,
      quantity: detail.quantity,
      price: detail.price,
    }));

    await BillingDetail.insertMany(billingDetails);

    res.status(201).json({ bill, billingDetails });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}


export async function getBill(req, res) {
    const { id } = req.params;
  
    try {
      const bill = await Bill.findById(id);
      if (!bill) {
        return res.status(404).json({ message: 'Bill not found' });
      }
  
      const billingDetails = await BillingDetail.find({ id_bill: bill._id })
                                                .populate('id_products');
  
      res.status(201).json({ bill, billingDetails });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  

export async function updateBill(){
    
}

export async function deleteBill(){
    
}

export async function getAllBills(){
    
}