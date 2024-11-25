import mongoose from 'mongoose';
const { Schema } = mongoose;

const product = new Schema({

    name: { 
      type: String, 
      required: true
    },
    price: { 
      type: Number, 
      required: true,
      min: [0, 'El precio debe ser mayor o igual a 0'],
    }, 
    stock: { 
        type: Number, 
        required: true,
        min: [1, 'El stock debe ser al menos 1'],
      }, 
  }, {
    timestamps: true,
    versionKey: false
  });

const Product = mongoose.model('Product', product);

export default Product;