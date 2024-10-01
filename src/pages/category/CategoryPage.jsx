import { useNavigate, useParams } from "react-router";
import Layout from "../../components/layout/Layout";
import { useContext, useEffect, useState } from "react";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";

const CategoryPage = () => {
    const { categoryname } = useParams();
    const context = useContext(myContext);
    const { getAllProduct, loading } = context;
    const navigate = useNavigate();

    const filterProduct = getAllProduct.filter((obj) => obj.category.includes(categoryname));
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const [selectedSize, setSelectedSize] = useState({});
    const [showSizeDropdown, setShowSizeDropdown] = useState({});

    const handleSizeSelection = (id, size) => {
        setSelectedSize((prev) => ({ ...prev, [id]: size }));
    };

    const handleShowSizeDropdown = (id) => {
        setShowSizeDropdown((prev) => ({ ...prev, [id]: true }));
    };

    const addCart = (item) => {
        if (["Shirt", "Jacket", "Fashion"].includes(item.category)) {
            if (!selectedSize[item.id]) {
                toast.error("Please select a size before adding to cart");
                return;
            }
            item = { ...item, size: selectedSize[item.id] };
        }

        dispatch(addToCart(item));
        toast.success("Added to cart");
        navigate(`/productinfo/${item.id}`);
    };

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Removed from cart");
    };

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <Layout>
            <div className="mt-10">
                <div className="">
                    <h1 className="text-center mb-5 text-2xl font-semibold first-letter:uppercase">{categoryname}</h1>
                </div>

                {loading ? (
                    <div className="flex justify-center">
                        <Loader />
                    </div>
                ) : (
                    <section className="text-gray-600 body-font">
                        <div className="container px-5 py-5 mx-auto">
                            <div className="flex flex-wrap -m-4 justify-center">
                                {filterProduct.length > 0 ? (
                                    <>
                                        {filterProduct.map((item, index) => {
                                            const { id, title, price, productImageUrl1, category } = item;
                                            return (
                                                <div key={index} className="p-4 w-full md:w-1/4">
                                                    <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer">
                                                        <img
                                                            onClick={() => navigate(`/productinfo/${id}`)}
                                                            className="lg:h-80 h-96 w-full"
                                                            src={productImageUrl1}
                                                            alt="product"
                                                        />
                                                        <div className="p-6">
                                                            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                                                                E-bharat
                                                            </h2>
                                                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                                                {title.substring(0, 25)}
                                                            </h1>
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
                                                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                                                ₹{price}
                                                            </h1>

                                                            {/* Show size options if Add to Cart is clicked for size-requiring categories */}
                                                            {showSizeDropdown[id] && ["Shirt", "Jacket", "Fashion"].includes(category) && (
                                                                <div className="mb-3">
                                                                    <select
                                                                        value={selectedSize[id] || ""}
                                                                        onChange={(e) => handleSizeSelection(id, e.target.value)}
                                                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-pink-500 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm rounded-md"
                                                                    >
                                                                        <option value="">Select Size</option>
                                                                        <option value="S">S</option>
                                                                        <option value="M">M</option>
                                                                        <option value="L">L</option>
                                                                        <option value="XL">XL</option>
                                                                        <option value="XXL">XXL</option>
                                                                    </select>
                                                                </div>
                                                            )}

                                                            <div className="flex justify-center">
                                                                {cartItems.some((p) => p.id === item.id) ? (
                                                                    <button
                                                                        onClick={() => deleteCart(item)}
                                                                        className="bg-red-700 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold">
                                                                        Delete From Cart
                                                                    </button>
                                                                ) : (
                                                                    // Remove "Add to Cart" button for size-requiring categories
                                                                    !["Shirt", "Jacket", "Fashion"].includes(category) && (
                                                                        <button
                                                                            onClick={() => addCart(item)}
                                                                            className="bg-pink-500 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold">
                                                                            Add To Cart
                                                                        </button>
                                                                    )
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </>
                                ) : (
                                    <div>
                                        <div className="flex justify-center">
                                            <img className="mb-2" src="https://cdn-icons-png.flaticon.com/128/2748/2748614.png" alt="no product" />
                                        </div>
                                        <h1 className="text-black text-xl">No {categoryname} product found</h1>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </Layout>
    );
};

export default CategoryPage;
