import { useState, useEffect } from "react";

const Banner = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            image: "/banner4.png", 
            heading: "Welcome to Our Store",
            text: "Discover the best products curated just for you.",
            buttonText: "Shop Now",
        },
        {
            image: "/banner3.png", 
            heading: "Explore Our New Arrivals",
            text: "Find the latest trends and styles today.",
            buttonText: "Discover Now",
        },
    ];

    const handleNext = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const handlePrev = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

  
    useEffect(() => {
        slides.forEach((slide) => {
            const img = new Image();
            img.src = slide.image;
        });
    }, );


    useEffect(() => {
        const interval = setInterval(() => {
            handleNext(); 
        }, 6000); 

        return () => clearInterval(interval); 
    }, );

    return (
        <div
            className="relative h-[600px] overflow-hidden mt-5 bg-cover bg-center"
            style={{
                backgroundImage: `url(/background1.jpg)`, 
                backgroundAttachment: "fixed",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
                        index === currentSlide
                            ? "opacity-100 scale-100 z-10"
                            : "opacity-0 scale-90 z-0"
                    }`}
                    style={{ willChange: "opacity, transform" }}
                >
                    {/* Slide content */}
                    <div className="relative z-20 max-w-6xl mx-auto flex items-center justify-between h-full px-6">
                        {/* Text Section */}
                        <div className="flex flex-col justify-center max-w-lg text-left">
                            <h1 className="text-2xl md:text-3xl font-bold tracking-tight leading-tight mb-4 md:mb-6 text-red-600">
                                {slide.heading}
                            </h1>
                            <p className="text-lg md:text-xl leading-relaxed mb-6 md:mb-8 text-black">
                                {slide.text}
                            </p>
                            <button className="bg-black hover:bg-gray-800 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105">
                                {slide.buttonText}
                            </button>
                        </div>

                        {/* Image Section */}
                        <div className="flex-shrink-0 w-[40%] ml-4">
                            <img
                                src={slide.image}
                                alt={slide.heading}
                                className="w-full h-auto object-contain"
                            />
                        </div>
                    </div>
                </div>
            ))}

            {/* Navigation Arrows */}
            <button
                onClick={handlePrev}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-opacity-30 hover:bg-opacity-50 text-black p-2 rounded-full z-30"
            >
                <i className="ri-arrow-left-wide-fill text-3xl"></i>
            </button>
            <button
                onClick={handleNext}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-opacity-30 hover:bg-opacity-50 text-black p-2 rounded-full z-30"
            >
                <i className="ri-arrow-right-wide-fill text-3xl"></i>
            </button>
        </div>
    );
};

export default Banner;








