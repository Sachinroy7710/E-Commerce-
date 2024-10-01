import { useNavigate, useParams } from "react-router";
import myContext from "../../context/myContext";
import { useContext, useEffect, useState } from "react";
import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";

const categoryList = [
    { name: 'Fashion' },
    { name: 'Shirt' },
    { name: 'Jacket' },
    { name: 'Mobile' },
    { name: 'Laptop' },
    { name: 'Shoes' },
    { name: 'Medicine' },
    { name: 'Books' },
    { name: 'Electronic' },
    { name: 'Furniture' },
    { name: 'Personal Care' },
    { name: 'Toys' },
    { name: 'Dry Food & More' },
    { name: 'Kitchen & Dining' },
    { name: 'Nutrition & Supplement' },
    { name: 'Makeup & Lifestyle' }
];

const sizeOptions = ['S', 'M', 'L', 'XL', 'XXL'];

const UpdateProductPage = () => {
    const context = useContext(myContext);
    const { loading, setLoading, getAllProductFunction } = context;

    const navigate = useNavigate();
    const { id } = useParams();

    // product state
    const [product, setProduct] = useState({
        title: "",
        price: "",
        productImageUrl1: "",
        productImageUrl2: "",
        productImageUrl3: "",
        productImageUrl4: "",
        productImageUrl5: "",
        category: "",
        description: "",
        quantity: 1,
        sizes: [],
        time: Timestamp.now(),
        date: new Date().toLocaleString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric",
            }
        )
    });

    // Get Single Product Function
    const getSingleProductFunction = async () => {
        setLoading(true);
        try {
            const productDoc = await getDoc(doc(fireDB, "product", id));
            const productData = productDoc.data();
            setProduct({
                title: productData?.title || "",
                price: productData?.price || "",
                productImageUrl1: productData?.productImageUrl1 || "",
                productImageUrl2: productData?.productImageUrl2 || "",
                productImageUrl3: productData?.productImageUrl3 || "",
                productImageUrl4: productData?.productImageUrl4 || "",
                productImageUrl5: productData?.productImageUrl5 || "",
                category: productData?.category || "",
                description: productData?.description || "",
                quantity: productData?.quantity || 1,
                sizes: productData?.sizes || [],
                time: productData?.time || Timestamp.now(),
                date: productData?.date || new Date().toLocaleString(
                    "en-US",
                    {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                    }
                )
            });
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch product details");
        } finally {
            setLoading(false);
        }
    };

    const updateProduct = async () => {
        setLoading(true);
        try {
            await setDoc(doc(fireDB, 'product', id), product);
            toast.success("Product updated successfully");
            getAllProductFunction();
            navigate('/admin-dashboard');
        } catch (error) {
            console.error(error);
            toast.error("Failed to update product");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getSingleProductFunction();
    }, [id]);

    const handleSizeChange = (e) => {
        const { value, checked } = e.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            sizes: checked
                ? [...prevProduct.sizes, value]
                : prevProduct.sizes.filter(size => size !== value)
        }));
    };

    return (
        <div>
            <div className='flex justify-center items-center h-screen'>
                {loading && <Loader />}
                <div className="login_Form bg-pink-50 px-8 py-6 border border-pink-100 rounded-xl shadow-md">
                    <div className="mb-5">
                        <h2 className='text-center text-2xl font-bold text-pink-500'>
                            Update Product
                        </h2>
                    </div>

                    {/* Product Title */}
                    <div className="mb-3">
                        <input
                            type="text"
                            name="title"
                            value={product.title}
                            onChange={(e) => setProduct({ ...product, title: e.target.value })}
                            placeholder='Product Title'
                            className='bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300'
                        />
                    </div>

                    {/* Product Price */}
                    <div className="mb-3">
                        <input
                            type="number"
                            name="price"
                            value={product.price}
                            onChange={(e) => setProduct({ ...product, price: e.target.value })}
                            placeholder='Product Price'
                            className='bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300'
                        />
                    </div>

                    {/* Product Image URLs */}
                    {Array.from({ length: 5 }, (_, index) => (
                        <div key={index} className="mb-3">
                            <input
                                type="text"
                                name={`productImageUrl${index + 1}`}
                                value={product[`productImageUrl${index + 1}`]}
                                onChange={(e) => setProduct({ ...product, [`productImageUrl${index + 1}`]: e.target.value })}
                                placeholder={`Product Image URL ${index + 1}`}
                                className='bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300'
                            />
                        </div>
                    ))}

                    {/* Product Category */}
                    <div className="mb-3">
                        <select
                            value={product.category}
                            onChange={(e) => setProduct({ ...product, category: e.target.value })}
                            className="w-full px-1 py-2 text-pink-300 bg-pink-50 border border-pink-200 rounded-md outline-none">
                            <option disabled>Select Product Category</option>
                            {categoryList.map((value, index) => (
                                <option key={index} value={value.name}>{value.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Product Sizes */}
                    {['fashion', 'shirt', 'jacket'].includes(product.category.toLowerCase()) && (
                        <div className="mb-3">
                            <fieldset className="flex flex-wrap gap-4">
                                <legend className="text-sm font-medium text-gray-700">Available Sizes</legend>
                                {sizeOptions.map((size, index) => (
                                    <div key={index} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={`size-${size}`}
                                            value={size}
                                            checked={product.sizes.includes(size)}
                                            onChange={handleSizeChange}
                                            className="mr-2"
                                        />
                                        <label htmlFor={`size-${size}`} className="text-gray-700">{size}</label>
                                    </div>
                                ))}
                            </fieldset>
                        </div>
                    )}

                    {/* Product Description */}
                    <div className="mb-3">
                        <textarea
                            value={product.description}
                            onChange={(e) => setProduct({ ...product, description: e.target.value })}
                            name="description"
                            placeholder="Product Description"
                            rows="5"
                            className="w-full px-2 py-1 text-pink-300 bg-pink-50 border border-pink-200 rounded-md outline-none placeholder-pink-300"
                        ></textarea>
                    </div>

                    {/* Update Product Button */}
                    <div className="mb-3">
                        <button
                            onClick={updateProduct}
                            type='button'
                            className='bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md'
                        >
                            Update Product
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProductPage;
