import React from 'react';

const Returns = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Returns and Policies</h1>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Returns Policy</h2>
                <p className="mb-4">
                    We want you to be completely satisfied with your purchase. 
                    If for any reason you are not satisfied, you can return the item within 10 days of receipt. 
                    Items must be unused and in their original packaging.
                </p>
                <h3 className="text-xl font-semibold mb-2">How to Return an Item</h3>
                <ul className="list-disc list-inside mb-4">
                    <li>Fill out the return form provided with your order or contact our customer service.</li>
                    <li>Package the item securely in its original packaging.</li>
                    <li>Send the package to our return address. Shipping costs are non-refundable.</li>
                </ul>
                <h3 className="text-xl font-semibold mb-2">Refunds</h3>
                <p className="mb-4">
                    Refunds will be processed to the original payment method. Please allow 1-7 business days for the 
                    refund to appear in your account. If you have received a gift, you will receive store credit.
                </p>
                <h3 className="text-xl font-semibold mb-2">Exceptions</h3>
                <p className="mb-4">
                    Some items are non-returnable, including sale items, perishable goods, and personal care items.
                     Please check the product description for return eligibility.
                </p>
                <h3 className="text-xl font-semibold mb-2">Shipping Costs</h3>
                <p className="mb-4">
                    Return shipping costs are the responsibility of the customer unless the item 
                    was defective or an error was made on our part.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>
                <p className="mb-4">
                    We are committed to protecting your privacy. This policy explains how we collect, 
                    use, and protect your personal information.
                </p>
                <h3 className="text-xl font-semibold mb-2">Data Collection</h3>
                <p className="mb-4">
                    We collect personal information such as your name, email address, and payment details when you make 
                    a purchase or contact us. This information is used to process your orders and improve our services.
                </p>
                <h3 className="text-xl font-semibold mb-2">Data Protection</h3>
                <p className="mb-4">
                    Your data is stored securely using industry-standard encryption methods. 
                    We do not share your data with third parties except for payment processors and shipping companies.
                </p>
                <h3 className="text-xl font-semibold mb-2">Cookies</h3>
                <p className="mb-4">
                    Our website uses cookies to enhance your experience. 
                    Cookies help us understand how you use our site and improve our services.
                </p>
                <h3 className="text-xl font-semibold mb-2">Third Parties</h3>
                <p className="mb-4">
                    We may use third-party services for payment processing and shipping. 
                    These services have their own privacy policies, and we recommend reviewing them.
                </p>
                <h3 className="text-xl font-semibold mb-2">User Rights</h3>
                <p className="mb-4">
                    You have the right to access, correct, or delete your personal information. 
                    To exercise these rights, please contact our customer service.
                </p>
            </section>
        </div>
    );
};

export default Returns;
