import productCollection from "../module/product.js";
import { categoryCollection } from "../module/category.js";


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
   
const {id}=req.params
 console.log('work',id);

await categoryCollection.findByIdAndDelete(id)
res.send('removed')
console.log('removed');

}
// /////////////update/////////////
export const updatefu=async(req,res)=>{
    const {name}=req.body
    const document=await categoryCollection.findOne({categoryName:name})
    if(name!==document.categoryName){
         categoryCollection.updateOne({categoryName:document.categoryName},{$set:{categoryName:name}})
     res.send('productname changed')
    }
}

// /////////////addproduct/////////
export const Addproduct = async (req, res) => {
  try {
    const { productname, price, description, category } = req.body;

    const categoryExists = await categoryCollection.findById(category);
    if (!categoryExists) return res.status(400).send("Invalid category ID");

    const productExists = await productCollection.findOne({ productname });
    if (productExists) return res.status(400).send("Product already exists");

    const newProduct = await productCollection.create({
      productname,
      price,
      description,
      category
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
try{
    const {id}=req.params
    const {name,price1,description1}=req.body
   const productDocument=await productCollection.findOne(id)
if(name!==product){
    productCollection.updateOne({productname:productDocument.productname},{$set:{productname:name}})
     res.send('productname changed')
}
if(price1!==productDocument.price){
    productCollection.updateOne({productname:productDocument.productname},{$set:{price:price1}})
     res.send('price changed')
}
if(description1!==productDocument.description){
    productCollection.updateOne({productname:productDocument.productname},{$set:{description:description1}})
    res.send('dicription changed')
}

}
catch(err){
    console.log(err);
    
}
}