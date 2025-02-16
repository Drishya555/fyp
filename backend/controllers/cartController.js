import cartModel from "../models/cartModel.js";

export const addCartController = async (req, res) => {
    try {
        const { user, products } = req.body;

        let cart = await cartModel.findOne({ user });

        if (cart) {
            // If cart exists, update products
            products.forEach(newProduct => {
                const existingProduct = cart.products.find(
                    p => p.product.toString() === newProduct.product
                );

                if (existingProduct) {
                    // If product exists, update quantity
                    existingProduct.quantity += parseInt(newProduct.quantity);
                } else {
                    // If new product, add to cart
                    cart.products.push(newProduct);
                }
            });

            await cart.save();
        } else {
            // If no cart exists, create a new one
            cart = new cartModel({ user, products });
            await cart.save();
        }

        res.status(200).send({
            success: true,
            message: "Cart updated successfully",
            cart,
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error updating cart",
            error: error.message,
        });
    }
};


export const getCartbyId = async(req,res) =>{
    try {
        const {id} = req.params

        const cartdetails = await cartModel.find({user: id}).populate("user", "name email address") .populate("products.product", "name slug category price discountprice manufacturer strength stock medicineimg");

        res.status(200).send({
            success: true,
            message: "Cart details fetched",
            cartdetails
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error fetching cart",
            error: error.message,
        });
    }
}