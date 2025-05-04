"use client";

import { useState, useEffect } from 'react';
import HomePage from '../components/HomePage';
import Blog from '../components/BlogPage';
import Projects from '../components/ProjectsPage';
import SignUp from '../components/SignUpPage';
import ChatPage from '../components/ChatPage'

const navigation = [
  { name: "Home", component: HomePage, hover: "hover:text-red-500"},
  { name: "Projects", component: Projects, hover: "hover:text-green-500" },
  { name: "Blog", component: Blog, hover: "hover:text-blue-500" },
  { name: "Login", component: SignUp, hover: "hover:text-orange-500" },
  { name: "Chat", component: ChatPage, hover: "hover:text-pink-500" },
];

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const path = window.location.pathname;
  
    if (path.startsWith('/Login')) {
      setCurrentPage('Login');
    } else {
      const params = new URLSearchParams(window.location.search);
      const page = params.get('page');
      if (page) {
        setCurrentPage(page);
      } else {
        setCurrentPage('Home');
      }
    }
  }, []);
  

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const CurrentComponent = navigation.find(item => item.name === currentPage)?.component || HomePage;

  return (
    <div
     className={`h-[100vh] md:p-10 p-5 flex flex-col relative ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {/* Overlay Background when Menu is Open */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20"
          onClick={toggleMenu} // Close the menu if the overlay is clicked
        />
      )}

      {/* Navbar */}
      <nav className={`absolute bg-opacity-0 top-0 left-0 flex justify-end p-7 ${isDarkMode ? 'bg-black' : 'bg-white'} z-30 md:ml-20`}>
        {/* Hamburger Menu for Mobile */}
        <div className={`md:hidden flex justify-between items-center w-full ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
          <button onClick={toggleMenu} className="text-4xl font-extrabold">
            ☰
          </button>
        </div>

        {/* Full Menu for Desktop */}
        <ul className={`hidden md:flex space-x-8`}>
          {navigation.map((item) => (
            <li key={item.name}>
              <a
                href={`/?page=${item.name}`}
                className={`text-xl font-bold cursor-pointer ${isDarkMode ? 'text-white' : 'text-black'} ${item.hover}`}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(item.name);
                  window.history.pushState({}, '', `/${item.name}`);
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
              className={`text-xl font-bold cursor-pointer hover:text-yellow-500 ${isDarkMode ? 'text-white' : 'text-black'}`}
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
                className={`text-xl font-bold cursor-pointer hover:text-yellow-500 ${isDarkMode ? 'text-white' : 'text-black'}`}
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
