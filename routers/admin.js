import express from 'express'
import multer from 'multer'
import path from 'path'

import { adminLoginfunction, sessionChecking } from '../controllers/register.js'
import { addcategory, Addproduct, adminUpdateUser, deletefun, deleteproduct, editProduct, getAll, getAlluser, getUsersWithOrders, updatefu } from '../controllers/productAdminController.js'
import { getCategories } from '../controllers/public.js'
const adminrouter=express.Router()
 const storage = multer.diskStorage({
        destination:function(req,file,cb){

            cb(null,"uploads")
        },
        filename:function(req,file,cb){
            const name = Date.now()+path.extname(file.originalname)
            cb(null,name)
        }

    })

const productUpload = multer({storage:storage})

adminrouter.post('/login',adminLoginfunction)
// adminrouter.use(sessionChecking)

adminrouter.get('/product',getAll)
adminrouter.post('/AddProduct',productUpload.single("productImage"),Addproduct)
adminrouter.delete('/deleteProduct/:id',deleteproduct)
adminrouter.put('/editProduct/:id',editProduct)
adminrouter.get('/categories',getCategories)
adminrouter.post('/addcategory',addcategory)
adminrouter.delete('/deleteCategory/:id',deletefun)
adminrouter.put('/updateCategory/:id', updatefu);
adminrouter.get('/getusers',getAlluser)
adminrouter.put('/updateuser/:id', adminUpdateUser);

adminrouter.get('/orderslist',getUsersWithOrders)
export default adminrouter