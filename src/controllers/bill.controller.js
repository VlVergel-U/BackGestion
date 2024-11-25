import Bill from "../models/bill.model.js";
import BillingDetail from "../models/bill_detail.model.js";
import Product from "../models/product.model.js";

export async function createBill(req, res) {
    const { id_customer, date, details } = req.body;
  
    try {
      const bill = new Bill({ id_customer, date });
      await bill.save();
  
      const billingDetail = {
        id_bill: bill._id,
        products: [],
      };
  
      for (let detail of details) {
        const product = await Product.findById(detail.id_product);
  
        if (!product) {
          return res.status(404).json({
              message: `Producto con ID ${detail.id_product} no encontrado`,
            });
        }
  
        const totalPrice = product.price * detail.quantity;
  
        await Product.updateOne(
          { _id: product._id },
          { $inc: { stock: -detail.quantity } }
        );
  
        billingDetail.products.push({
          id_product: product._id,
          quantity: detail.quantity,
          price: totalPrice,
        });
      }
  
      await BillingDetail.create(billingDetail);
  
      return res.status(201).json({ bill, billingDetail });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  

  export async function getBill(req, res) {
    const { id } = req.params;
  
    try {
      const bill = await Bill.findById(id).populate('id_customer');
      if (!bill) {
        return res.status(404).json({ message: "Bill not found" });
      }
  
      const billingDetails = await BillingDetail.aggregate([
        { $match: { id_bill: bill._id } },
        {
          $lookup: {
            from: 'products',
            localField: 'products.id_product',
            foreignField: '_id',
            as: 'product_details',
          },
        },
        {
          $unwind: {
            path: '$product_details',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $group: {
            _id: '$id_bill',
            products: { $push: '$product_details' },
          },
        },
      ]);
  
      if (!billingDetails || billingDetails.length === 0) {
        return res.status(404).json({ message: "Billing details not found" });
      }
  
      return res.status(201).json({ bill, billingDetails: billingDetails[0] });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  
  

  export async function getAllBills(req, res) {
    try {
        const bills = await Bill.aggregate([
            { $sort: { date: -1 } },
            {
                $lookup: {
                    from: 'billingdetails',
                    localField: '_id',
                    foreignField: 'id_bill',
                    as: 'billing_details',
                },
            },
            {
                $lookup: {
                    from: 'customers',
                    localField: 'id_customer',
                    foreignField: '_id',
                    as: 'customer_details',
                },
            },
            {
                $unwind: {
                    path: '$billing_details',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $unwind: {
                    path: '$billing_details.products',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'billing_details.products.id_product',
                    foreignField: '_id',
                    as: 'product_info',
                },
            },
            {
                $unwind: {
                    path: '$product_info',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $group: {
                    _id: '$_id',
                    customer_info: { $first: '$customer_details' },
                    date: { $first: '$date' },
                    billing_details: {
                        $push: {
                            products: {
                                id_product: '$billing_details.products.id_product',
                                quantity: '$billing_details.products.quantity',
                                price: '$billing_details.products.price',
                                product_info: '$product_info',
                            },
                        },
                    },
                },
            },
        ]);

        if (!bills || bills.length === 0) {
            return res.status(404).json({ message: "No bills found" });
        }

        return res.status(201).json(bills);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
  
  
  