import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendUrl } from '../App';
import { assets } from '../assets/assets';

const AddBlog = ({ token }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [tags, setTags] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null); 

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('content', content);
            formData.append('author', author);
            formData.append('tags', tags);
            if (image) formData.append('image', image);

            const response = await axios.post(`${backendUrl}/api/blog/add`, formData, {
                headers: { token },
            });

            if (response.data.success) {
                toast.success(response.data.message);
                setTitle('');
                setContent('');
                setAuthor('');
                setTags('');
                setImage(null);
                setPreview(null); 
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-3">
            <div>
                <p className="mb-2">Upload Image</p>
                <label htmlFor="blogImage">
                    <img className="w-20" src={preview || assets.upload_area} alt="Upload preview" />
                    <input onChange={handleImageChange} type="file" id="blogImage" hidden />
                </label>
            </div>

            <div className="w-full">
                <p className="mb-2">Title</p>
                <input onChange={(e) => setTitle(e.target.value)} value={title} className="w-full px-3 py-2" type="text" placeholder="Blog title" required />
            </div>

            <div className="w-full">
                <p className="mb-2">Content</p>
                <textarea onChange={(e) => setContent(e.target.value)} value={content} className="w-full px-3 py-2" placeholder="Write blog content here" required />
            </div>

            <div className="w-full">
                <p className="mb-2">Author</p>
                <input onChange={(e) => setAuthor(e.target.value)} value={author} className="w-full px-3 py-2" type="text" placeholder="Author name" required />
            </div>

            <div className="w-full">
                <p className="mb-2">Tags</p>
                <input onChange={(e) => setTags(e.target.value)} value={tags} className="w-full px-3 py-2" type="text" placeholder="Tags (comma separated)" />
            </div>

            <button type="submit" className="w-28 py-3 mt-4 bg-black text-white">ADD BLOG</button>
        </form>
    );
};

AddBlog.propTypes = {
    token: PropTypes.string.isRequired,
};

export default AddBlog;

