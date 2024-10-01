import { useNavigate } from "react-router";
import Layout from "../../components/layout/Layout";
import { useContext, useState } from "react";
import myContext from "../../context/myContext";

const AllProduct = () => {
    const navigate = useNavigate();
    const context = useContext(myContext);
    const { getAllProduct } = context;

    return (
        <Layout>
            <div className="py-8">
                {/* Heading */}
                <div>
                    <h1 className="text-center mb-5 text-2xl font-semibold">All Products</h1>
                </div>

                {/* Main section */}
                <section className="text-gray-600 body-font">
                    <div className="container px-5 lg:px-0 py-5 mx-auto">
                        <div className="flex flex-wrap -m-4">
                            {getAllProduct.map((item, index) => {
                                const { id, title, price, productImageUrl1, productType } = item;
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
                                                <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                                    ₹{price}
                                                </h1>
                                         {/* Rating system */}
                                                            
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
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default AllProduct;
