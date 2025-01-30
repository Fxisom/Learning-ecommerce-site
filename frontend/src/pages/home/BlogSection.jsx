import blogs from "../../data/blogs.json"; 

const BlogSection = () => {
  return (
    <div className="blog-section text-center mb-14">
      <h3 className="text-red-500 text-xs font-semibold uppercase">
        Latest News
      </h3>
      <h2 className="text-black text-3xl font-bold mt-2 mb-12">
        Fashion New Trends
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        {blogs.slice(0, 3).map((blog) => (
          <div key={blog.id} className="flex flex-col items-center">
            <div className="blog-item-container w-96 h-96 relative">
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
              <div className="text-container px-4 py-3 absolute bottom-0 left-0 right-0 bg-white bg-opacity-90">
                <div className="flex items-center text-gray-400 text-xs mb-2">
                  {/* Calendar Icon */}
                  <i className="ri-calendar-check-line text-red-500 mr-2 text-sm"></i>
                  {/* Date */}
                  {blog.date}
                </div>
                <h3 className="text-base font-semibold text-gray-800 mb-2">
                  {blog.title}
                </h3>
                <a
                  href="#"
                  className="text-black text-sm font-medium uppercase relative group"
                >
                  Read More
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-red-500 transform group-hover:w-1/2 transition-all duration-300"></span>
                </a>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogSection;










