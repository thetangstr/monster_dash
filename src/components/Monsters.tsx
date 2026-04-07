import React from 'react';

export const FlutterBug = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Purple Wings */}
    <path d="M 50 50 C 10 10, 0 50, 40 60" fill="#c084fc" stroke="black" strokeWidth="4" strokeLinejoin="round" />
    <path d="M 50 50 C 90 10, 100 50, 60 60" fill="#c084fc" stroke="black" strokeWidth="4" strokeLinejoin="round" />
    {/* Curly Legs */}
    <path d="M 40 80 Q 30 90 45 95" stroke="#15803d" strokeWidth="4" fill="none" strokeLinecap="round" />
    <path d="M 60 80 Q 70 90 55 95" stroke="#15803d" strokeWidth="4" fill="none" strokeLinecap="round" />
    {/* Green Body */}
    <ellipse cx="50" cy="55" rx="25" ry="30" fill="#4ade80" stroke="black" strokeWidth="4" />
    {/* Eyes */}
    <circle cx="40" cy="45" r="8" fill="white" stroke="black" strokeWidth="3" />
    <circle cx="60" cy="45" r="8" fill="white" stroke="black" strokeWidth="3" />
    <circle cx="40" cy="45" r="3" fill="black" />
    <circle cx="60" cy="45" r="3" fill="black" />
    {/* Smile */}
    <path d="M 40 65 Q 50 75 60 65" stroke="black" strokeWidth="4" fill="none" strokeLinecap="round" />
  </svg>
);

export const BigBlue = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Tiny Green Legs */}
    <rect x="35" y="80" width="10" height="15" rx="5" fill="#4ade80" stroke="black" strokeWidth="4" />
    <rect x="55" y="80" width="10" height="15" rx="5" fill="#4ade80" stroke="black" strokeWidth="4" />
    {/* Big Blue Body */}
    <circle cx="50" cy="45" r="40" fill="#3b82f6" stroke="black" strokeWidth="4" />
    {/* Derpy Eyes */}
    <circle cx="35" cy="35" r="12" fill="white" stroke="black" strokeWidth="4" />
    <circle cx="65" cy="35" r="8" fill="white" stroke="black" strokeWidth="4" />
    <circle cx="35" cy="35" r="4" fill="black" />
    <circle cx="65" cy="35" r="3" fill="black" />
    {/* Open Mouth */}
    <ellipse cx="50" cy="60" rx="15" ry="10" fill="#1e3a8a" stroke="black" strokeWidth="4" />
    {/* Tooth */}
    <rect x="45" y="50" width="10" height="8" rx="2" fill="white" stroke="black" strokeWidth="2" />
  </svg>
);

export const BananaBoss = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Brown and Blue Blob Body */}
    <path d="M 20 40 C 10 10, 90 10, 80 40 C 95 70, 80 90, 50 90 C 20 90, 5 70, 20 40 Z" fill="#8b4513" stroke="black" strokeWidth="4" strokeLinejoin="round" />
    <path d="M 25 45 C 15 20, 85 20, 75 45 C 85 65, 75 80, 50 80 C 25 80, 15 65, 25 45 Z" fill="#3b82f6" stroke="black" strokeWidth="4" strokeLinejoin="round" />
    
    {/* 5 Eyes */}
    <circle cx="30" cy="30" r="8" fill="white" stroke="black" strokeWidth="3" /><circle cx="30" cy="30" r="3" fill="black" />
    <circle cx="70" cy="30" r="8" fill="white" stroke="black" strokeWidth="3" /><circle cx="70" cy="30" r="3" fill="black" />
    <circle cx="50" cy="20" r="10" fill="white" stroke="black" strokeWidth="3" /><circle cx="50" cy="20" r="4" fill="black" />
    <circle cx="20" cy="50" r="6" fill="white" stroke="black" strokeWidth="3" /><circle cx="20" cy="50" r="2" fill="black" />
    <circle cx="80" cy="50" r="6" fill="white" stroke="black" strokeWidth="3" /><circle cx="80" cy="50" r="2" fill="black" />
    
    {/* Roaring Mouth */}
    <path d="M 30 60 Q 50 85 70 60 Z" fill="#450a0a" stroke="black" strokeWidth="4" strokeLinejoin="round" />
    {/* Sharp Teeth */}
    <path d="M 30 60 L 35 70 L 40 60 L 45 70 L 50 60 L 55 70 L 60 60 L 65 70 L 70 60" fill="white" stroke="black" strokeWidth="2" strokeLinejoin="round" />
    
    {/* Bananas! */}
    <path d="M 5 60 Q -5 80 15 95 Q 10 75 5 60 Z" fill="#facc15" stroke="black" strokeWidth="3" strokeLinejoin="round" />
    <path d="M 95 60 Q 105 80 85 95 Q 90 75 95 60 Z" fill="#facc15" stroke="black" strokeWidth="3" strokeLinejoin="round" />
  </svg>
);
