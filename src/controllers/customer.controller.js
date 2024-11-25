import Customer from "../models/customer.model.js";

export async function createCustomer(req, res) {
  try {
    const { email, ...otherFields } = req.body;

    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res
        .status(400)
        .json({ message: "The customer is already registered" });
    }

    const customer = new Customer({ email, ...otherFields });
    await customer.save();

    return res.status(201).json(customer);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function getCustomer(req, res) {
  const { id } = req.params;

  try {
    const customer = await Customer.findById(id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    return res.status(201).json(customer);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function updateCustomer(req, res) {
  const { id } = req.params;

  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    return res.status(201).json(updatedCustomer);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function deleteCustomer(req, res) {
  const { id } = req.params;

  try {
    const deletedCustomer = await Customer.findByIdAndDelete(id);
    if (!deletedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    return res.status(201).json({ message: "Customer deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function getAllCustomers(req, res) {
  try {
    const customers = await Customer.find();
    return res.status(201).json(customers);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
