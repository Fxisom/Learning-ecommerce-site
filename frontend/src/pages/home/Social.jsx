const Social = () => {
    return (
        <div className="max-w-screen-2xl mx-auto px-12 mt-10">
            <div className="flex items-center justify-center space-x-16 py-16">
                {/* Left Section: Single Image */}
                <div className="flex-shrink-0 max-w-lg">
                    <img
                        src="/social.jpg"
                        alt="Social Media"
                        className="w-full h-auto object-cover"
                    />
                </div>

                {/* Right Section: Text with Social Icons */}
                <div className="max-w-lg">
                    <h2 className="text-3xl font-bold mb-8">Social</h2>
                    <p className="text-gray-500 mb-8 text-lg">
                        Unlock the world of style—follow us on social media for behind-the-scenes sneak peeks, exclusive collections, and exciting surprises just for you!
                    </p>

                    {/* Social Icons */}
                    <div className="flex space-x-12 text-2xl text-gray-700">
                        <i className="ri-instagram-line cursor-pointer hover:text-pink-500"></i>
                        <i className="ri-facebook-circle-fill cursor-pointer hover:text-blue-600"></i>
                        <i className="ri-twitter-x-line cursor-pointer hover:text-blue-400"></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Social;





