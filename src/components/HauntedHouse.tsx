import React from 'react';

export const HauntedHouseBackground = () => (
  <div className="absolute inset-0 z-0 overflow-hidden bg-gradient-to-b from-indigo-950 via-purple-900 to-slate-950">
    {/* Big Spooky Moon */}
    <div className="absolute top-10 right-20 w-40 h-40 bg-yellow-100 rounded-full shadow-[0_0_60px_rgba(255,255,200,0.4)]"></div>
    
    {/* Twinkling Stars */}
    <div className="absolute top-20 left-20 w-2 h-2 bg-white rounded-full animate-pulse"></div>
    <div className="absolute top-40 left-1/3 w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
    <div className="absolute top-10 left-1/2 w-3 h-3 bg-white rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
    <div className="absolute top-30 right-1/3 w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
    <div className="absolute top-60 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.8s' }}></div>

    {/* Haunted House Silhouette */}
    <svg className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px]" viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Main Building */}
      <path d="M 400 100 L 550 250 L 500 250 L 500 500 L 300 500 L 300 250 L 250 250 Z" fill="#020617" />
      {/* Left Wing */}
      <path d="M 200 200 L 300 300 L 250 300 L 250 500 L 100 500 L 100 300 L 50 300 Z" fill="#020617" />
      {/* Right Wing */}
      <path d="M 600 150 L 750 300 L 700 300 L 700 500 L 500 500 L 500 300 L 450 300 Z" fill="#020617" />
      
      {/* Glowing Windows */}
      <rect x="350" y="300" width="40" height="60" fill="#eab308" className="animate-pulse" />
      <rect x="410" y="300" width="40" height="60" fill="#eab308" className="animate-pulse" style={{ animationDelay: '0.3s' }} />
      <rect x="380" y="180" width="40" height="40" fill="#eab308" rx="20" />
      
      <rect x="150" y="350" width="30" height="50" fill="#eab308" className="animate-pulse" style={{ animationDelay: '0.7s' }} />
      <rect x="600" y="350" width="30" height="50" fill="#eab308" />
      <rect x="650" y="350" width="30" height="50" fill="#eab308" className="animate-pulse" style={{ animationDelay: '0.1s' }} />

      {/* Creepy Door */}
      <path d="M 360 500 L 360 430 A 40 40 0 0 1 440 430 L 440 500 Z" fill="#450a0a" />
    </svg>

    {/* Creepy Dead Trees */}
    <svg className="absolute bottom-0 left-10 w-[250px] h-[400px]" viewBox="0 0 250 400" fill="none">
      <path d="M 120 400 L 110 200 L 50 120 L 100 170 L 120 50 L 140 150 L 220 100 L 150 190 L 140 400 Z" fill="#020617" />
    </svg>
    <svg className="absolute bottom-0 right-10 w-[250px] h-[400px]" viewBox="0 0 250 400" fill="none">
      <path d="M 120 400 L 110 200 L 50 120 L 100 170 L 120 50 L 140 150 L 220 100 L 150 190 L 140 400 Z" fill="#020617" />
    </svg>
    
    {/* Fog / Mist at the bottom */}
    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent opacity-80"></div>
  </div>
);
