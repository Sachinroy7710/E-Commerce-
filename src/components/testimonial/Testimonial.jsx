import React from 'react';
import img1 from "../../assets/shivam.jpeg";  
import img2 from "../../assets/sachin.jpeg";
import img3 from '../../assets/nikhil.jpeg';

const Testimonial = () => {
    return (
        <div>
            <style>
                {`
                    .rating {
                        font-size: 24px;
                        color: orange; 
                    }
                `}
            </style>

            <section className="text-gray-600 body-font mb-10">
                {/* main */}
                <div className="container px-5 py-10 mx-auto">
                    {/* Heading */}
                    <h1 className=' text-center text-3xl font-bold text-black'>Testimonial</h1>
                    {/* para */}
                    <h2 className=' text-center text-2xl font-semibold mb-10'>What our <span className=' text-pink-500'>customers</span> are saying</h2>

                    <div className="flex flex-wrap -m-4">
                        {/* Testimonial 1 */}
                        <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
                            <div className="h-full text-center">
                                <img alt="testimonial" className="w-20 h-20 mb-8 object-cover object-center rounded-full 
                                    inline-block border-2 border-gray-200 bg-gray-100 transition-transform 
                                    duration-300 ease-in-out hover:scale-110 hover:shadow-lg"
                                    src={img1} />
                                <p className="rating">★★★★★</p>
                                <p className="leading-relaxed">I was impressed with the fast shipping and the quality of the product. 
                                    The website is well-organized, making it easy to find what I needed.</p>
                                <span className="inline-block h-1 w-10 rounded bg-pink-500 mt-6 mb-4" />
                                <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">Kumar Shivam</h2>
                                <p className="text-gray-500">Senior Product Designer</p>
                                <p className="feedback-date">July 10, 2024</p>
                            </div>
                        </div>

                        {/* Testimonial 2 */}
                        <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
                            <div className="h-full text-center">
                                <img alt="testimonial" className="w-20 h-20 mb-8 object-cover object-center rounded-full 
                                    inline-block border-2 border-gray-200 bg-gray-100 transition-transform 
                                    duration-300 ease-in-out hover:scale-110 hover:shadow-lg"
                                    src={img2} />
                                <p className="rating">★★★★★</p>
                                <p className="leading-relaxed">Great customer service! I had a question about my order, 
                                    and it was resolved quickly. The website is very user-friendly, and I love the design.".</p>
                                <span className="inline-block h-1 w-10 rounded bg-pink-500 mt-6 mb-4" />
                                <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">Sachin Roy</h2>
                                <p className="text-gray-500">UI Developer</p>
                                <p className="feedback-date">July 30, 2024</p>
                            </div>
                        </div>

                        {/* Testimonial 3 */}
                        <div className="lg:w-1/3 lg:mb-0 p-4">
                            <div className="h-full text-center">
                                <img alt="testimonial" className="w-20 h-20 mb-8 object-cover object-center rounded-full 
                                    inline-block border-2 border-gray-200 bg-gray-100 transition-transform 
                                    duration-300 ease-in-out hover:scale-110 hover:shadow-lg" 
                                    src={img3}/>
                                    <p className="rating">★★★★</p>
                                <p className="leading-relaxed">The product quality is excellent, and I love how easy 
                                    it is to navigate the website. Shopping here was a great experience.</p>
                                <span className="inline-block h-1 w-10 rounded bg-pink-500 mt-6 mb-4" />
                                <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">Nikhil Kumar </h2>
                                <p className="text-gray-500">CTO</p>
                                <p className="feedback-date">August 10, 2024</p> 
                             </div>
                        </div> 
                        
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Testimonial;
