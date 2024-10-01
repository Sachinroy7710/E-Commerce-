import React from 'react';

const Privacy = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>

            <section className="mb-8">
                <p className="text-lg leading-relaxed mb-4">
                    At E-Bharat, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your personal information when you visit our website or make a purchase.
                </p>

                <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
                <p className="text-lg leading-relaxed mb-4">
                    We collect personal information that you provide to us, including your name, email address, shipping address, payment details, and any other information you choose to provide. We also collect information automatically, such as your IP address, browser type, and browsing behavior on our site.
                </p>

                <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
                <ul className="list-disc list-inside mb-4">
                    <li className="text-lg leading-relaxed">To process and fulfill your orders.</li>
                    <li className="text-lg leading-relaxed">To communicate with you about your orders, account, and our products or services.</li>
                    <li className="text-lg leading-relaxed">To improve our website, products, and services.</li>
                    <li className="text-lg leading-relaxed">To send you promotional offers and updates, if you have opted in to receive them.</li>
                </ul>

                <h2 className="text-2xl font-semibold mb-4">How We Protect Your Information</h2>
                <p className="text-lg leading-relaxed mb-4">
                    We use industry-standard encryption and security measures to protect your personal information from unauthorized access, disclosure, or alteration. Your payment information is processed securely, and we do not store your credit card details on our servers.
                </p>

                <h2 className="text-2xl font-semibold mb-4">Sharing Your Information</h2>
                <p className="text-lg leading-relaxed mb-4">
                    We do not sell, trade, or share your personal information with third parties, except as necessary to process your orders (e.g., payment processors, shipping companies) or as required by law.
                </p>

                <h2 className="text-2xl font-semibold mb-4">Cookies</h2>
                <p className="text-lg leading-relaxed mb-4">
                    Our website uses cookies to enhance your browsing experience and provide personalized content. Cookies help us understand how you interact with our site, allowing us to improve our services. You can disable cookies in your browser settings, but doing so may affect your ability to use certain features of our website.
                </p>

                <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
                <p className="text-lg leading-relaxed mb-4">
                    You have the right to access, correct, or delete your personal information. If you would like to exercise these rights, please contact us at <a href="mailto:privacy@e-bharat.com" className="text-blue-500 hover:underline">privacy@e-bharat.com</a>.
                </p>

                <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
                <p className="text-lg leading-relaxed mb-4">
                    We may update this Privacy Policy from time to time. Any changes will be posted on this page, and the date of the latest revision will be indicated at the top of the page. We encourage you to review this policy periodically to stay informed about how we are protecting your information.
                </p>

                <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                <p className="text-lg leading-relaxed">
                    If you have any questions about this Privacy Policy or our data practices, please contact us at <a href="mailto:privacy@e-bharat.com" className="text-blue-500 hover:underline">privacy@e-bharat.com</a>.
                </p>
            </section>
        </div>
    );
};

export default Privacy;
