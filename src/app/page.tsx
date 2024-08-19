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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const CurrentComponent = navigation.find(item => item.name === currentPage)?.component || HomePage;

  return (
    <div className={`h-[100vh] md:p-10 p-5 flex flex-col relative ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {/* Overlay Background when Menu is Open */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20"
          onClick={toggleMenu} // Close the menu if the overlay is clicked
        />
      )}

      {/* Navbar */}
      <nav className={`absolute top-0 left-0 flex justify-end p-7 ${isDarkMode ? 'bg-black' : 'bg-white'} z-30 md:ml-20`}>
        {/* Hamburger Menu for Mobile */}
        <div className={`md:hidden flex justify-between items-center w-full ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
          <button onClick={toggleMenu} className="text-xl font-bold">
            ☰
          </button>
        </div>

        {/* Full Menu for Desktop */}
        <ul className={`hidden md:flex space-x-8`}>
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
              href="/Prakhar_Sinha_Resume.pdf"
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

        {/* Mobile Menu */}
        {isMenuOpen && (
          <ul className={`fixed top-0 left-0 w-full ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'} p-5 space-y-4 z-30`}>
            {navigation.map((item) => (
              <li key={item.name}>
                <a
                  href={`/${item.name.toLowerCase()}`}
                  className={`text-xl font-bold cursor-pointer hover:text-red-500 ${isDarkMode ? 'text-white' : 'text-black'}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(item.name);
                    toggleMenu();  // Close the menu after clicking
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
                href="/Prakhar_Sinha_Resume.pdf"
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
        )}
      </nav>

      <div className={`md:border md:border-solid ${isDarkMode ? 'border-white' : 'border-black'} h-[100vh] p-5 max-h-[100vh] overflow-auto z-10`}>
        <CurrentComponent isDarkMode={isDarkMode} />
      </div>
    </div>
  );
}
