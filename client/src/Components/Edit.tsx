import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import axiosInstance from '../axiosInstance';
import hljs from 'highlight.js';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // ✅ MOVED HERE - top level
  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [language, setLanguage] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    title?: string;
    author?: string;
    content?: string;
    language?: string;
  }>({});

  // Validation function
  const validateInputs = () => {
    const newErrors: typeof errors = {};

    // Title validation
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    } else if (title.trim().length < 5) {
      newErrors.title = 'Title must be at least 5 characters';
    } else if (title.trim().length > 200) {
      newErrors.title = 'Title must be less than 200 characters';
    }

    // Author validation
    if (!author.trim()) {
      newErrors.author = 'Author is required';
    } else if (author.trim().length < 3) {
      newErrors.author = 'Author name must be at least 3 characters';
    } else if (author.trim().length > 100) {
      newErrors.author = 'Author name must be less than 100 characters';
    }

    if (!language.trim()) {
      newErrors.language = 'language is required';
    } else if (language.trim().length < 3) {
      newErrors.language = 'language name must be at least 3 characters';
    } else if (language.trim().length > 100) {
      newErrors.language = 'language name must be less than 100 characters';
    }

    // Content validation
    const plainText = value.replace(/<[^>]*>/g, '').trim();
    if (!plainText) {
      newErrors.content = 'Content is required';
    } else if (plainText.length < 20) {
      newErrors.content = 'Content must be at least 20 characters';
    } else if (plainText.length > 50000) {
      newErrors.content = 'Content must be less than 50,000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const modules = React.useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ script: 'sub' }, { script: 'super' }],
        [{ indent: '-1' }, { indent: '+1' }],
        [{ size: ['small', false, 'large', 'huge'] }],
        [{ color: [] }, { background: [] }],
        [{ font: [] }],
        [{ align: [] }],
        ['link', 'image', 'video'],
        ['clean'],
      ],
      syntax: {
        highlight: (text: string) => hljs.highlightAuto(text).value,
      },
    }),
    []
  );

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'code-block',
    'list',
    'bullet',
    'indent',
    'script',
    'size',
    'color',
    'background',
    'font',
    'align',
    'link',
    'image',
    'video',
  ];

  const handleUpdate = async (e: React.MouseEvent) => {
    e.preventDefault();

    // Validate before submission
    if (!validateInputs()) {
      toast.error('Please fix errors before submitting');
      return;
    }

    setLoading(true);
    const data = {
      title: title.trim(),
      author: author.trim(),
      content: value,
      language: language.trim(),
    };

    try {
      const response = await axiosInstance.put(`/update-blog/${id}`, data);

      if (response.data.success) {
        toast.success('Updated successfully!');
        // Reset form
        setAuthor('');
        setValue('');
        setTitle('');
        setLanguage('');
        setErrors({});
        navigate('/manage-post');
      } else {
        toast.error(response.data.message || 'Failed to update blog');
      }
    } catch (error: unknown) {
      console.error('Error updating post:', error);
      let errorMessage = 'Error updating post';
      if (error instanceof Error && 'response' in error) {
        const axiosError = error as Record<string, unknown>;
        const response = axiosError.response as Record<string, unknown>;
        if (response?.data && typeof response.data === 'object') {
          const data = response.data as Record<string, unknown>;
          errorMessage = (data.message as string) || errorMessage;
        }
      }
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axiosInstance.get(`/get-blog/${id}`);

        const blog = response.data.data;

        setTitle(blog.title);
        setAuthor(blog.author);
        setLanguage(blog.language || '');
        setValue(blog.content);
      } catch (error) {
        if (error instanceof Error) toast.error(error.message);
        else toast.error('Internal server error');
      }
    };

    if (id) fetchBlogs();
  }, [id]);

  return (
    <div className='w-[80vw] px-4 py-2'>
      <button
        className='px-4 py-2 rounded bg-slate-400 mt-4'
        onClick={() => navigate('/manage-post')}
      >
        Go Back
      </button>

      {/* Handle Form */}
      <div className='space-y-6'>
        {/* Title Input */}
        <div>
          <label
            htmlFor='title'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            Title <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            id='title'
            maxLength={200}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) setErrors({ ...errors, title: undefined });
            }}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
              errors.title ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
            placeholder='Enter your blog title...'
          />
          {errors.title && (
            <p className='text-red-500 text-sm mt-1'>{errors.title}</p>
          )}
          <p className='text-gray-500 text-xs mt-1'>{title.length}/200</p>
        </div>

        {/* Author Input */}
        <div>
          <label
            htmlFor='author'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            Author <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            id='author'
            maxLength={100}
            value={author}
            onChange={(e) => {
              setAuthor(e.target.value);
              if (errors.author) setErrors({ ...errors, author: undefined });
            }}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
              errors.author ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
            placeholder='Enter author name...'
          />
          {errors.author && (
            <p className='text-red-500 text-sm mt-1'>{errors.author}</p>
          )}
          <p className='text-gray-500 text-xs mt-1'>{author.length}/100</p>
        </div>

        {/* Language */}

        <div>
          <label
            htmlFor='language'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            Language <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            id='language'
            maxLength={100}
            value={language}
            onChange={(e) => {
              setLanguage(e.target.value);
              if (errors.language)
                setErrors({ ...errors, language: undefined });
            }}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
              errors.language ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
            placeholder='Enter Language name...'
          />
          {errors.language && (
            <p className='text-red-500 text-sm mt-1'>{errors.language}</p>
          )}
          <p className='text-gray-500 text-xs mt-1'>{language.length}/100</p>
        </div>

        {/* Markdown Editor */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Content <span className='text-red-500'>*</span>
          </label>
          <div
            style={{ height: '400px', overflow: 'auto' }}
            className={`border rounded-md ${
              errors.content ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
          >
            <ReactQuill
              theme='snow'
              value={value}
              onChange={(content) => {
                if (content.length <= 50000) {
                  setValue(content);
                  if (errors.content)
                    setErrors({ ...errors, content: undefined });
                } else {
                  toast.warning('Content exceeds maximum length');
                }
              }}
              modules={modules}
              formats={formats}
            />
          </div>
          {errors.content && (
            <p className='text-red-500 text-sm mt-1'>{errors.content}</p>
          )}
          <p className='text-gray-500 text-xs mt-1'>
            {value.replace(/<[^>]*>/g, '').length}/50,000 characters
          </p>
        </div>

        <div className='flex justify-end pt-4'>
          <button
            onClick={handleUpdate}
            disabled={loading}
            className={`px-6 py-3 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ${
              loading
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {loading ? 'Updating...' : 'Update Post'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Edit;
