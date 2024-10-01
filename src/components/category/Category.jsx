import { useNavigate } from "react-router";
import React from 'react';

const category = [
    { image: 'https://cdn-icons-png.flaticon.com/256/4359/4359963.png', name: 'Fashion' },
    { image: 'https://cdn-icons-png.flaticon.com/256/11833/11833323.png', name: 'Shirt' },
    { image: 'https://cdn-icons-png.flaticon.com/256/8174/8174424.png', name: 'Jacket' },
    { image: 'https://cdn-icons-png.flaticon.com/256/7648/7648246.png', name: 'Mobile' },
    { image: 'https://cdn-icons-png.flaticon.com/256/12142/12142416.png', name: 'Laptop' },
    { image: 'https://cdn-icons-png.flaticon.com/256/10686/10686553.png', name: 'Shoes' },
    { image: 'https://cdn-icons-png.flaticon.com/128/11496/11496770.png', name: 'Medicine' },
    { image: 'https://cdn-icons-png.flaticon.com/256/11946/11946316.png', name: 'Books' },
    { image: 'https://cdn-icons-png.flaticon.com/256/12114/12114279.png', name: 'Electronic' },
    { image: 'https://cdn-icons-png.flaticon.com/128/2251/2251911.png', name: 'Furniture' },
    { image: 'https://cdn-icons-png.flaticon.com/128/2811/2811395.png', name: 'Personal Care' },
    { image: 'https://cdn-icons-png.flaticon.com/128/4287/4287397.png', name: 'Toys' },
    { image: 'https://cdn-icons-png.flaticon.com/128/7192/7192728.png', name: 'Dry Food & More' },
    { image: 'https://cdn-icons-png.flaticon.com/128/7540/7540904.png', name: 'Kitchen & Dining' },
    { image: 'https://cdn-icons-png.flaticon.com/128/5479/5479002.png', name: 'Nutrition & Supplement' },
    { image: 'https://cdn-icons-png.flaticon.com/128/3501/3501241.png', name: 'Makeup & Lifestyle' },
    { image: 'https://cdn-icons-png.flaticon.com/128/7192/7192728.png', name: 'Dry Food & More' },
    { image: 'https://cdn-icons-png.flaticon.com/128/7540/7540904.png', name: 'Kitchen & Dining' },
    { image: 'https://cdn-icons-png.flaticon.com/128/5479/5479002.png', name: 'Nutrition & Supplement' },
    { image: 'https://cdn-icons-png.flaticon.com/128/3501/3501241.png', name: 'Makeup & Lifestyle' }
];

const Category = () => {
    const navigate = useNavigate();
    return (
        <div className="mt-5">
            <div className="grid grid-cols-5 sm:grid-cols-5 lg:grid-cols-10 gap-2">
                {category.map((item, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <div
                            onClick={() => navigate(`/category/${item.name}`)}
                            className="w-20 h-20 lg:w-24 lg:h-24 max-w-xs rounded-full bg-pink-500 transition-all 
                            hover:bg-pink-300 cursor-pointer mb-2 flex items-center justify-center"
                        >
                            <img src={item.image} alt={item.name} className="w-14 h-14 lg:w-18 lg:h-18" />
                        </div>
                        <h1 className="text-sm lg:text-lg text-center font-medium title-font">{item.name}</h1>
                    </div>
                ))}
            </div>

            <style 
                dangerouslySetInnerHTML={{ 
                    __html: `
                        .hide-scroll-bar {
                            -ms-overflow-style: none;
                            scrollbar-width: none;
                        }
                        .hide-scroll-bar::-webkit-scrollbar {
                            display: none;
                        }
                    ` 
                }} 
            />
        </div>
    );
}

export default Category;
