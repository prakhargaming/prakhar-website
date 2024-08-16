"use client";

import './globals.css'
import { useState } from 'react';
import HomePage from './components/HomePage';
import Blog from './components/BlogPage';
import Projects from './components/ProjectsPage';

const navigation = [
  { name: "Home", component: HomePage },
  { name: "Projects", component: Projects },
  { name: "Blog", component: Blog },
];

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState('Home');

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const CurrentComponent = navigation.find(item => item.name === currentPage)?.component || HomePage;

  return (
    <div className={`h-[100vh] p-10 flex flex-col relative ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {/* Navbar */}
      <nav className={`absolute top-0 left-0 flex justify-end p-7 ${isDarkMode ? 'bg-black' : 'bg-white'} ml-20`}>
        <ul className="flex space-x-8">
          {navigation.map((item) => (
            <li key={item.name}>
              <a
                href={`/${item.name.toLowerCase()}`}
                className={`text-xl font-bold cursor-pointer hover:text-red-500 ${isDarkMode ? 'text-white' : 'text-black'}`}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(item.name);
                }}
              >
                {item.name}
              </a>
            </li>
          ))}
          <li>
            <a
              href="https://www.linkedin.com/in/prakhar-sinha-57a412201/"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-xl font-bold cursor-pointer hover:text-pink-500 ${isDarkMode ? 'text-white' : 'text-black'}`}
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              href="https://github.com/prakhargaming/"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-xl font-bold cursor-pointer hover:text-purple-500 ${isDarkMode ? 'text-white' : 'text-black'}`}
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href="/resume.pdf"
              download="Prakhar_Sinha_Resume.pdf"
              className={`text-xl font-bold cursor-pointer hover:text-green-500 ${isDarkMode ? 'text-white' : 'text-black'}`}
            >
              Resume
            </a>
          </li>
          <li>
            <button
              onClick={toggleTheme}
              className={`text-xl font-bold cursor-pointer hover:text-gray-500 px-1 ${isDarkMode ? 'text-black' : 'text-white'} ${isDarkMode ? 'bg-white' : 'bg-black'}`}
            >
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </li>
        </ul>
      </nav>


      <div className={`border border-solid ${isDarkMode ? 'border-white' : 'border-black'} h-[100vh] p-5 max-h-[100vh] overflow-auto`}>
        <CurrentComponent isDarkMode={isDarkMode} />
      </div>
    </div>
  );
}
