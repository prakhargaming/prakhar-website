"use client";

import { useRef, useEffect } from 'react';
import '../globals.css'

export default function Projects({ isDarkMode }) {
  const scrollContainerRef = useRef(null);

  const projects = [
    { name: "FastSAM for Needle Biopsy", href: "https://github.com/prakhargaming/FastSAM-needle-biopsy", date: "July 2024 - August 2024", source: "Fereidouni Lab"},
    { name: "XAI ResNet-50 Data Visualization Project", href: "https://github.com/prakhargaming/Data-Visualization-Web-Dev-Project", date: "July 2023 - August 2023", source: "VIDI Lab"},
    { name: "Kernal Generation to Enhance Image Similarity", href: "https://github.com/prakhargaming/Lab-thingy", date: "July 2024 - August 2024", source: "Fereidouni Lab"},
    { name: "Colorizing Grayscale Images With Generative Adversarial Network", href: "https://www.kaggle.com/code/praksinha/colorizing-grayscale-images-v2", date: "July 2022 - August 2022", source: "Fereidouni Lab"},
    { name: "Scripta Dashboard", href: "https://github.com/prakhargaming/scripta-dashboard", date: "July 2024 - August 2024", source: "VDart Inc."},
    { name: "Scripta Interview Interface", href: "https://github.com/prakhargaming/scripta-welcome-interface", date: "July 2024 - August 2024", source: "VDart Inc."},
    { name: "Neuro-Prosthetic EEG Controlled Robotic Arm", href: "https://github.com/Neurotech-Davis/RoboticArm", date: "September 2023 - May 2024", source: "Neurotech@Davis"},
    { name: "Chrome No Internet Game Using EEG", href: "https://github.com/Neurotech-Davis/Neurofest-Project-2023", date: "August 2022 - October 2023", source: "Neurotech@Davis"},
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

  return (
    <div className="w-full h-full flex items-center">
      <div 
        ref={scrollContainerRef}
        className={`flex overflow-x-auto scrollbar-hide w-full ${isDarkMode ? 'bg-black' : 'bg-white'}`}
        style={{
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {projects.map((item) => (
  <div className='flex flex-col'>
    <a
      key={item.name}
      className={`flex-shrink-0 w-64 h-48 m-4 flex items-center justify-center p-3 text-center text-lg ${
        isDarkMode ? 'bg-white text-black hover:bg-black hover:text-white hover:border-black' : 'bg-black text-white hover:bg-white hover:text-black hover:border-white'}`}
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {item.name}
    </a>
    <h2 className={`items-center justify-center text-center text-lg ${isDarkMode ? 'text-white' : 'text-black'}`}>
      {item.date}
    </h2>
    <h2 className={`flex-shrink-0 m-4 flex items-center justify-center p-3 text-center text-lg ${
        isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
      {item.source}
    </h2>
  </div>
))}
      </div>
    </div>
  );
}

// 