import { useEffect, useState } from "react";
import TypeWriter from "./TypeWriter";

interface HomePageProps {
  isDarkMode: boolean;
}

export default function HomePage({ isDarkMode }: HomePageProps) {
  const words = [
    "software engineer",
    "full-stack developer",
    "computer vision scientist",
    "AI enthusiast",
  ];

  // Define an array of colors
  const colors = [
    "#B33A3A", // Muted Red
    "#FF8C42", // Muted Orange
    "#FFD166", // Muted Yellow
    "#6A994E", // Muted Green
    "#577590", // Muted Blue
    "#4C4C9D", // Muted Indigo
    "#8A5C7B", // Muted Violet
  ];

  // State to keep track of the current color index
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  // Cycle through the colors every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 1000); // Change color every second

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [colors.length]);

  // Map over "Prakhar Sinha" to assign a color to each letter
  const coloredName = "Prakhar Sinha".split("").map((letter, index) => (
    <span
      key={index}
      style={{
        color: colors[(index + currentColorIndex) % colors.length], // Shift color based on current index
      }}
    >
      {letter}
    </span>
  ));

  return (
    <>
      <div className="absolute left-0 md:top-1/2 top-1/4 transform -translate-y-1/2 z-0 pt-20">
        <h2
          className={`text-3xl md:text-4xl font-bold ${isDarkMode ? "bg-black text-white" : "bg-white text-black"} px-8 -ml-1 pt-3 md:pb-0 pb-3`}
        >
          My Name is
        </h2>
        <h1
          className={`text-5xl md:text-9xl font-bold ${isDarkMode ? "bg-black text-white" : "bg-white text-black"} px-3 -ml-1 md:pl-6 pl-8 pb-4`}
        >
          {coloredName}
        </h1>
        <TypeWriter isDarkMode={!isDarkMode} words={words} />
        <div
          className={`h-4 ${isDarkMode ? "bg-black text-white" : "bg-white text-black"} px-3 -ml-1 pl-3`}
        />
      </div>
      <div className="absolute right-10 top-1/2 transform -translate-y-1/2 max-w-xs text-right md:pr-8 px-5 pt-64 md:pt-0">
        <h3
          className={`text-2xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-black"}`}
        >
          About Me
        </h3>
        <p
          className={`text-md md:text-lg text-justify ${isDarkMode ? "text-white" : "text-black"}`}
        >
          Hi, welcome to my website! My name is Prakhar Sinha. I am UC Davis
          Computer Science graduate and I work as an AI Engineer (Full-stack,
          backend, AI emphasis) at HuLoop Automation. In my spare time, you can
          find me enjoying nature, playing a video game, or reading a book. When
          it comes to computer science I have three main areas of focus: <br />{" "}
          <br />
        </p>
        <ul className="text-right text-xl md:text-2xl">
          <li>
            <b> AI/Computer Vision,</b>
          </li>
          <li>
            <b>Full-Stack,</b>
          </li>
          <li>
            <b>BCI Development</b>.
          </li>
        </ul>
      </div>
    </>
  );
}
