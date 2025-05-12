"use client";

import { useRef, useEffect } from "react";
import "../globals.css";

interface HomePageProps {
  isDarkMode: boolean;
}

interface Project {
  name: string;
  href: string;
  date: string;
  source: string;
}

export default function Projects({ isDarkMode }: HomePageProps) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const projects: Project[] = [
    {
      name: "DHS: Davis Housing Services",
      href: "https://github.com/davis-housing-services/dhs",
      date: "Present",
      source: "Startup with Friends",
    },
    {
      name: "FastSAM for Needle Biopsy",
      href: "https://github.com/prakhargaming/FastSAM-needle-biopsy",
      date: "July 2024 - August 2024",
      source: "Fereidouni Lab",
    },
    {
      name: "Kernal Generation to Enhance Image Similarity",
      href: "https://github.com/prakhargaming/Lab-thingy",
      date: "July 2024 - August 2024",
      source: "Fereidouni Lab",
    },
    {
      name: "Scripta Dashboard",
      href: "https://github.com/prakhargaming/scripta-dashboard",
      date: "July 2024 - August 2024",
      source: "VDart Inc.",
    },
    {
      name: "Scripta Interview Interface",
      href: "https://github.com/prakhargaming/scripta-welcome-interface",
      date: "July 2024 - August 2024",
      source: "VDart Inc.",
    },
    {
      name: "Neuro-Prosthetic EEG Controlled Robotic Arm",
      href: "https://github.com/Neurotech-Davis/RoboticArm",
      date: "September 2023 - May 2024",
      source: "Neurotech@Davis",
    },
    {
      name: "Chrome No Internet Game Using EEG",
      href: "https://github.com/Neurotech-Davis/Neurofest-Project-2023",
      date: "August 2022 - October 2023",
      source: "Neurotech@Davis",
    },
    {
      name: "XAI ResNet-50 Data Visualization Project",
      href: "https://github.com/prakhargaming/Data-Visualization-Web-Dev-Project",
      date: "July 2023 - August 2023",
      source: "VIDI Lab",
    },
    {
      name: "Colorizing Grayscale Images With Generative Adversarial Network",
      href: "https://www.kaggle.com/code/praksinha/colorizing-grayscale-images-v2",
      date: "July 2022 - August 2022",
      source: "Neuromatch Academy",
    },
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
      scrollContainer.addEventListener("wheel", handleWheel, {
        passive: false,
      });
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  useEffect(() => {
    const projectPanels = document.querySelectorAll(".project-panel");
    projectPanels.forEach((panel, index) => {
      setTimeout(() => {
        panel.classList.add("slide-in");
      }, index * 100);
    });
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-center items-start">
      {/* Header text, similar to the blog component */}
      <div className="max-sm:py-5">
        <h1
          className={`text-5xl max-sm:text-4xl font-bold mb-4 md:pl-8 ${isDarkMode ? "text-white" : "text-black"}`}
        >
          Welcome to my Projects!
        </h1>
        <h2
          className={`text-xl max-sm:text-left md:mb-8 md:pl-8 w-3/4 max-sm:w-full max-sm:max-h-[15vh] overflow-y-auto ${isDarkMode ? "text-white" : "text-black"}`}
        >
          Here is a collection of my work. These projects span various domains,
          showcasing my skills and experiences in the fields of software
          engineering, AI, Computer Vision, Frontend Web Development and beyond.
        </h2>
      </div>

      <div
        ref={scrollContainerRef}
        className={`flex overflow-x-auto scrollbar-hide w-full md:pl-8 ${isDarkMode ? "bg-black" : "bg-white"}`}
        style={{
          scrollBehavior: "smooth",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {projects.map((item, index) => (
          <div
            key={item.name}
            className="flex flex-col project-panel opacity-0"
          >
            <a
              // Conditionally remove margin for the first item
              className={`flex-shrink-0 w-64 h-48 ${index !== 0 ? "m-4" : "my-4 mr-4"} flex items-center justify-center p-3 text-center text-lg ${isDarkMode ? "bg-white text-black hover:bg-black hover:text-white hover:border-black" : "bg-black text-white hover:bg-white hover:text-black hover:border-white"}`}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.name}
            </a>
            <h2
              className={`items-center justify-center text-center text-lg ${isDarkMode ? "text-white" : "text-black"}`}
            >
              {item.date}
            </h2>
            <h2
              // Same for this element as well, remove margin for the first one
              className={`flex-shrink-0 ${index !== 0 ? "m-4" : "my-4 mr-4"} flex items-center justify-center p-3 text-center text-lg ${isDarkMode ? "bg-white text-black" : "bg-black text-white"}`}
            >
              {item.source}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}
