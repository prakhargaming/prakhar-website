"use client";

import '../globals.css';
import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
  } from '@clerk/nextjs'

interface HomePageProps {
  isDarkMode: boolean;
}


export default function SignUp({ isDarkMode }: HomePageProps) {
    return (
        <div className="items-center w-full h-full">
            <SignedOut>
                <SignInButton />
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </div>
    );
}