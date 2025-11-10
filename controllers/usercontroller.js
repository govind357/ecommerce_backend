
import productCollection from "../module/product.js";
import Cart from "../module/cart.js";
import orders from "../module/orders.js";
export const addcart = async (req, res) => {
    console.log('reached');
    
    try {
        const userid = req.session.userid;
        const productId = req.params.id;
        console.log(productId);
        
        const { quantity } = req.body;


        const product = await productCollection.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }


        let cart = await Cart.findOne({ userId: userid });


        if (!cart) {
            const total = product.price * quantity;
            const dataToInsert = {
                userId: userid,
                items: [{ productId, quantity }],
                totalAmount: total,
            };

            cart = await Cart.create(dataToInsert);
            return res.json({ message: "Cart created", cart });
        }


        const existingItem = cart.items.find((item) =>
            item.productId.equals(productId)
        );

        if (existingItem) {

            existingItem.quantity += quantity;
        } else {

            cart.items.push({ productId, quantity });
        }


        let newTotal = 0;
        for (const item of cart.items) {
            const product = await productCollection.findById(item.productId);
            newTotal += product.price * item.quantity;
        }
        cart.totalAmount = newTotal;

        await cart.save();
        res.json({ message: "Cart updated", cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};


export const deleteCart = async (req, res) => {
    try {
        const userId = req.session.userid;

        const cart = await Cart.findOneAndDelete({ userId });
        if (!cart) {
            return res.json({ message: "Cart not found" });
        }

        res.json({ message: "Cart deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};


export const removeFromCart = async (req, res) => {
    try {
        const userId = req.session.userid;
        const productId = req.params.id;

console.log(productId);

        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }


        cart.items = cart.items.filter(
            (item) => !item.productId.equals(productId)
        );


        let newTotal = 0;
        for (const item of cart.items) {
            const prod = await productCollection.findById(item.productId);
            newTotal += prod.price * item.quantity;
        }
        cart.totalAmount = newTotal;

        await cart.save();
        res.status(200).json({ message: "Item removed", cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};



export const editCart = async (req, res) => {
    const userId = req.session.userid;
    const productId = req.params.id;
    const { quantity } = req.body;

    console.log('1');
    const cart = await Cart.findOne({ userId });
    if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
    } console.log('2');
    const existingItem = cart.items.find((item) =>
        item.productId.equals(productId))

    if (!existingItem) {
        return res.status(404).json({ message: "Product not found in cart" });
    }
    console.log('3');
    existingItem.quantity = quantity;
    let newTotal = 0;
    for (const item of cart.items) {
        const product = await productCollection.findById(item.productId);
        if (product) {
            newTotal += product.price * item.quantity;
        }
    }
    console.log('4');
    cart.totalAmount = newTotal;
    await cart.save();
    res.send('success')

}


export const getCart = async (req, res) => {
    const userId = req.session.userid;
    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) {
        return res.status(404).json({ message: "Your cart is empty" });
    }


    res.status(200).json({
        message: "Cart fetched successfully", totalAmount: cart.totalAmount, items: cart.items,
    });
}



// //////////////order//////////////
export async function createOrder(req, res) {
    const userId = req.session.userid;
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart) {
        return res.json({ message: "Your cart is empty" });
    }
    let totalAmount = 0;
    const orderItems = cart.items.map(item => {
        const price = item.productId.price;
        totalAmount += price * item.quantity;
        return {
            productId: item.productId._id,
            quantity: item.quantity,
            price: price,
        };
    });
    const neworder = await orders.create({
        userId,
        items: orderItems,
        totalAmount,
        orderStatus: "pending",

    })
    await Cart.deleteOne({ userId });
    res.status(201).json({ message: "Order placed successfully " })
}


// ////////////get all order//////////
export const getAllOrder = async (req, res) => {
    console.log('reached');
    
    const userId = req.session.userid;
    
    const userorders = await orders.find({ userId }).populate("items.productId");
    if (!userorders || userorders.length === 0) {
        return res.status(404).json({ message: "No orders found" });
    }
    res.status(200).json({
        message: "Orders fetched successfully", userorders,
    });
}



// ////////////////get single order by id//////////
export const getTheOrder = async (req, res) => {
    const orderId = req.params.id;
    const userId = req.session.userid;
    const order = await orders.findOne({ _id: orderId, userId })
        .populate("items.productId");

    if (!order) {
        return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order fetched successfully", order });
}

export const logout= async(req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Logout failed" });
        }
        res.clearCookie("connect.sid"); 
        res.status(200).json({ message: "Logged out successfully" });
    });
};



export const getCategories = async (req, res) => {
  try {
    const categories = await categoryCollection.find()
    res.status(200).json(categories)
  } catch (error) {
    res.status(500).json({ error: 'serber errror' });
  }
}