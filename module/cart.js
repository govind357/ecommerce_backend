   
import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: false,
      
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
          required: true,
       
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1,
        }
      },
    ],
    totalAmount: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  { timestamps: true } 
);

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
