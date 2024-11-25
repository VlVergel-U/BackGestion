import mongoose from 'mongoose';
const { Schema } = mongoose;

const bill = new Schema({

    id_customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
      },
    date: { 
        type: Date, 
        required: true 
      }, 
  }, {
    timestamps: false,
    versionKey: false
  });

const Bill = mongoose.model('Bill', bill);

export default Bill;