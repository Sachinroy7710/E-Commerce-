import { Timestamp, addDoc, collection } from "firebase/firestore";
import { useContext, useState } from "react";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { fireDB } from "../../firebase/FirebaseConfig";
import { useNavigate } from "react-router";
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
    { name: 'Personal care' },
    { name: 'Toys' },
    { name: 'Dry Food & More' },
    { name: 'Kitchen & Dining' },
    { name: 'Nutrition & Supplement' },
    { name: 'Makeup & Lifestyle' }
];

const sizeOptions = ['S', 'M', 'L', 'XL', 'XXL'];

const AddProductPage = () => {
    const context = useContext(myContext);
    const { loading, setLoading } = context;

    const navigate = useNavigate();

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
        size: [], // New state field for sizes
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

    // Add Product Function
    const addProductFunction = async () => {
        const { title, price, productImageUrl1, category, description, size, quantity } = product;

        if (!title || !price || !productImageUrl1 || !category || !description) {
            return toast.error("All fields are required, including the first image URL.");
        }

        // Check if size or quantity is required based on the category
        if (['fashion', 'shirt', 'jacket'].includes(category) && size.length === 0) {
            return toast.error("Please select at least one size.");
        }
        
        if (!['fashion', 'shirt', 'jacket'].includes(category) && quantity <= 0) {
            return toast.error("Quantity must be greater than zero for this category.");
        }

        setLoading(true);
        try {
            const productRef = collection(fireDB, 'product');
            await addDoc(productRef, product);
            toast.success("Product added successfully");
            navigate('/admin-dashboard');
        } catch (error) {
            console.log(error);
            toast.error("Failed to add product");
        } finally {
            setLoading(false);
        }
    };

    // Handle size change
    const handleSizeChange = (e) => {
        const { value, checked } = e.target;
        setProduct(prevProduct => {
            const newSize = checked
                ? [...prevProduct.size, value]
                : prevProduct.size.filter(size => size !== value);
            return { ...prevProduct, size: newSize };
        });
    };

    return (
        <div>
            <div className='flex justify-center items-center h-screen'>
                {loading && <Loader />}
                <div className="login_Form bg-pink-50 px-8 py-6 border border-pink-100 rounded-xl shadow-md">
                    <div className="mb-5">
                        <h2 className='text-center text-2xl font-bold text-pink-500'>
                            Add Product
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

                    {/* Product Image URL 1 */}
                    <div className="mb-3">
                        <input
                            type="text"
                            name="productImageUrl1"
                            value={product.productImageUrl1}
                            onChange={(e) => setProduct({ ...product, productImageUrl1: e.target.value })}
                            placeholder='Product Image URL 1'
                            className='bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300'
                        />
                    </div>

                    {/* Product Image URL 2 */}
                    <div className="mb-3">
                        <input
                            type="text"
                            name="productImageUrl2"
                            value={product.productImageUrl2}
                            onChange={(e) => setProduct({ ...product, productImageUrl2: e.target.value })}
                            placeholder='Product Image URL 2'
                            className='bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300'
                        />
                    </div>

                    {/* Product Image URL 3 */}
                    <div className="mb-3">
                        <input
                            type="text"
                            name="productImageUrl3"
                            value={product.productImageUrl3}
                            onChange={(e) => setProduct({ ...product, productImageUrl3: e.target.value })}
                            placeholder='Product Image URL 3'
                            className='bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300'
                        />
                    </div>

                    {/* Product Image URL 4 */}
                    <div className="mb-3">
                        <input
                            type="text"
                            name="productImageUrl4"
                            value={product.productImageUrl4}
                            onChange={(e) => setProduct({ ...product, productImageUrl4: e.target.value })}
                            placeholder='Product Image URL 4'
                            className='bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300'
                        />
                    </div>

                    {/* Product Image URL 5 */}
                    <div className="mb-3">
                        <input
                            type="text"
                            name="productImageUrl5"
                            value={product.productImageUrl5}
                            onChange={(e) => setProduct({ ...product, productImageUrl5: e.target.value })}
                            placeholder='Product Image URL 5'
                            className='bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300'
                        />
                    </div>

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

                    {/* Product Sizes or Quantity */}
                    <div className="mb-3">
                        {['fashion', 'shirt', 'jacket'].includes(product.category) ? (
                            <>
                                <p className="text-pink-500 font-semibold">Select Sizes:</p>
                                {sizeOptions.map((size, index) => (
                                    <label key={index} className="inline-flex items-center mr-4">
                                        <input
                                            type="checkbox"
                                            value={size}
                                            checked={product.size.includes(size)}
                                            onChange={handleSizeChange}
                                            className="form-checkbox text-pink-500"
                                        />
                                        <span className="ml-2 text-pink-300">{size}</span>
                                    </label>
                                ))}
                            </>
                        ) : (
                            <div>
                                <label className="text-pink-500 font-semibold">Quantity:</label>
                                <input
                                    type="number"
                                    value={product.quantity}
                                    onChange={(e) => setProduct({ ...product, quantity: parseInt(e.target.value) })}
                                    min="1"
                                    className='bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-full rounded-md outline-none placeholder-pink-300'
                                />
                            </div>
                        )}
                    </div>

                    {/* Add Product Button */}
                    <div className="mb-3">
                        <button
                            onClick={addProductFunction}
                            type='button'
                            className='bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md'>
                            Add Product
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProductPage;
