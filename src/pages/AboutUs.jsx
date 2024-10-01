import React from 'react';

const AboutUs = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8 text-center">About Us</h1>

            <section className="mb-8">
                <p className="text-lg leading-relaxed mb-4">
                    Welcome to E-Bharat, your one-stop destination for all your shopping needs. At E-Bharat, we are committed to bringing you the best quality products at unbeatable prices. Whether you're looking for the latest fashion trends, cutting-edge electronics, or everyday essentials, we've got you covered.
                </p>

                <p className="text-lg leading-relaxed mb-4">
                    Our journey started with a simple goal: to make online shopping easy, convenient, and enjoyable. Over the years, we've grown into a trusted platform that offers a diverse range of products, from fashion and beauty to home appliances and personal care. We pride ourselves on our customer-centric approach, ensuring that your shopping experience is smooth and hassle-free.
                </p>

                <p className="text-lg leading-relaxed mb-4">
                    At E-Bharat, we believe in quality and value. That's why we carefully curate our products from trusted suppliers, ensuring that every item meets our high standards. Our dedicated team works tirelessly to bring you the latest trends and best deals, so you can shop with confidence.
                </p>

                <p className="text-lg leading-relaxed mb-4">
                    Thank you for choosing E-Bharat as your shopping destination. We are here to serve you and make your shopping experience enjoyable. If you have any questions or need assistance, our customer service team is always ready to help.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                <p className="text-lg leading-relaxed mb-4">
                    Our mission is to deliver the best online shopping experience by offering high-quality products, exceptional customer service, and a seamless shopping process.
                </p>

                <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
                <ul className="list-disc list-inside mb-4">
                    <li className="text-lg leading-relaxed">Customer Satisfaction: We put our customers at the heart of everything we do.</li>
                    <li className="text-lg leading-relaxed">Quality: We are committed to providing only the best products.</li>
                    <li className="text-lg leading-relaxed">Integrity: We operate with honesty and transparency in all our dealings.</li>
                    <li className="text-lg leading-relaxed">Innovation: We continuously strive to improve our services and offerings.</li>
                </ul>

                <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                <p className="text-lg leading-relaxed">
                    Have questions or need help? Reach out to our customer support team at <a href="mailto:support@e-bharat.com" className="text-blue-500 hover:underline">support@e-bharat.com</a>. We're here to help you!
                </p>
            </section>
        </div>
    );
};

export default AboutUs;
