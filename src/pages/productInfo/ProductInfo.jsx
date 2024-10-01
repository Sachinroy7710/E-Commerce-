import { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/myContext";
import { useParams } from "react-router";
import { fireDB } from "../../firebase/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";

const ProductInfo = () => {
    const context = useContext(myContext);
    const { loading, setLoading } = context;

    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [rating, setRating] = useState(0); // State for rating
    const { id } = useParams();

    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart);

    const getProductData = async () => {
        setLoading(true);
        try {
            const productDoc = await getDoc(doc(fireDB, "product", id));
            if (productDoc.exists()) {
                setProduct({ ...productDoc.data(), id: productDoc.id });
            } else {
                console.log("No such document!");
                toast.error("Product not found.");
            }
        } catch (error) {
            console.log(error);
            toast.error("Error fetching product data.");
        } finally {
            setLoading(false);
        }
    };

    const addCart = (item) => {
        if (["shirt", "fashion", "jacket"].includes(product.category?.toLowerCase())) {
            if (!selectedSize) {
                return toast.error("Please select a size");
            }
            dispatch(addToCart({ ...item, size: selectedSize, quantity: 1 }));
        } else {
            dispatch(addToCart({ ...item, quantity }));
        }
        toast.success("Added to cart");
    };

    const deleteCart = (item) => {
        dispatch(deleteFromCart({ ...item, size: selectedSize }));
        toast.success("Removed from cart");
    };

    useEffect(() => {
        getProductData();
    }, [id]);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const handleQuantityChange = (e) => {
        const value = Math.max(1, Math.min(5, e.target.value));
        setQuantity(value);
    };

    // const handleRating = (rate) => {
        // setRating(rate);
        // toast.success(`Thanks for your rating of ${rate} stars!`);
        // Save rating to database if needed
    // };

    if (loading) {
        return (
            <Layout>
                <div className="flex justify-center items-center">
                    <Loader />
                </div>
            </Layout>
        );
    }

    if (!product) {
        return (
            <Layout>
                <div className="flex justify-center items-center">
                    <p>Product not found</p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <section className="py-5 lg:py-16 font-poppins dark:bg-gray-800">
                <div className="max-w-6xl px-4 mx-auto">
                    <div className="flex flex-wrap mb-24 -mx-4">
                        <div className="w-full px-4 md:w-1/2 mb-8 md:mb-0">
                            <div className="flex flex-col">
                                <img
                                    className="w-full lg:h-[29em] rounded-lg mb-4"
                                    src={product.productImageUrl1}
                                    alt={`${product.title} Main Image`}
                                />
                                <div className="flex space-x-4">
                                    {[product.productImageUrl2, product.productImageUrl3, product.productImageUrl4, product.productImageUrl5].map((url, index) => (
                                        url && (
                                            <img
                                                key={index}
                                                className="w-20 h-20 object-cover rounded-lg cursor-pointer"
                                                src={url}
                                                alt={`${product.title} Thumbnail ${index + 2}`}
                                                onClick={() => setProduct(prevProduct => ({ ...prevProduct, productImageUrl1: url }))}
                                            />
                                        )
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="w-full px-4 md:w-1/2">
                            <div className="lg:pl-20">
                                <div className="mb-6">
                                    <h2 className="max-w-xl mb-6 text-xl font-semibold leading-loose tracking-wide text-gray-700 md:text-2xl dark:text-gray-300">
                                        {product.title}
                                    </h2>
                                    <p className="inline-block text-2xl font-semibold text-gray-700 dark:text-gray-400">
                                        <span>₹ {product.price}</span>
                                    </p>
                                </div>

                                {/* Rating Display */}
                                        <div className="flex flex-wrap items-center mb-6">
                                                <ul className="flex mb-4 mr-2 lg:mb-0">
                                            {[...Array(5)].map((_, i) => (
                                                <li key={i}>
                                                    <a href="">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width={16}
                                                            height={16}
                                                            fill="currentColor"
                                                            className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star"
                                                            viewBox="0 0 16 16"
                                                        >
                                                            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 
                                                            4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 
                                                            3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 
                                                            0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 
                                                            4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 
                                                            6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 
                                                            0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 
                                                            3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path>
                                                        </svg>
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                <div className="mb-6">
                                    <h2 className="mb-2 text-lg font-bold text-gray-700 dark:text-gray-400">
                                        Description:
                                    </h2>
                                    <p>{product.description}</p>
                                </div>

                                {["shirt", "fashion", "jacket"].includes(product.category?.toLowerCase()) ? (
                                    <div className="mb-6">
                                        <h2 className="mb-2 text-lg font-bold text-gray-700 dark:text-gray-400">
                                            Size:
                                        </h2>
                                        <select
                                            className="form-select block w-full mt-1 bg-pink-500 text-white"
                                            value={selectedSize}
                                            onChange={(e) => setSelectedSize(e.target.value)}
                                        >
                                            <option value="">Select Size</option>
                                            {product.sizes.map((size, index) => (
                                                <option key={index} value={size}>{size}</option>
                                            ))}
                                        </select>
                                    </div>
                                ) : (
                                    <div className="mb-6">
                                        <h2 className="mb-2 text-lg font-bold text-gray-700 dark:text-gray-400">
                                            Quantity:
                                        </h2>
                                        <input
                                            type="number"
                                            min="1"
                                            max="5"
                                            value={quantity}
                                            onChange={handleQuantityChange}
                                            className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg"
                                        />
                                    </div>
                                )}

                                <div className="mb-6 flex space-x-4">
                                    {cartItems.some((p) => p.id === product.id && p.size === selectedSize) ? (
                                        <>
                                            <button
                                                onClick={() => deleteCart(product)}
                                                className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
                                            >
                                                Remove from Cart
                                            </button>
                                            {/* <button */}
                                                {/* // onClick={() => addCart(product)} */}
                                                {/* // className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600" */}
                                            {/* // > */}
                                                {/* Add Another */}
                                            {/* </button> */}
                                        </> 
                                    ) : (
                                        <button
                                            onClick={() => addCart(product)}
                                            className={`px-4 py-2 text-white rounded-lg hover:bg-green-600 ${["shirt", "fashion", "jacket"].includes(product.category?.toLowerCase()) && !selectedSize ? "bg-gray-400 cursor-not-allowed" : "bg-green-500"}`}
                                            disabled={["shirt", "fashion", "jacket"].includes(product.category?.toLowerCase()) && !selectedSize}
                                        >
                                            Add to Cart
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default ProductInfo;
