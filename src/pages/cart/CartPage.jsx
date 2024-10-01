import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/layout/Layout";
import { Trash } from 'lucide-react';
import { decrementQuantity, deleteFromCart, incrementQuantity, setCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import BuyNowModal from "../../components/buyNowModal/BuyNowModal";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Load cart items from local storage on page load
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart'));
        if (savedCart) {
            dispatch(setCart(savedCart));
        }
    }, [dispatch]);

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Deleted from cart");
    };

    const handleIncrement = (id) => {
        const item = cartItems.find(item => item.id === id);
        if (item && item.quantity < 5) {
            dispatch(incrementQuantity(id));
        } else if (item && item.quantity >= 5) {
            toast.error("Maximum quantity of 5 reached for this item");
        }
    };

    const handleDecrement = (id) => {
        const item = cartItems.find(item => item.id === id);
        if (item && item.quantity > 1) {
            dispatch(decrementQuantity(id));
        } else if (item && item.quantity <= 1) {
            toast.error("Quantity cannot be less than 1");
        }
    };

    const cartItemTotal = cartItems.reduce((total, item) => total + item.quantity, 0);
    const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const user = JSON.parse(localStorage.getItem('users'));

    const [addressInfo, setAddressInfo] = useState({
        name: "",
        address: "",
        pincode: "",
        mobileNumber: "",
        time: new Date().toISOString(),
        date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
        })
    });

    const buyNowFunction = async () => {
        if (!addressInfo.name || !addressInfo.address || !addressInfo.pincode || !addressInfo.mobileNumber) {
            return toast.error("All fields are required");
        }

        try {
            const options = {
                key: "rzp_test_vCc2ouXg6nO6Xl",
                amount: parseInt(cartTotal * 100),
                currency: "INR",
                order_receipt: 'order_rcptid_' + new Date().getTime(),
                name: "E-Bharat",
                description: "For testing purpose",
                handler: async function (response) {
                    const paymentId = response.razorpay_payment_id;

                    const orderInfo = {
                        cartItems,
                        addressInfo: {
                            ...addressInfo,
                            time: Timestamp.now()
                        },
                        email: user.email,
                        userid: user.uid,
                        status: "confirmed",
                        date: new Date().toLocaleString("en-US", {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                        }),
                        paymentId
                    };

                    try {
                        const orderRef = collection(fireDB, 'order');
                        await addDoc(orderRef, orderInfo);

                        // Clear the cart in Redux and local storage
                        dispatch(setCart([])); // Clear the cart in Redux
                        localStorage.setItem('cart', JSON.stringify([])); // Clear local storage

                        setAddressInfo({
                            name: "",
                            address: "",
                            pincode: "",
                            mobileNumber: "",
                        });

                        toast.success("Order placed successfully");
                        navigate('/user-dashboard');
                    } catch (error) {
                        console.error("Error placing order:", error);
                        toast.error("Error placing order");
                    }
                },
                theme: {
                    color: "#3399cc"
                }
            };

            const pay = new window.Razorpay(options);
            pay.open();
        } catch (error) {
            console.error("Error with payment:", error);
            toast.error("Error with payment");
        }
    };

    return (
        <Layout>
            <div className="container mx-auto px-4 max-w-7xl lg:px-0">
                <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>
                    <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                        <section aria-labelledby="cart-heading" className="rounded-lg bg-white lg:col-span-8">
                            <h2 id="cart-heading" className="sr-only">Items in your shopping cart</h2>
                            <ul role="list" className="divide-y divide-gray-200">
                                {cartItems.length > 0 ? 
                                    cartItems.map((item) => (
                                        <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
                                            <li className="flex py-6 sm:py-6">
                                                <div className="flex-shrink-0">
                                                    <img
                                                        src={item.productImageUrl1}
                                                        alt="Product"
                                                        className="sm:h-38 sm:w-38 h-24 w-24 rounded-md object-contain object-center"
                                                    />
                                                </div>
                                                <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                                                    <div className="relative sm:grid sm:grid-cols-2 sm:gap-x-6">
                                                        <div>
                                                            <h3 className="text-sm">
                                                                <p className="text-lg font-medium text-gray-700 hover:text-gray-800">{item.title}</p>
                                                            </h3>
                                                            {(item.category === "Shirt" || item.category === "Fashion" || item.category === "Jacket") && (
                                                                <p className="mt-1 text-sm text-gray-500">Size: {item.size}</p>
                                                            )}
                                                            <p className="text-lg mt-2 font-semibold text-gray-700">
                                                                {item.price.toLocaleString("en-IN", { style: "currency", currency: "INR" })}
                                                            </p>
                                                            <p className="text-sm font-medium text-gray-500 mt-1">Quantity: {item.quantity}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center justify-between mt-3">
                                                        <button
                                                            onClick={() => handleDecrement(item.id)}
                                                            className="px-3 py-2 bg-gray-200 text-sm rounded-full font-semibold hover:bg-gray-300"
                                                        >
                                                            -
                                                        </button>
                                                        <p className="px-4 py-2 text-lg font-semibold">{item.quantity}</p>
                                                        <button
                                                            onClick={() => handleIncrement(item.id)}
                                                            className="px-3 py-2 bg-gray-200 text-sm rounded-full font-semibold hover:bg-gray-300"
                                                        >
                                                            +
                                                        </button>
                                                        <button
                                                            onClick={() => deleteCart(item)}
                                                            className="px-3 py-2 bg-red-500 text-white text-sm rounded-full ml-4 font-semibold hover:bg-red-600"
                                                        >
                                                            <Trash className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </li>
                                        </div>
                                    ))
                                    :
                                    <div className="mt-6 text-center">
                                        <p className="text-xl font-semibold text-gray-700">Your cart is empty!</p>
                                    </div>
                                }
                            </ul>
                        </section>

                        {/* Order Summary */}
                        <section
                            aria-labelledby="summary-heading"
                            className="mt-16 rounded-lg bg-gray-100 px-4 py-6 sm:p-6 lg:col-span-4 lg:mt-0 lg:p-8"
                        >
                            <h2 id="summary-heading" className="text-lg font-medium text-gray-900">Order summary</h2>

                            <dl className="mt-6 space-y-4">
                                <div className="flex items-center justify-between">
                                    <dt className="text-sm text-gray-600">Item Total:</dt>
                                    <dd className="text-lg font-medium text-gray-900">{cartItemTotal} Items</dd>
                                </div>

                                <div className="flex items-center justify-between">
                                    <dt className="text-sm text-gray-600">Subtotal:</dt>
                                    <dd className="text-lg font-medium text-gray-900">{cartTotal.toLocaleString("en-IN", { style: "currency", currency: "INR" })}</dd>
                                </div>

                                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                    <dt className="text-base font-medium text-gray-900">Total:</dt>
                                    <dd className="text-lg font-bold text-gray-900">{cartTotal.toLocaleString("en-IN", { style: "currency", currency: "INR" })}</dd>
                                </div>
                            </dl>

                            <BuyNowModal buyNowFunction={buyNowFunction} setAddressInfo={setAddressInfo} addressInfo={addressInfo} />
                        </section>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default CartPage;
