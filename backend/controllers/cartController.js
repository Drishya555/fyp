import cartModel from "../models/cartModel.js";
import mongoose from "mongoose";
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









export const removecartController = async (req, res) => {
    try {
        const { user, cartItemId, quantity } = req.body;

        if (!mongoose.Types.ObjectId.isValid(user) || 
            !mongoose.Types.ObjectId.isValid(cartItemId)) {
            return res.status(400).send({
                success: false,
                message: "Invalid ID format",
            });
        }

        const cart = await cartModel.findOne({ user });

        if (!cart) {
            return res.status(404).send({
                success: false,
                message: "Cart not found for this user",
            });
        }

        const itemIndex = cart.products.findIndex(
            item => item._id.toString() === cartItemId
        );

        if (itemIndex === -1) {
            return res.status(404).send({
                success: false,
                message: "Item not found in cart",
            });
        }

        const currentItem = cart.products[itemIndex];
        let message;

        if (quantity && currentItem.quantity > quantity) {
            cart.products[itemIndex].quantity -= quantity;
            message = `Quantity decreased by ${quantity}`;
        } else {
            cart.products.splice(itemIndex, 1);
            message = "Item removed from cart successfully";
        }

        if (cart.products.length === 0) {
            await cartModel.findByIdAndDelete(cart._id);
            return res.status(200).send({
                success: true,
                message: "Cart is now empty and has been removed",
                cart: null
            });
        }

        await cart.save();

        const populatedCart = await cartModel.findById(cart._id)
            .populate("products.product", "name price discountprice medicineimg slug");

        res.status(200).send({
            success: true,
            message,
            cart: populatedCart
        });

    } catch (error) {
        console.error("Cart removal error:", error);
        res.status(500).send({
            success: false,
            message: "Error while updating cart",
            error: error.message,
        });
    }
};