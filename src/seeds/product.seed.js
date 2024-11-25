import Product from "../models/product.model.js";

export async function loadProducts() {
    const products = [
        { name: "iPhone 13", price: 4000000, stock: 50 },
        { name: "Samsung Galaxy S23", price: 3500000, stock: 80 },
        { name: "Huawei MatePad Pro", price: 2200000, stock: 100 },
        { name: "Monitor LG 27", price: 1500000, stock: 60 },
        { name: "Teclado Mecánico Logitech", price: 450000, stock: 120 },
        { name: "Mouse Gamer Razer", price: 300000, stock: 150 },
        { name: "Auriculares Sony WH-1000XM5", price: 1600000, stock: 80 },
        { name: "Cámara Canon EOS R5", price: 12000000, stock: 30 },
        { name: "Proyector BenQ TK800M", price: 4500000, stock: 20 },
        { name: "Silla Gamer DXRacer", price: 2000000, stock: 40 }
      ];

  try {
    const existingProducts = [];
    const newProducts = [];

    for (const product of products) {
      const existingProduct = await Product.findOne({ name: product.name });
      if (existingProduct) {
        existingProducts.push(product.name);
      } else {
        newProducts.push(product);
      }
    }

    if (existingProducts.length > 0) {
      console.log("Ya existen los siguientes productos:", existingProducts.join(", "));
    }

    if (newProducts.length > 0) {
      await Product.insertMany(newProducts);
      console.log("Productos agregados:", newProducts.length);
    } else {
      console.log("No se agregaron nuevos productos");
    }

  } catch (error) {
    console.log("Hubo un error al agregar productos:", error.message);
  }
}
