import { useState, useEffect } from "react";
import { MdDeleteOutline } from "react-icons/md";
import axios from 'axios';
import AuthStore from "../hooks/authStore"; // Import the AuthStore

const Cart = () => {
    
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userid = AuthStore.getUser()?.userid || null;
        const response = await axios.get(`http://localhost:8000/api/cart/getcartdetails/${userid}`);
        setCart(response.data.cartdetails);
      } catch (err) {
        console.log(err)
      }
    };

    fetchData();
  }, []); // Runs once when component mounts


  const handleQuantityChange = (productId, type) => {
    setCart((prevCart) =>
      prevCart.map((cartItem) => ({
        ...cartItem,
        products: cartItem.products.map((item) =>
          item._id === productId
            ? {
                ...item,
                quantity:
                  type === "increase" ? item.quantity + 1 : Math.max(1, item.quantity - 1),
              }
            : item
        ),
      }))
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, cartItem) => {
      return total + cartItem.products.reduce(
        (subtotal, item) => subtotal + item.product.discountprice * item.quantity,
        0
      );
    }, 0);
  };
  

 
  
  return (
    <section className="bg-white py-8 antialiased md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">Shopping Cart</h2>
        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
          <div className="space-y-6">
      {cart.map((cartItem) =>
        cartItem.products.map((item) => (
          <div key={item._id} className="rounded-lg bg-white p-4 md:p-6 transition-[0.3s] shadow-sm hover:shadow-doc hover:cursor-pointer">
            <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
              
              {/* Product Image */}
              <a href="#" className="shrink-0 md:order-1">
                <img
                  className="h-20 w-20 object-cover rounded-md"
                  src={item.product.medicineimg}
                  alt={item.product.name}
                />
              </a>

              {/* Quantity Counter */}
              <label htmlFor="counter-input" className="sr-only">
                Choose quantity:
              </label>
              <div className="flex items-center justify-between md:order-3 md:justify-end">
                <div className="flex items-center">
                  <button
                    type="button"
                    className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
                    onClick={() => handleQuantityChange(item._id, "decrease")}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0"
                    value={item.quantity}
                    readOnly
                  />
                  <button
                    type="button"
                    className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
                    onClick={() => handleQuantityChange(item._id, "increase")}
                  >
                    +
                  </button>
                </div>

                {/* Price */}
                <div className="text-end md:order-4 md:w-32">
                  <p className="text-base font-bold text-gray-900">Rs. {item.product.discountprice}/-</p>
                </div>
              </div>

              {/* Product Info */}
              <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                <a href="#" className="text-base font-medium text-gray-900 hover:underline">
                  {item.product.name}
                </a>
                <div className="flex items-center gap-4">
                  {/* Remove Button */}
                  <button
                    type="button"
                    className="inline-flex items-center text-sm font-medium text-red-500 transition-[0.3s] hover:text-red-600 hover:scale-[1.09]"
                    // onClick={() => handleRemove(item._id)}
                  >
                    <MdDeleteOutline size={21} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
          </div>
          <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 sm:p-6">
              <p className="text-xl font-semibold text-gray-900">Order summary</p>
              <div className="space-y-4">
                <div className="space-y-2">
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500">Original price</dt>
                    <dd className="text-base font-medium text-gray-900">Rs.{getTotalPrice()}/-</dd>
                  </dl>
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500">Savings</dt>
                    <dd className="text-base font-medium text-green-600">-Rs.0/-</dd>
                  </dl>
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500">Delivery Charge</dt>
                    <dd className="text-base font-medium text-gray-900">Rs.100/-</dd>
                  </dl>
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500">Tax</dt>
                    <dd className="text-base font-medium text-gray-900">Rs.90/-</dd>
                  </dl>
                </div>
                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
                  <dt className="text-base font-bold text-gray-900">Total</dt>
                  <dd className="text-base font-bold text-gray-900">Rs.{getTotalPrice() + 100 + 90}/-</dd>
                </dl>
              </div>
              <a
                href="#"
                className="flex w-full items-center justify-center rounded-md bg-primary-700 px-5 py-2.5 text-sm font-medium text-black border-2 border-black hover:text-white hover:bg-black transition-[0.4s] focus:outline-none focus:ring-4 focus:ring-primary-300"
              >
                Proceed to Checkout
              </a>
              <div className="flex items-center justify-center gap-2">
                <span className="text-sm font-normal text-gray-500">or</span>
                <a
                  href="/allmedicines"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline"
                >
                  Continue Shopping
                  <svg
                    className="h-5 w-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5m14 0-4 4m4-4-4-4" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
