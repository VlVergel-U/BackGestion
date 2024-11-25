import Product from "../models/product.model.js";

export async function createProduct(req, res) {
  try {
    let { name, ...otherFields } = req.body;

    let nameLower;

    if (name) {
      nameLower = name.replace(/\s+/g, "").toLowerCase();
    }

    const existingProduct = await Product.findOne({
      $expr: {
        $eq: [
          {
            $replaceAll: {
              input: { $toLower: "$name" },
              find: " ",
              replacement: "",
            },
          },
          nameLower,
        ],
      },
    });

    if (existingProduct) {
      return res.status(400).json({ message: "Product added previously" });
    }

    const product = new Product({ name, ...otherFields });
    await product.save();

    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function getProduct(req, res) {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function updateProduct(req, res) {
  const { id } = req.params;
  const { name, price, stock } = req.body;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (
      product.name === name &&
      product.price === price &&
      product.stock === stock
    ) {
      return res.status(200).json({ message: "No changes detected" });
    }

    await product.updateOne({ name, price, stock });

    const updatedProduct = await Product.findById(id);
    return res
      .status(200)
      .json({
        message: "Product updated successfully",
        product: updatedProduct,
      });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function deleteProduct(req, res) {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(201).json({ message: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function getAllProducts(req, res) {
  try {
    const products = await Product.find();
    return res.status(201).json(products);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
