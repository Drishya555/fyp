import { useState, useEffect } from "react";
import { MdDeleteOutline, MdOutlineShoppingCart, MdOutlineLocalShipping } from "react-icons/md";
import { FiPackage, FiChevronRight, FiArrowLeft } from "react-icons/fi";
import { BiSolidOffer } from "react-icons/bi";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import AuthStore from "../hooks/authStore";
import { host } from "../host.js";
import { toast } from "react-hot-toast";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [couponApplied, setCouponApplied] = useState(false);
  const [removingItem, setRemovingItem] = useState(null);
  const navigate = useNavigate();
      const token = AuthStore.getToken();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const userid = AuthStore.getUser()?.userid || null;
        if (!userid) {
          setCart([]);
          setLoading(false);
          return;
        }
        
        const response = await axios.get(`${host}/api/cart/getcartdetails/${userid}`,{
          headers: {
            Authorization: token ? `Bearer ${token}` : '',  
          },
        });
        setCart(response.data.cartdetails);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching cart:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleQuantityChange = async (productId, type) => {
    setCart((prevCart) =>
      prevCart.map((cartItem) => ({
        ...cartItem,
        products: cartItem.products.map((item) =>
          item._id === productId
            ? {
                ...item,
                quantity: type === "increase" 
                  ? item.quantity + 1 
                  : Math.max(1, item.quantity - 1),
              }
            : item
        ),
      }))
    );
    
    try {
      const userid = AuthStore.getUser()?.userid || null;
      if (!userid) return;
      
      
    } catch (err) {
      console.error("Error updating quantity:", err);
      // eslint-disable-next-line no-undef
      fetchData();
    }
  };

  const handleRemoveItem = async (cartItemId, quantityToRemove = null) => {
  setRemovingItem(cartItemId);
  
  try {
    const userid = AuthStore.getUser()?.userid;
    if (!userid) {
      toast.error("Please log in to manage your cart");
      return;
    }

    const toastId = toast.loading(quantityToRemove 
      ? "Updating quantity..." 
      : "Removing item from cart...");

    const response = await axios.post(`${host}/api/cart/removecart`, {
      user: userid,
      cartItemId,
      quantity: quantityToRemove
    }, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',  
      },
    });

    if (response.data.cart === null) {
      setCart([]);
      toast.success("Cart is now empty", { id: toastId });
    } else {
      setCart([response.data.cart]);
      toast.success(
        quantityToRemove 
          ? `Quantity updated successfully` 
          : "Item removed from cart",
        { id: toastId }
      );
    }
    
  } catch (err) {
    console.error("Cart update error:", err);
    toast.error(
      err.response?.data?.message || "Error updating cart",
      {
        duration: 4000,
        position: 'top-center',
      }
    );
  } finally {
    setRemovingItem(null);
  }
};

  const applyCoupon = () => {
    if (couponCode.trim() === "") return;
    
    setCouponApplied(true);
    setTimeout(() => {
      setShowCouponInput(false);
    }, 1500);
  };

  const handleCheckout = async () => {
    try {
      const userId = AuthStore.getUser()?.userid;
      if (!userId) {
        alert("Please log in to continue with checkout");
        navigate("/login", { state: { from: "/cart" } });
        return;
      }
  
      if (!cart.length || cart.every(item => !item.products || !item.products.length)) {
        alert("Your cart is empty");
        return;
      }
  
      const orderItems = cart.flatMap(cartItem => 
        cartItem.products.map(product => ({
          product: product.product?._id, 
          quantity: product.quantity,
          price: product.product?.discountprice || product.product?.price
        })).filter(item => item.product)
      );
  
      sessionStorage.setItem('cartData', JSON.stringify(orderItems));
      setProcessingPayment(true);
  
      const orderResponse = await axios.post(`${host}/api/orders/`, {
        userId,
        items: orderItems, 
        totalAmount: totalAmount,
        paymentMethod: "khalti",
        shippingAddress: null,
      },
    {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',  
      },
    });
  
      if (!orderResponse.data.success) {
        throw new Error(orderResponse.data.message || "Order creation failed");
      }
  
      const orderId = orderResponse.data.order._id;
  
      const paymentResponse = await axios.post(`${host}/api/payment/initialize-khali`, {
        userId,
        orderId,
        totalPrice: totalAmount,
        website_url: window.location.origin,
        orderItems: orderItems, 
      },
    {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',  
      },
    });
  
      if (paymentResponse.data.success && paymentResponse.data.payment.payment_url) {
        sessionStorage.setItem('pendingPayment', paymentResponse.data.payment._id);
        sessionStorage.setItem('pendingOrder', orderId);
        window.location.href = paymentResponse.data.payment.payment_url;
      } else {
        throw new Error(paymentResponse.data.message || "Payment initialization failed");
      }
    } catch (error) {
      console.error("Checkout error:", {
        message: error.message,
        response: error.response?.data
      });
      alert(error.response?.data?.message || error.message || "Checkout error occurred");
      setProcessingPayment(false);
    }
  };

  
  const subtotal = cart.reduce((total, cartItem) => {
    return (
      total +
      cartItem.products.reduce(
        (subtotal, item) => subtotal + item.product?.discountprice * item.quantity,
        0
      )
    );
  }, 0);
  
  const originalPrice = cart.reduce((total, cartItem) => {
    return (
      total +
      cartItem.products.reduce(
        (subtotal, item) => subtotal + item.product?.price * item.quantity,
        0
      )
    );
  }, 0);
  
  const savings = originalPrice - subtotal;
  const deliveryCharge = subtotal >= 599 ? 0 : 100;
  const tax = Math.round(subtotal * 0.05); 
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0; 
  const totalAmount = subtotal + deliveryCharge + tax - discount;
  
  const itemCount = cart.reduce((count, cartItem) => {
    return (
      count +
      cartItem.products.reduce((itemCount, item) => itemCount + item.quantity, 0)
    );
  }, 0);

  if (!loading && (!cart.length || cart.every(item => !item.products || !item.products.length))) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16 bg-gray-50">
        <div className="text-center">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <MdOutlineShoppingCart size={48} className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-8 max-w-md">Looks like you haven&apos;t added any products to your cart yet.</p>
          <Link
            to="/pharmacy"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-black hover:bg-gray-900 transition duration-300"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gray-200 rounded-full border-t-black animate-spin"></div>
      </div>
    );
  }

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-50 py-8 antialiased md:py-16"
    >
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Shopping Cart</h1>
            <p className="mt-1 text-sm text-gray-500">{itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart</p>
          </div>
          <Link 
            to="/pharmacy"
            className="mt-4 sm:mt-0 inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            <FiArrowLeft className="mr-2" /> Continue Shopping
          </Link>
        </div>

        <div className="mt-6 grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">Items in your cart</h2>
              </div>

              <div className="divide-y divide-gray-100">
                <AnimatePresence>
                  {cart.map((cartItem) =>
                    cartItem.products.map((item) => (
                      <motion.div
                        layout
                        key={item._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0, marginBottom: 0, padding: 0 }}
                        className={`p-6 transition duration-200 ${removingItem === item._id ? 'opacity-50 bg-red-50' : ''}`}
                      >
                        <div className="flex flex-col sm:flex-row gap-4">
                          {/* Product Image */}
                          <div className="w-24 h-24 bg-gray-50 rounded-md overflow-hidden flex-shrink-0 self-center sm:self-start">
                            <img
                              className="w-full h-full object-contain p-2"
                              src={item.product?.medicineimg}
                              alt={item.product?.name}
                            />
                          </div>

                          {/* Product Details */}
                          <div className="flex-1 flex flex-col sm:flex-row justify-between gap-4">
                            <div>
                              <h3 className="text-base font-medium text-gray-900 mb-1">
                                {item.product?.name}
                              </h3>
                              <p className="text-sm text-gray-500 mb-3">
                                {item.product?.category?.categoryName || "Medicine"}
                              </p>
                              
                              <div className="flex items-center space-x-4">
                              <button
                                type="button"
                                className="inline-flex items-center text-sm font-medium text-red-500 hover:text-red-700"
                                onClick={() => handleRemoveItem(item._id)}
                              >
                                <MdDeleteOutline size={18} className="mr-1" />
                                Remove
                              </button>

                             

                              <Link 
                                to={`/pharmacy/${item.product?.slug}`} 
                                className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-800"
                              >
                                View Details
                              </Link>
                            </div>
                            </div>

                            {/* Price and Quantity */}
                            <div className="flex flex-col sm:items-end gap-3">
                              <div className="flex flex-col sm:items-end">
                                <div className="flex items-center gap-2">
                                  <span className="text-lg font-bold text-gray-900">₹{item.product.discountprice}</span>
                                  {item.product.price > item.product.discountprice && (
                                    <span className="text-sm line-through text-gray-500">₹{item.product.price}</span>
                                  )}
                                </div>
                                
                                {item.product.price > item.product.discountprice && (
                                  <div className="text-xs text-green-600 font-medium">
                                    Save ₹{item.product.price - item.product.discountprice}
                                  </div>
                                )}
                              </div>
                              
                              {/* Quantity Selector */}
                              <div className="flex items-center border border-gray-200 rounded-md">
                                <button
                                  type="button"
                                  className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-l-md"
                                  onClick={() => handleQuantityChange(item._id, "decrease")}
                                  disabled={item.quantity <= 1}
                                >
                                  <span className="text-lg font-medium">−</span>
                                </button>
                                <span className="w-10 text-center text-sm font-medium text-gray-900">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-r-md"
                                  onClick={() => handleQuantityChange(item._id, "increase")}
                                >
                                  <span className="text-lg font-medium">+</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-100 sticky top-24">
              {/* Summary Header */}
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-1">Order Summary</h2>
                <p className="text-sm text-gray-500">{itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart</p>
              </div>

              {/* Price Details */}
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Original Price</span>
                    <span className="text-gray-500">₹{originalPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Savings</span>
                    <span className="text-green-600">-₹{savings}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery</span>
                    {deliveryCharge === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      <span className="font-medium">₹{deliveryCharge}</span>
                    )}
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (5%)</span>
                    <span className="font-medium">₹{tax}</span>
                  </div>
                  
                  {couponApplied && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Coupon Discount</span>
                      <span className="text-green-600">-₹{discount}</span>
                    </div>
                  )}
                </div>

                {/* Total */}
                <div className="flex justify-between pt-4 border-t border-gray-100">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-lg font-bold text-gray-900">₹{totalAmount}</span>
                </div>
              </div>

              {/* Coupon Code */}
              <div className="p-6">
                {showCouponInput ? (
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="flex-1 px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                      />
                      <button
                        type="button"
                        className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                        onClick={applyCoupon}
                      >
                        Apply
                      </button>
                    </div>
                    <button
                      className="text-sm text-gray-500 hover:text-gray-700"
                      onClick={() => setShowCouponInput(false)}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    className={`flex items-center gap-2 text-sm font-medium ${
                      couponApplied 
                        ? "text-green-600" 
                        : "text-blue-600 hover:text-blue-800"
                    }`}
                    onClick={() => !couponApplied && setShowCouponInput(true)}
                  >
                    {couponApplied ? (
                      <>
                        <IoIosCheckmarkCircle size={18} /> Coupon Applied Successfully
                      </>
                    ) : (
                      <>
                        <BiSolidOffer size={18} /> Apply Coupon Code
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Checkout Button */}
              <div className="p-6">
                <button
                  type="button"
                  className="w-full py-3 px-4 bg-black text-white font-medium rounded-md hover:bg-gray-900 transition duration-300 flex items-center justify-center gap-2"
                  onClick={handleCheckout}
                  disabled={processingPayment}
                >
                  {processingPayment ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                      Processing...
                    </>
                  ) : (
                    <>
                      Proceed to Checkout <FiChevronRight />
                    </>
                  )}
                </button>
              </div>

              {/* Payment Methods */}
              <div className="p-6">
                <p className="text-sm font-medium text-gray-900 mb-3">Payment Methods</p>
                <div className="flex flex-wrap gap-2">
                  <div className="bg-gray-100 rounded py-1 px-3">
                    <span className="text-xs font-medium">Khalti</span>
                  </div>
                  <div className="bg-gray-100 rounded py-1 px-3">
                    <span className="text-xs font-medium">Cash on Delivery</span>
                  </div>
                </div>
              </div>

              {/* Delivery Information */}
              <div className="p-6">
                <div className="flex items-start gap-3">
                  <MdOutlineLocalShipping size={20} className="text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Free delivery on orders above ₹599</p>
                    <p className="text-xs text-gray-500 mt-1">Estimated delivery: 2-4 business days</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 mt-4">
                  <FiPackage size={20} className="text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Easy returns</p>
                    <p className="text-xs text-gray-500 mt-1">Return eligible for 15 days after delivery</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Cart;