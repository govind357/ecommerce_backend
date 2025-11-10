import mongoose from "mongoose";

const productschema = new mongoose.Schema({
  productname: { type: String, required: true, unique: true },
  price: { type: Number, required: true, min: 0 },
  // image: { type: String, required: true }
  description: { type: String, required: true }, 
  category: { type: mongoose.Schema.Types.ObjectId, ref:'category' , required: true } ,
  productImage:{
        type:String,
        required:true
    },
});

const productCollection = mongoose.model("products", productschema);
export default productCollection;
