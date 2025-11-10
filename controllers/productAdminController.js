import productCollection from "../module/product.js";
import { categoryCollection } from "../module/category.js";
import usercollection from '../module/usermodel.js'
import orders from "../module/orders.js";
// ///////////get all categories////
export const getcategory=async (req,res)=>{
   try{
 
    const allCategories=await categoryCollection.find()
  
        return res.status(200).json(  allCategories );

   }

   catch(err){
     console.error("Error fetching products:", err);
    res.status(500).json({ message: "Server error while fetching products" });
  }
}
// //////////////category///////////
export const addcategory=async (req,res)=>{
    const name=req.body.categoryName
    const nameexists=await categoryCollection.findOne({categoryName:name})
    if(nameexists){
        return res.send('exists');
    }
   
    
    await categoryCollection.insertOne({categoryName:name})
    res.send('success')
}
// //////////////dleiet////////////
export const deletefun=async(req,res)=>{
 try {
    const { id } = req.params;

    const productsInCategory = await productCollection.find({ category: id });

    if (productsInCategory.length > 0) {
      return res.json({
        message: "Cannot delete category. Products exist under this category.",
      });
    }
    await categoryCollection.findByIdAndDelete(id);

    res.status(200).json({ message: "Category deleted successfully." });
    console.log("Category deleted successfully");
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ message: "Server error while deleting category." });
  }


}
// /////////////update/////////////
export const updatefu=async(req,res)=>{
  
    const {name}=req.body
    const {id}=req.params


    console.log(id);
    
    const document=await categoryCollection.findById(id)
    
     if (!document) {
      return res.status(404).json({ message: "Category not found" });
    }
    if(name !==document.categoryName){
         await categoryCollection.updateOne({_id:id},{$set:{categoryName:name}})
     res.send('productname changed')
    }
}



// /////////////addproduct/////////
export const Addproduct = async (req, res) => {
  console.log('hi');
  
  try {
    let proImage = "";
      if (req.file) {
        proImage = req.file.filename;
      }
    const { productname, price, description, category } = req.body;

    const categoryExists = await categoryCollection.findById(category);
    if (!categoryExists) return res.status(400).send("Invalid category ID");
    const productExists = await productCollection.findOne({ productname });
    if (productExists) return res.status(400).send("Product already exists");

    const newProduct = await productCollection.create({
      productname,
      price,
      description,
      category,
      productImage: proImage,
    });

    res.status(201).json({ message: "Product added", product: newProduct });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};



///////////////dleteproduct//////////
export const deleteproduct=async(req,res)=>{
    try{
      console.log('hi');
      
        const {id}=req.params
        await productCollection.findByIdAndDelete(id)
        res.send('item removed')
    }
    catch(err){

        console.log(err);b
        
    }
}
// //////////////////edit product/////

  export const editProduct=async(req,res)=>{
    console.log('hi');
    
try{
    const {id}=req.params
    console.log(id);
    
    const {name,price1,description1,category }=req.body
    
   const productDocument=await productCollection.findById(id)
    if (!productDocument) {
      return res.json({ message: "Product not found" });
    }
const updateData = {};
    if (name && name !== productDocument.productname) {
      updateData.productname = name;
    }
    if (price1 && price1 !== productDocument.price) {
      updateData.price = price1;
    }
    if (description1 && description1 !== productDocument.description){
      updateData.description = description1;
    }
      if (category && category !== String(productDocument.category)) { 
      updateData.category = category;
    }
     if (Object.keys(updateData).length > 0) {
      await productCollection.updateOne({ _id: id }, { $set: updateData });
      return res.json({ message: "Product updated successfully" });
    } else {
      return res.json({ message: "No changes made" });
    }

}
catch(err){
    console.log(err);
    
}
}







// /////////////get all product//////
export const getAll=async(req,res)=>{
  const product=await productCollection.find().populate("category", "categoryName")
  if (!product || product.length === 0) {
      return res.json({ message: "No products found" });
    }
        res.json({message: "Products fetched successfully",product,})
}

/////////////////////////get all users

export const getAlluser=async(req,res)=>{
  console.log('reached');
  
  try{
    const alluser= await usercollection.find({},"-password")
    res.json({users:alluser})
  }
  catch(err){
    console.error(err)
  }
}
/////////////////////////////
export async function adminUpdateUser(req, res) {
  console.log('hi');
  
    try {
        const id = req.params.id;
        console.log(id);
        
        
        const found = await usercollection.findById( id);
        

        if (!found) {
            return res.status(404).json({ message: "User not found", success: false });
        }
        if(found.status===true){
          
 await usercollection.updateOne({ _id: id }, { $set:{status:false}  });
        }else{
 await usercollection.updateOne({ _id: id }, { $set:{status:true}  });
        }

        res.json({
            message:  'updated' 
           
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", success: false });
    }
}


//////////////////////oreders list

export const getUsersWithOrders = async (req, res) => {
  try {
    
  
    const users = await usercollection.find({}, "-password");

    const usersWithOrders = await Promise.all(
      users.map(async (user) => {
        const order = await orders.find({ userId: user._id }).populate("items.productId", "productname price");
        return { ...user.toObject(), orders: order };

      })
    );
    res.status(200).json({ users: usersWithOrders });
  } catch (err) {
    console.error("Error fetching users with orders:", err);
    res.status(500).json({ message: "Server error" });
  }
};