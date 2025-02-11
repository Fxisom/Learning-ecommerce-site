const Collection = () => {
  return (
    <div className="container mx-auto max-w-4xl px-4">
      {/* First Section */}
      <div className="flex flex-col md:flex-row items-center justify-between bg-white p-6 md:p-8 relative">
        {/* Left Side: Text and Button */}
        <div className="md:w-1/2 text-left md:pl-10">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-1 mt-0 leading-snug">
            Clothing<br />Collections 2030
          </h1>
          <button className="text-black mt-1 tracking-wider hover:border-black relative group">
            SHOP NOW
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-red-500 transform group-hover:w-1/2 transition-all duration-300"></span>
          </button>
        </div>

        {/* Right Side: Image */}
        <div className="md:w-1/2 relative flex justify-center">
          <div className="w-full h-full min-h-[300px]">
            <img
              src="/featured2.jpg"
              alt="Fashion Image"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Second Section */}
      <div className="flex flex-col md:flex-row items-center justify-between bg-white pt-0 md:pt-0 p-6 md:p-8 relative">
        {/* Left Side: Image */}
        <div className="md:w-1/2 relative flex justify-center">
          <div className="w-full h-full min-h-[300px]">
            <img
              src="/featured1.jpg"
              alt="Fashion Image"
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Right Side: Text */}
        <div className="md:w-1/2 text-right md:pr-10">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-1 mt-0 leading-snug">
            New Season<br />Arrivals 2023
          </h1>
          <button className="text-black mt-1 tracking-wider hover:border-black relative group">
            SHOP NOW
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-red-500 transform group-hover:w-1/2 transition-all duration-300"></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Collection;










