import React, { useMemo, useState } from 'react';
import { EditorContext, useEditor } from '@tiptap/react';
import { EditorContent } from '@tiptap/react';
import { FloatingMenu, BubbleMenu } from '@tiptap/react/menus';

import StarterKit from '@tiptap/starter-kit';
const Blog = () => {
  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const editor = useEditor({
    extensions: [StarterKit], // define your extension array
    content: '<p>Hello World!</p>', // initial content
  });

  const providerValue = useMemo(() => ({ editor }), [editor]);

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    const data = { title, author, content: value };

    try {
      // Replace with your actual API call
      console.log('Submitting:', data);
      // const response = await axiosInstance.post('/post-blog', data);

      // Reset after successful submission
      setTitle('');
      setAuthor('');
      setValue('');

      alert('Blog post submitted successfully!');
    } catch (error) {
      console.error('Error submitting post:', error);
      alert('Error submitting post');
    }
  };

  console.log(value);

  return (
    <div className='min-h-screen bg-gray-50 py-8 px-4'>
      <div className='max-w-4xl mx-auto'>
        <div className='bg-white rounded-lg shadow-md p-8'>
          <h1 className='text-3xl font-bold text-gray-800 mb-8'>
            Create Blog Post
          </h1>

          <div className='space-y-6'>
            {/* Title Input */}
            <div>
              <label
                htmlFor='title'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                Title
              </label>
              <input
                type='text'
                id='title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition'
                placeholder='Enter your blog title...'
              />
            </div>

            {/* Author Input */}
            <div>
              <label
                htmlFor='author'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                Author
              </label>
              <input
                type='text'
                id='author'
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition'
                placeholder='Enter author name...'
              />
            </div>

            {/* Markdown Editor */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Content
              </label>
              <div className='border border-gray-300 rounded-md overflow-hidden [&_.CodeMirror]:min-h-[300px] [&_.CodeMirror]:text-base [&_.CodeMirror]:font-mono [&_.CodeMirror-scroll]:min-h-[300px]'>
                <EditorContext.Provider value={providerValue}>
                  <EditorContent editor={editor} />
                  <FloatingMenu editor={editor}>
                    This is the floating menu
                  </FloatingMenu>
                  <BubbleMenu editor={editor}>
                    This is the bubble menu
                  </BubbleMenu>
                </EditorContext.Provider>
              </div>
            </div>

            {/* Submit Button */}
            <div className='flex justify-end pt-4'>
              <button
                onClick={handleSubmit}
                className='px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150'
              >
                Publish Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
