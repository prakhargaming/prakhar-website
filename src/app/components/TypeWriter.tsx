"use client";

import React, { useState, useEffect } from "react";

interface TypeWriterProps {
  isDarkMode: boolean;
  words: string[];
}

const TypeWriter = ({ words, isDarkMode }: TypeWriterProps) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  // Typing effect
  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setReverse(true);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(
      () => {
        setSubIndex((prev) => prev + (reverse ? -1 : 1));
      },
      Math.max(
        reverse ? 75 : subIndex === words[index].length ? 1000 : 150,
        Math.random() * 350,
      ),
    );

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  // Blink effect
  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearTimeout(timeout2);
  }, [blink]);

  return (
    <h2
      className={`text-2xl md:text-4xl font-bold px-8 md:pb-3 md:pt-3  ${isDarkMode ? "text-white bg-black" : "text-black bg-white"}`}
    >
      I am a {`${words[index].substring(0, subIndex)}${blink ? "|" : " "}`}
    </h2>
  );
};

export default TypeWriter;
