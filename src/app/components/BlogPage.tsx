import React, { useRef, useEffect, useState } from 'react';
import '../globals.css';
import JadeLegacy from './blogs/JadeLegacy1';
import FruitsBasket1 from './blogs/FruitsBasket1';
import BrandonSanderson from './blogs/BrandonSanderson1';
import FruitsBasket2 from './blogs/FruitsBasket2';
import FireEmblem1 from './blogs/FireEmblem1';
import Parasite1 from './blogs/Parasite1';
import Persona3 from './blogs/Persona3';
import PasswordModal from './PasswordModal';

interface HomePageProps {
  isDarkMode: boolean;
}

interface Blog {
  name: string;
  component: React.ElementType;
  locked: boolean;
}

export default function Blogs({ isDarkMode }: HomePageProps) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<React.ElementType | null>(null);
  const [seed, setSeed] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLockedBlog, setCurrentLockedBlog] = useState<Blog | null>(null);

  const blogs: Blog[] = [
    { name: "Jade Legacy and the Hope of Kaul Nikoyan", component: JadeLegacy, locked: false },
    { name: "Fruits Basket goes beyond The Final and transcends its genre as one the greatest conclusions ever to an anime trilogy", component: FruitsBasket1, locked: false },
    { name: "Rediscovering why I always called Brandon Sanderson favorite author has been an eye-opening experience", component: BrandonSanderson, locked: false },
    { name: "Fruits Basket second season has shattered my expectations in every conceivable way thus far", component: FruitsBasket2, locked: false },
    { name: "Fire Emblem Engage: The Never-ending Journey", component: FireEmblem1 , locked: false},
    { name: "Parasite and the Human Condition", component: Parasite1, locked: false },
    { name: "burn your dread", component: Persona3, locked: true },
  ];

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

  const handleProjectClick = (project: Blog) => {
    if (project.locked) {
      setCurrentLockedBlog(project);
      setIsModalOpen(true);
    } else {
      if (selectedBlog === project.component) {
        setSelectedBlog(null);
        setSeed(Math.random());
      } else {
        setSelectedBlog(() => project.component);
      }
    }
  };

  const handlePasswordSubmit = (password: string) => {
    // Replace 'process.env.NEXT_PUBLIC_BLOG_PASSWORD' with your actual environment variable name
    if (password === process.env.NEXT_PUBLIC_BLOG_PASSWORD) {
      setIsModalOpen(false);
      if (currentLockedBlog) {
        setSelectedBlog(() => currentLockedBlog.component);
      }
    } else {
      alert('Incorrect password');
    }
  };

  useEffect(() => {
    const projectPanels = document.querySelectorAll('.project-panel');
    projectPanels.forEach((panel, index) => {
      setTimeout(() => {
        panel.classList.add('slide-in');
      }, index * 100);
    });
  }, [seed]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-start">
      {!selectedBlog && (
        <div>
          <h1
            className={`text-4xl font-bold mb-4 pl-8 ${isDarkMode ? 'text-white' : 'text-black'}`}
          >
            Welcome to my Blogs!
          </h1>
          <h2 className={`text-xl mb-8 pl-8 w-3/4 ${isDarkMode ? 'text-white' : 'text-black'}`} >
            This is a collection of essays that I have written over the years. They are mostly about pieces of fiction I&apos;ve consumed, ranging from books to Anime to video games. I love writing and I&apos;ve always wanted a space to share that passion. Feel free to read them and let me know what you think! 
          </h2>
        </div>
      )}
      {selectedBlog ? (
        <div className={`w-full max-w-3xl mx-auto h-full overflow-y-auto scrollbar-hide p-8 pt-20 ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
          <div key={seed}>
            {React.createElement(selectedBlog)}
          </div>
          <button
            onClick={() => {
              setSelectedBlog(null);
              setSeed(Math.random());
            }}
            className={`mb-4 px-4 py-2 ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}
          >
            Back to Blog Posts
          </button>
        </div>
      ) : (
        <div 
          ref={scrollContainerRef}
          className={`flex overflow-x-auto scrollbar-hide w-full ${isDarkMode ? 'bg-black' : 'bg-white'}`}
          style={{
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {blogs.reverse().map((item) => (
            <div key={`${item.name}-${seed}`} className='flex flex-col project-panel'>
              <div
                onClick={() => handleProjectClick(item)}
                className={`flex-shrink-0 w-64 h-64 m-4 flex items-center justify-center p-3 text-center text-lg cursor-pointer ${
                  isDarkMode ? 'bg-white text-black hover:bg-black hover:text-white hover:border-black' : 'bg-black text-white hover:bg-white hover:text-black hover:border-white'
                }`}
              >
                {item.name}
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