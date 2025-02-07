import axios from 'axios';
import { useEffect, useState } from 'react';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

const BlogList = ({ token }) => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/blog/list`);
      if (response.data.success) {
        setBlogs(response.data.blogs.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const removeBlog = async (id) => {
    try {
      const response = await axios.post(`${backendUrl}/api/blog/remove`, { id }, { headers: { token } });

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchBlogs();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <>
      <p className="mb-2">All Blog Posts</p>
      <div className="flex flex-col gap-2">
        {/* Table Headers */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_2fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Title</b>
          <b>Author</b>
          <b className="text-center">Action</b>
        </div>

        {/* Blog List */}
        {blogs.map((blog, index) => (
          <div className="grid grid-cols-[1fr_3fr_2fr] md:grid-cols-[1fr_3fr_2fr_1fr] items-center gap-2 py-1 px-2 border text-sm" key={index}>
            <img className="w-12 h-12 object-cover" src={blog.image} alt="Blog" />
            <p>{blog.title}</p>
            <p>{blog.author}</p>
            <p onClick={() => removeBlog(blog._id)} className="text-right md:text-center cursor-pointer text-lg text-red-500">
              X
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

BlogList.propTypes = {
  token: PropTypes.string.isRequired,
};

export default BlogList;
