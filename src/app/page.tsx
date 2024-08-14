"use client";

import { useState } from 'react';
import TypeWriter from "./components/TypeWriter";

export default function Example() {
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const words = ['software engineer', 'full-stack developer', 'computer vision scientist', 'AI enthusiast'];

  return (
    <div className={`h-[100vh] p-10 flex flex-col relative ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {/* Navbar */}
      <nav className={`absolute top-0 left-0 flex justify-end p-7 ${isDarkMode ? 'bg-black' : 'bg-white'} ml-20`}>
        <ul className="flex space-x-8">
          <li>
            <a
              href="/"
              className={`text-xl font-bold cursor-pointer hover:text-red-500 ${isDarkMode ? 'text-white' : 'text-black'}`}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/projects"
              className={`text-xl font-bold cursor-pointer hover:text-green-500 ${isDarkMode ? 'text-white' : 'text-black'}`}
            >
              Projects
            </a>
          </li>
          <li>
            <a
              href="/blog"
              className={`text-xl font-bold cursor-pointer hover:text-blue-500 ${isDarkMode ? 'text-white' : 'text-black'}`}
            >
              Blog
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/prakhar-sinha-57a412201/" // Replace with your LinkedIn profile URL
              target="_blank"
              rel="noopener noreferrer"
              className={`text-xl font-bold cursor-pointer hover:text-pink-500 ${isDarkMode ? 'text-white' : 'text-black'}`}
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              href="https://github.com/prakhargaming/" // Replace with your GitHub profile URL
              target="_blank"
              rel="noopener noreferrer"
              className={`text-xl font-bold cursor-pointer hover:text-purple-500 ${isDarkMode ? 'text-white' : 'text-black'}`}
            >
              GitHub
            </a>
          </li>
          <li>
            <button
              onClick={toggleTheme}
              className={`text-xl font-bold cursor-pointer hover:text-gray-500 ${isDarkMode ? 'text-white' : 'text-black'}`}
            >
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </li>
        </ul>
      </nav>


      <div className={`border border-solid ${isDarkMode ? 'border-white' : 'border-black'} flex flex-grow`} />

      <div className="absolute left-0 top-1/2 transform -translate-y-1/2"></div>

      <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
        <h2 className={`text-4xl font-bold ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'} px-8 -ml-1 pt-3`}>My Name is</h2>
        <h1 className={`text-9xl font-bold ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'} px-3 -ml-1 pl-3`}>Prakhar Sinha</h1>
        <TypeWriter isDarkMode={!isDarkMode} words={words} />
        <div className={`h-4 ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'} px-3 -ml-1 pl-3`}/>
      </div>
      <div className="absolute right-10 top-1/2 transform -translate-y-1/2 max-w-xs text-right pr-8">
        <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>About Me</h3>
        <p className={`text-lg text-justify ${isDarkMode ? 'text-white' : 'text-black'}`}>
          Hi, welcome to my website! My name is Prakhar Sinha. I recently graduated 
          from UC Davis and am looking to break into the software industry. In my
          spare time, you can find me enjoying nature, playing a video game, or reading
          a book. When it comes to computer science I have three main areas of focus:
          AI/Computer Vision, Front-End and BCI Development.
        </p>
      </div>
    </div>
  );
}
