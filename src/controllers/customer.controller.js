import Customer from "../models/customer.model.js";

export async function createCustomer(req, res){
    try {
        const customer = new Customer(req.body);
        await customer.save();
        res.status(201).json(customer);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
}

export async function getCustomer(req, res){
    const { id } = req.params;

    try {
      const customer = await Customer.findById(id);
      if (!customer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
      res.status(201).json(customer);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }  
}

export async function updateCustomer(req, res){
    const { id } = req.params;

  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedCustomer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.status(201).json(updatedCustomer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function deleteCustomer(req, res){
    const { id } = req.params;

    try {
      const deletedCustomer = await Customer.findByIdAndDelete(id);
      if (!deletedCustomer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
      res.status(201).json({ message: 'Customer deleted successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }  
}

export async function getAllCustomers(req, res) {
    try {
      const customers = await Customer.find();
      res.status(200).json(customers);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  