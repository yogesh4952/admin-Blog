import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axiosInstance from '../axiosInstance';
import { toast } from 'react-toastify';

interface BlogPost {
  _id: string;
  title: string;
  author: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
}

const Management = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState<BlogPost[]>([]);

  const handleDelete = async (id: string) => {
    try {
      const response = await axiosInstance.delete(`/delete-blog/${id}`);
      if (response.data.success) {
        toast.success('Succesfully Deleted the blogs');
        setBlog((prev) => prev.filter((item) => item._id !== id));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
      toast.error('Internal server error');
    }
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axiosInstance.get('/get-all-blogs');
        setBlog(response.data.data);
        localStorage.setItem('blog', JSON.stringify(response.data.data));
        toast.success('Successfully fetched the blogs');
      } catch (error) {
        if (error instanceof Error) toast.error(error.message);
        else toast.error('Internal server error');
      }
    };
    fetchBlogs();
  }, []);
  return (
    <div className='w-[80vw] mx-auto'>
      <button
        className='ml-4 px-4 py-2 border border-white rounded mt-4 hover:bg-slate-800 cursor-pointer'
        onClick={() => navigate('/')}
      >
        Go Back{' '}
      </button>

      {/* Display All the blog that are in db */}
      <div className='flex items-center justify-center'>
        <h1 className='text-4xl font-bold font-serif text-red-500 italic mt-4'>
          Manage Blog
        </h1>
      </div>
      {blog.map((b) => (
        <div
          key={b._id}
          className='border-l-white mt-5 px-4 py-2 rounded min-h-14 border mx-auto w-[50%] flex justify-between items-center'
        >
          <div>{b.title}</div>

          <div className='flex gap-2'>
            <button
              onClick={() => navigate(`edit/${b._id}`)}
              className='px-4 py-2 bg-green-600 rounded hover:bg-green-500 cursor-pointer'
            >
              Edit
            </button>
            <button
              className='text-red-600 hover:bg-slate-200 px-4 py-2 rounded bold hover:text-red-800 cursor-pointer'
              onClick={() => handleDelete(b._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Management;
