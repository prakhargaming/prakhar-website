import TypeWriter from "./TypeWriter";

interface HomePageProps {
  isDarkMode: boolean;
}

export default function HomePage({ isDarkMode }: HomePageProps) {
  const words = [
    'software engineer',
    'full-stack developer',
    'computer vision scientist',
    'AI enthusiast'
  ];

  return (
    <>
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
        <h2 className={`text-4xl font-bold ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'} px-8 -ml-1 pt-3`}>
          My Name is
        </h2>
        <h1 className={`text-9xl font-bold ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'} px-3 -ml-1 pl-3`}>
          Prakhar Sinha
        </h1>
        <TypeWriter isDarkMode={!isDarkMode} words={words} />
        <div className={`h-4 ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'} px-3 -ml-1 pl-3`} />
      </div>
      <div className="absolute right-10 top-1/2 transform -translate-y-1/2 max-w-xs text-right pr-8">
        <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
          About Me
        </h3>
        <p className={`text-lg text-justify ${isDarkMode ? 'text-white' : 'text-black'}`}>
          Hi, welcome to my website! My name is Prakhar Sinha. I recently graduated 
          from UC Davis and am looking to break into the software industry. In my
          spare time, you can find me enjoying nature, playing a video game, or reading
          a book. When it comes to computer science I have three main areas of focus: <br/> <br/>
        </p>
        <ul className='text-right text-2xl'>
            <li><b> AI/Computer Vision,</b></li>
            <li><b>Front-End,</b></li>
            <li><b>BCI Development</b>.</li>
        </ul>
      </div>
    </>
  );
}
