import productCollection from "../module/product.js";
import { categoryCollection } from "../module/category.js";


export const listproduct = async (req, res) => {
  try {
    const productList = await productCollection.find();
    return res.status(200).json(  productList );
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Server error while fetching products" });
  }
};

export const getProductsById = async (req, res) => {
  try {
    const id = req.params.id
    const products = await productCollection.findById(id).populate("category");
    if (!products) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(products)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'serber errror' });
  }
}

export const getCategories = async (req, res) => {
  console.log('reached');
  
  try {
    const categories = await categoryCollection.find()
    res.status(200).json(categories)
  } catch (error) {
    res.status(500).json({ error: 'serber errror' });
  }
}

export const filltercat = async (req, res) => {
  
  
  const categoryId = req.params.id;
  console.log(categoryId);
  
  const products = await productCollection.find({ category:categoryId });
  res.json({ products });
};


































































// export const getCategoriesProducts=async(req,res)=> {
// try {
//   const catid = req.params.id
//     const products  = await productCollection.find({category:catid})
//     if (!products.length) {
//       return res.status(404).json({ message: 'No products found for this category' });
//     }
//     res.status(200).json(products)
// } catch (error) {
//       res.status(500).json({ error: 'serber errror' });
// }
// }