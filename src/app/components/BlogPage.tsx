"use client";

import React, { useRef, useEffect, useState } from 'react';
import '../globals.css';
import JadeLegacy from './blogs/JadeLegacy1';
import FruitsBasket1 from './blogs/FruitsBasket1';
import BrandonSanderson from './blogs/BrandonSanderson1';
import FruitsBasket2 from './blogs/FruitsBasket2';

interface HomePageProps {
  isDarkMode: boolean;
}

export default function Projects({ isDarkMode }: HomePageProps) {
  const scrollContainerRef = useRef(null);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const blogs = [
    { name: "Jade Legacy and the Hope of Kaul Nikoyan.", component: JadeLegacy },
    { name: "Fruits Basket goes beyond The Final and transcends its genre as one the greatest conclusions ever to an anime trilogy.", component: FruitsBasket1 },
    { name: "Rediscovering why I always called Brandon Sanderson favorite author has been an eye-opening experience.", component: BrandonSanderson },
    { name: "Fruits Basket second season has shattered my expectations in every conceivable way thus far.", component: FruitsBasket2 },
  ];

  useEffect(() => {
    const handleWheel = (e) => {
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

  const handleProjectClick = (project) => {
    setSelectedBlog(() => project.component);
  };

  return (
    <div className="w-full h-full flex items-center">
      {selectedBlog ? (
        <div className={`w-[70vw] h-full overflow-y-auto scrollbar-hide p-8 ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
          {React.createElement(selectedBlog)}
          <button
            onClick={() => setSelectedBlog(null)}
            className={`mb-4 px-4 py-2 ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}
          >
            Back to Projects
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
          {blogs.map((item) => (
            <div key={item.name} className='flex flex-col'>
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
    </div>
  );
}
