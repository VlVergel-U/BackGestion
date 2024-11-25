import mongoose from 'mongoose';
const { Schema } = mongoose;

const billingDetail = new Schema(
  {
    id_bill: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bill',
      required: true,
    },
    id_products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    }
    ],
    quantity: {
      type: Number,
      required: true,
      min: [1, 'La cantidad debe ser al menos 1'],
    },
    price: {
      type: Number,
      required: true,
      min: [0, 'El precio debe ser mayor o igual a 0'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const BillingDetail = mongoose.model('BillingDetail', billingDetail);

export default BillingDetail;
