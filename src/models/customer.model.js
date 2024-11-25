import mongoose from 'mongoose';
const { Schema } = mongoose;

const customer = new Schema({

  
    firstName: { 
      type: String, 
      required: true 
    },
    secondName: {
       type: String, 
       default: "" 
      }, 
    firstlastName: { 
      type: String, 
      required: true 
    },
    secondlastName: { 
      type: String, 
      default: "" 
    },  
    address: { 
      type: String, 
      default: "" 
    }, 
    birth: { 
      type: Date, 
      required: true,
    },
    cellphone: { 
      type: String, 
      default: "" 
    },  
    email: { 
      type: String, 
      required: true, 
      unique: true,
      validate: {
        validator: function(email) {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
        },
        message: 'Invalid email address'
      } 
    },  
    category: {
      type: String,
      enum: ['Regular', 'Ocasional', 'Frecuente'], 
      required: true, 
    }
    
  }, {
    timestamps: false,
    versionKey: false
  });

const Customer = mongoose.model('Customer', customer);

export default Customer;