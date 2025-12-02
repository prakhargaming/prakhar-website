import React, { useState, useEffect } from "react";

interface RainbowWordProps {
  text: string;
  className?: string;
}

const colors = [
  "#B33A3A", // Muted Red
  "#FF8C42", // Muted Orange
  "#FFD166", // Muted Yellow
  "#6A994E", // Muted Green
  "#577590", // Muted Blue
  "#4C4C9D", // Muted Indigo
  "#8A5C7B", // Muted Violet
];

export default function RainbowWord({
  text,
  className = "",
}: RainbowWordProps) {
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColorIndex((prev) => (prev + 1) % colors.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={className}>
      {text.split("").map((letter, index) => (
        <span
          key={index}
          style={{ color: colors[(index + currentColorIndex) % colors.length] }}
        >
          {letter}
        </span>
      ))}
    </span>
  );
}
