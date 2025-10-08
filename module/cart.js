// import mongoose, { Types } from "mongoose";

// const cartSchema = new mongoose.Schema({
  
//   user_id: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Users",
//     required: true,
//   },
//   item:[
//     {product_id: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Products",
//     required: true,
//   }, quantity: { type: Number, required: true,min:1 }
//   }],totalamount:{type:Number,required:true,default:0}
 
// },{ timestamps: true }
// );

// const Cart = mongoose.model("Cart", cartSchema);


// export default Cart;
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
  { timestamps: true, autoIndex: false } 
);

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
