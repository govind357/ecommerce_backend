import express from 'express'

import { adminLoginfunction, sessionChecking } from '../controllers/register.js'
import { addcategory, Addproduct, deletefun, deleteproduct, editProduct } from '../controllers/productAdminController.js'
const adminrouter=express.Router()

adminrouter.post('/login',adminLoginfunction)
adminrouter.use(sessionChecking)
adminrouter.post('/AddProduct',Addproduct)
adminrouter.delete('/deleteProduct/:id',deleteproduct)
adminrouter.put('/editProduct/:id',editProduct)
adminrouter.post('/addcategory',addcategory)
adminrouter.delete('/deleteCategory/:id',deletefun)

export default adminrouter