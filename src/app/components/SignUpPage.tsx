"use client";

import '../globals.css';
import {
  SignedIn,
  SignedOut,
  SignIn,
  UserButton,
  SignInButton
} from '@clerk/nextjs';

interface HomePageProps {
  isDarkMode: boolean;
}

export default function SignUpPage({ isDarkMode }: HomePageProps) {

  return (
    <div className="flex md:flex-row justify-center md:items-center w-full h-full max-sm:flex-col">
        <div className="max-sm:py-5 md:w-1/3 pr-9 md:text-right max-sm:text-left">
            <h1 className={`text-4xl max-sm:text-2xl font-bold mb-4 md:pl-8 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                Sign up to receive updates!
            </h1>
            <h2 className={`md:text-xl max-sm:mb-4 max-sm:text-md max-sm:text-left md:mb-4 md:pl-8 max-sm:w-full max-sm:max-h-[15vh] overflow-y-auto ${isDarkMode ? 'text-white' : 'text-black'}`}>
                Here, you can sign up to recieve email notifications for stuff that is going with the website and updates regarding my career.  
            </h2>
            <ul className='text-lg md:text-2xl'>
                <li><b>Career Updates</b></li>
                <li><b>Blog Posts</b></li>
                <li><b>Website Development.</b></li>
            </ul>
        </div>
        <div className='max-sm:hidden'>
            <SignedOut>
                <SignIn
                    routing="path"
                    path="/Login"
                    forceRedirectUrl="/"
                />
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </div>
        <div className='md:hidden md:w-full'>
            <div
                className={`flex-shrink-0 w-full h-64 flex justify-center p-3 text-center text-lg cursor-pointer ${
                  isDarkMode ? 'bg-white text-black hover:bg-black hover:text-white hover:border-black' 
                           : 'bg-black text-white hover:bg-white hover:text-black hover:border-white'
                }`}
              >
                   <SignInButton /> 
              </div>
              <div className="h-10" />
        </div>
    </div>
  );
}
