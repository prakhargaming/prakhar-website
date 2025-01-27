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
  image?:string;
}

interface BlogsProps {
  isDarkMode: boolean;
}

// Custom dropdown component
const TagDropdown = ({ 
  value, 
  onChange, 
  options, 
  isDarkMode 
}: { 
  value: string; 
  onChange: (value: string) => void; 
  options: string[];
  isDarkMode: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-2 text-left flex items-center justify-between ${
          isDarkMode 
            ? 'bg-black text-white hover:bg-white hover:text-black' 
            : 'bg-white text-black hover:bg-black hover:text-white'
        } border ${isDarkMode ? 'border-white' : 'border-black'}`}
      >
        <span>{value.charAt(0).toUpperCase() + value.slice(1)}</span>
        <span className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
      </button>
      
      {isOpen && (
        <div className={`absolute z-10 w-full mt-1 ${
          isDarkMode 
            ? 'bg-black ' 
            : 'bg-white '
        } border`}>
          <div className="py-1">
            {options.map(option => (
              <button
                key={option}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2 text-left ${
                  isDarkMode
                    ? 'text-white hover:bg-black'
                    : 'text-black hover:bg-white'
                } ${value === option ? (isDarkMode ? 'bg-black' : 'bg-white') : ''}`}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const BlogContent = ({ 
  blog, 
  isDarkMode, 
  onBack, 
  onTagClick  // New prop
}: { 
  blog: Blog; 
  isDarkMode: boolean; 
  onBack: () => void;
  onTagClick?: (tag: string) => void;  // Optional prop
}) => (
  <div className={`w-full max-w-3xl mx-auto h-full overflow-y-auto scrollbar-hide p-8 pt-20 ${
    isDarkMode ? 'bg-black text-white' : 'bg-white text-black'
  }`}>
    <h1 className="text-4xl font-bold mb-3">{blog.title}</h1>
    <div className="text-sm text-gray-600 mb-6">
      <span>By {blog.author}</span>
      {blog.date && (
        <span className="ml-4">
          {new Date(blog.date).toLocaleDateString()}
        </span>
      )}
    </div>
    <div className="flex flex-wrap gap-2 mb-6">
      {blog.tags.map(tag => (
        <span 
          key={tag}
          onClick={() => onTagClick && onTagClick(tag)}
          className={`px-2 py-1 text-sm cursor-pointer ${
            isDarkMode
              ? 'bg-white text-black hover:bg-black hover:text-white' 
              : 'bg-black text-white hover:bg-white hover:text-black' 
          }`}
        >
          {tag}
        </span>
      ))}
    </div>
    {blog.image && (
      <div className="mb-6">
        <img 
          src={blog.image} 
          alt={blog.title}
          className="w-full h-auto"
        />
      </div>
    )}
    <div className="prose lg:prose-xl dark:prose-invert">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: ({node, ...props}) => <h1 className="text-3xl font-bold mt-4 mb-2" {...props} />,
          h2: ({node, ...props}) => <h2 className="text-2xl font-bold mt-4 mb-2" {...props} />,
          h3: ({node, ...props}) => <h3 className="text-xl font-bold mt-4 mb-2" {...props} />,
          p: ({node, ...props}) => <p className="my-2" {...props} />,
          ul: ({node, ...props}) => <ul className="list-disc ml-4 my-2" {...props} />,
          ol: ({node, ...props}) => <ol className="list-decimal ml-4 my-2" {...props} />,
          blockquote: ({node, ...props}) => (
            <blockquote className="italic border-l-4 border-gray-300 pl-4 my-4" {...props} />
          ),
        }}
      >
        {blog.content}
      </ReactMarkdown>
    </div>
    <button
      onClick={onBack}
      className={`mb-4 px-4 py-2 mt-8 ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}
    >
      Back to Blog Posts
    </button>
  </div>
);

// Custom hook for handling the blog fetching
const useBlogFetch = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [allTags, setAllTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
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
        setBlogs(data);
        setFilteredBlogs(data);

        // Extract unique tags
        const tags = new Set<string>();
        data.forEach((blog: Blog) => {
          blog.tags.forEach(tag => tags.add(tag));
        });
        setAllTags(['all', ...Array.from(tags)]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch blogs');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    if (selectedTag === 'all') {
      setFilteredBlogs(blogs);
    } else {
      const filtered = blogs.filter(blog => blog.tags.includes(selectedTag));
      setFilteredBlogs(filtered);
    }
  }, [selectedTag, blogs]);

  return { 
    blogs: filteredBlogs, 
    isLoading, 
    error, 
    selectedTag, 
    setSelectedTag, 
    allTags 
  };
};


export default function Blogs({ isDarkMode }: BlogsProps) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [seed, setSeed] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLockedBlog, setCurrentLockedBlog] = useState<Blog | null>(null);
  
  const { 
    blogs, 
    isLoading, 
    error, 
    selectedTag, 
    setSelectedTag, 
    allTags 
  } = useBlogFetch();

  // Handle horizontal scrolling
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
      return () => scrollContainer.removeEventListener('wheel', handleWheel);
    }
  }, []);

  // Handle animation of blog panels
  useEffect(() => {
    const projectPanels = document.querySelectorAll('.project-panel');
    projectPanels.forEach((panel, index) => {
      const element = panel as HTMLElement;
      element.classList.remove('slide-in');
      void element.offsetWidth;
      setTimeout(() => {
        element.classList.add('slide-in');
      }, index * 100);
    });
  }, [seed, blogs]);

  useEffect(() => {

  });

  const handleProjectClick = (blog: Blog) => {
    if (blog.locked) {
      setCurrentLockedBlog(blog);
      setIsModalOpen(true);
    } else {
      setSelectedBlog(selectedBlog?._id === blog._id ? null : blog);
      setSeed(Math.random());
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
        <div className="max-sm:py-5 w-full">
          <h1 className={`text-5xl max-sm:text-4xl font-bold mb-4 md:pl-8 ${
            isDarkMode ? 'text-white' : 'text-black'
          }`}>
            Welcome to my Blogs!
          </h1>
          <h2 className={`text-xl md:mb-4 md:pl-8 max-sm:text-left w-3/4 max-sm:w-full max-sm:mb-4 max-sm:max-h-[15vh] overflow-y-auto ${
            isDarkMode ? 'text-white' : 'text-black'
          }`}>
            This is a collection of essays that I have written   over the years. They are mostly about 
            pieces of fiction I&apos;ve consumed, ranging from books to Anime to video games. 
            I love writing and I&apos;ve always wanted a space to share that passion. 
            Feel free to read them and let me know what you think!
          </h2>
          
          <div className="md:pl-8 mb-8 md:w-3/5 max-sm:w-full">
            <TagDropdown
              value={selectedTag}
              onChange={setSelectedTag}
              options={allTags}
              isDarkMode={isDarkMode}
            />
          </div>
        </div>
      )}
      
      {/* Rest of your component remains the same */}
      {selectedBlog ? (
        <BlogContent 
          blog={selectedBlog} 
          isDarkMode={isDarkMode} 
          onBack={() => {
            setSelectedBlog(null);
            setSeed(Math.random());
          }}
          onTagClick={(tag) => {
            setSelectedBlog(null);  // Go back to main blogs view
            setSelectedTag(tag);    // Set the selected tag
          }}
        />
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
                className={`flex-shrink-0 w-64 h-64 ${
                  index !== 0 ? 'm-4' : 'my-4 mr-4'
                } flex items-center justify-center p-3 text-center text-lg cursor-pointer ${
                  isDarkMode ? 'bg-white text-black hover:bg-black hover:text-white hover:border-black' 
                           : 'bg-black text-white hover:bg-white hover:text-black hover:border-white'
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