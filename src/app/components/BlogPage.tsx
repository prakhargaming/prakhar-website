import React, { useRef, useEffect, useState } from 'react';
import '../globals.css';
import PasswordModal from './PasswordModal';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface Blog {
  _id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  tags: string[];
  locked: boolean;
}

interface HomePageProps {
  isDarkMode: boolean;
}

export default function Blogs({ isDarkMode }: HomePageProps) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [seed, setSeed] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLockedBlog, setCurrentLockedBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogs = async () => {
    try {
      // Explicitly set method to GET
      const response = await fetch('/api/blogs', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Fetched blogs:', data); // Add this for debugging
      setBlogs(data);
    } catch (err) {
      console.error('Error fetching blogs:', err); // Add this for debugging
      setError(err instanceof Error ? err.message : 'Failed to fetch blogs');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (scrollContainerRef.current) {
        e.preventDefault();
        scrollContainerRef.current.scrollLeft += e.deltaY;
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  useEffect(() => {
    const projectPanels = document.querySelectorAll('.project-panel');
    projectPanels.forEach((panel, index) => {
      // Cast panel to HTMLElement
      const element = panel as HTMLElement;
      // Remove the slide-in class first
      element.classList.remove('slide-in');
      // Force a reflow
      void element.offsetWidth;
      // Add the class back with a delay
      setTimeout(() => {
        element.classList.add('slide-in');
      }, index * 100);
    });
  }, [seed, blogs]);

  const handleProjectClick = (blog: Blog) => {
    if (blog.locked) {
      setCurrentLockedBlog(blog);
      setIsModalOpen(true);
    } else {
      if (selectedBlog?._id === blog._id) {
        setSelectedBlog(null);
        setSeed(Math.random());
      } else {
        setSelectedBlog(blog);
      }
    }
  };

  const handlePasswordSubmit = async (password: string) => {
    try {
      const response = await fetch('/api/verify-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          password,
          blogId: currentLockedBlog?._id 
        }),
      });

      if (response.ok) {
        setIsModalOpen(false);
        if (currentLockedBlog) {
          setSelectedBlog(currentLockedBlog);
        }
      } else {
        alert('Incorrect password');
      }
    } catch (err) {
      alert('Error verifying password');
    }
  };

  if (isLoading) {
    return <div className="w-full h-full flex justify-center items-center">Loading...</div>;
  }

  if (error) {
    return <div className="w-full h-full flex justify-center items-center">Error: {error}</div>;
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-start">
      {!selectedBlog && (
        <div className="max-sm:py-5">
          <h1 className={`text-5xl max-sm:text-4xl font-bold mb-4 md:pl-8 ${isDarkMode ? 'text-white' : 'text-black'}`}>
            Welcome to my Blogs!
          </h1>
          <h2 className={`text-xl md:mb-8 md:pl-8 max-sm:text-left w-3/4 max-sm:w-full max-sm:max-h-[15vh] overflow-y-auto ${isDarkMode ? 'text-white' : 'text-black'}`}>
            This is a collection of essays that I have written over the years. They are mostly about pieces of fiction I&apos;ve consumed, ranging from books to Anime to video games. I love writing and I&apos;ve always wanted a space to share that passion. Feel free to read them and let me know what you think!
          </h2>
        </div>
      )}
      {selectedBlog ? (
        <div className={`w-full max-w-3xl mx-auto h-full overflow-y-auto scrollbar-hide p-8 pt-20 ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
          <h1 className="text-4xl font-bold mb-6">{selectedBlog.title}</h1>
          <div className="text-sm text-gray-600 mb-4">
            <span>By {selectedBlog.author}</span>
            {selectedBlog.date && (
              <span className="ml-4">
                {new Date(selectedBlog.date).toLocaleDateString()}
              </span>
            )}
          </div>
          <div className="prose lg:prose-xl dark:prose-invert">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                h1: ({node, ...props}) => <h1 className="text-3xl font-bold my-4" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-2xl font-bold my-3" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-xl font-bold my-2" {...props} />,
                p: ({node, ...props}) => <p className="my-2" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc ml-4 my-2" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal ml-4 my-2" {...props} />,
                blockquote: ({node, ...props}) => (
                  <blockquote className="border-l-4 border-gray-300 pl-4 my-2" {...props} />
                ),
              }}
            >
              {selectedBlog.content}
            </ReactMarkdown>
          </div>
          <button
            onClick={() => {
              setSelectedBlog(null);
              setSeed(Math.random());
            }}
            className={`mb-4 px-4 py-2 mt-8 ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}
          >
            Back to Blog Posts
          </button>
        </div>
      ) : (
        <div 
          ref={scrollContainerRef}
          className={`flex overflow-x-auto scrollbar-hide w-full md:pl-8 ${isDarkMode ? 'bg-black' : 'bg-white'}`}
          style={{
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {blogs.map((blog, index) => (
            <div 
              key={`${blog._id}-${seed}`} 
              className='flex flex-col project-panel opacity-0'
            >
              <div
                onClick={() => handleProjectClick(blog)}
                className={`flex-shrink-0 w-64 h-64 ${index !== 0 ? 'm-4' : 'my-4 mr-4'} flex items-center justify-center p-3 text-center text-lg cursor-pointer ${
                  isDarkMode ? 'bg-white text-black hover:bg-black hover:text-white hover:border-black' : 'bg-black text-white hover:bg-white hover:text-black hover:border-white'
                }`}
              >
                {blog.title}
              </div>
            </div>
          ))}
        </div>
      )}
      <PasswordModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handlePasswordSubmit}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}