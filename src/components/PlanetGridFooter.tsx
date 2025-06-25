
import React from 'react';
import { Card } from '@/components/ui/card';

const PlanetGridFooter = () => {
  // 5x5 grid data - organized by position
  const gridData = [
    // Row 1 (Headers)
    {
      title: "DIAGONAL GOLDEN PLANE",
      subtitle: "1 - 5 - 9",
      description: "Courage, Energy, Fame",
      bgColor: "bg-yellow-500",
      textColor: "text-black"
    },
    {
      title: "THOUGHT PLANE",
      subtitle: "4 - 9 - 2", 
      description: "Planning, Reputation, Simplicity",
      bgColor: "bg-blue-400",
      textColor: "text-white"
    },
    {
      title: "WILL POWER PLANE",
      subtitle: "3 - 5 - 7",
      description: "Knowledge, Stability, Research", 
      bgColor: "bg-green-400",
      textColor: "text-white"
    },
    {
      title: "ACTION PLANE",
      subtitle: "8 - 1 - 6",
      description: "Wisdom, Success, Luxury",
      bgColor: "bg-red-400", 
      textColor: "text-white"
    },
    {
      title: "DIAGONAL SILVER PLANE",
      subtitle: "3 - 5 - 7",
      description: "Family, Mind, Spirituality",
      bgColor: "bg-gray-400",
      textColor: "text-white"
    },
    
    // Row 2
    {
      title: "MENTAL PLANE",
      subtitle: "4 - 3 - 8",
      description: "Wealth, Family, Knowledge",
      bgColor: "bg-purple-400",
      textColor: "text-white"
    },
    {
      title: "Wealth & Prosperity",
      subtitle: "Appreciation & Gratitude", 
      number: "4",
      planet: "Rahu",
      friends: "Friends - 6 & 8",
      neutral: "Neutral - 3, 5 & 7",
      enemy: "Enemy - 1, 2 & 9",
      bgColor: "bg-amber-700",
      textColor: "text-white"
    },
    {
      title: "Fame & Reputation",
      subtitle: "Clarity & Integrity",
      number: "9", 
      planet: "Mangal",
      friends: "Friends - 1, 2 & 3",
      neutral: "Neutral - 6 & 8",
      enemy: "Enemy - 4, 5 & 7",
      bgColor: "bg-orange-500",
      textColor: "text-white"
    },
    {
      title: "Marriage & Relationship",
      subtitle: "Directness & Simplicity",
      number: "2",
      planet: "Chandra", 
      friends: "Friends - 1 & 5",
      neutral: "Neutral - 9, 3, 6 & 8",
      enemy: "Enemy - 4 & 7",
      bgColor: "bg-red-500",
      textColor: "text-white"
    },
    {
      title: "HEAD",
      subtitle: "4 - 9 - 2",
      description: "Mental Activities",
      bgColor: "bg-orange-400",
      textColor: "text-white"
    },
    
    // Row 3
    {
      title: "EMOTIONAL PLANE", 
      subtitle: "9 - 5 - 1",
      description: "Fame, Energy, Career",
      bgColor: "bg-pink-400",
      textColor: "text-white"
    },
    {
      title: "Family & Elder Blessing",
      subtitle: "Health & Knowledge",
      number: "3",
      planet: "Guru",
      friends: "Friends - 1, 2 & 9", 
      neutral: "Neutral - 7 & 8",
      enemy: "Enemy - 4, 5 & 6",
      bgColor: "bg-yellow-400",
      textColor: "text-black"
    },
    {
      title: "Energy & Stability",
      subtitle: "Health & Mind",
      number: "5",
      planet: "Budh",
      friends: "Friends - 1 & 6",
      neutral: "Neutral - 3, 4, 8 & 9",
      enemy: "Enemy - 2 & 7",
      bgColor: "bg-green-500", 
      textColor: "text-white"
    },
    {
      title: "Children, Research &",
      subtitle: "Spirituality, Hardwork &",
      number: "7",
      planet: "Ketu",
      friends: "Friends - 1 & 9",
      neutral: "Neutral - 2, 3, 4 & 5",
      enemy: "Enemy - 6 & 8",
      bgColor: "bg-blue-600",
      textColor: "text-white"
    },
    {
      title: "BODY",
      subtitle: "3 - 5 - 7",
      description: "Physical Activities",
      bgColor: "bg-teal-400",
      textColor: "text-white"
    },
    
    // Row 4
    {
      title: "PRACTICAL PLANE",
      subtitle: "2 - 7 - 6", 
      description: "Marriage, Research, Luxury",
      bgColor: "bg-indigo-400",
      textColor: "text-white"
    },
    {
      title: "Wisdom & Knowledge",
      subtitle: "Real Estate & Practical",
      number: "8",
      planet: "Shani",
      friends: "Friends - 4, 5 & 6",
      neutral: "Neutral - 3 & 7",
      enemy: "Enemy - 1, 2 & 9",
      bgColor: "bg-blue-900",
      textColor: "text-white"
    },
    {
      title: "Career & Success",
      subtitle: "Courage & Mentors",
      number: "1", 
      planet: "Surya",
      friends: "Friends - 2, 3 & 9",
      neutral: "Neutral - 5 & 7", 
      enemy: "Enemy - 4, 6 & 8",
      bgColor: "bg-red-600",
      textColor: "text-white"
    },
    {
      title: "Luxury & Friends",
      subtitle: "Sex Amusement & Travel",
      number: "6",
      planet: "Shukra",
      friends: "Friends - 4, 5 & 8",
      neutral: "Neutral - 3, 7 & 9",
      enemy: "Enemy - 1 & 2",
      bgColor: "bg-purple-600",
      textColor: "text-white"
    },
    {
      title: "FEET",
      subtitle: "8 - 1 - 6",
      description: "Ground Level Activities", 
      bgColor: "bg-cyan-400",
      textColor: "text-white"
    }
  ];

  return (
    <footer className="bg-gradient-to-b from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Title Section */}
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Sacred Numerology Grid System
          </h2>
          <p className="text-sm md:text-base text-gray-600">
            Complete planetary influence and plane analysis system
          </p>
        </div>

        {/* Unified 5x5 Grid Layout */}
        <div className="grid grid-cols-5 gap-0 max-w-5xl mx-auto border border-gray-300 shadow-lg">
          {gridData.map((cell, index) => (
            <div 
              key={index} 
              className={`${cell.bgColor} ${cell.textColor} p-2 md:p-4 text-center border border-gray-300 flex flex-col justify-center min-h-[80px] md:min-h-[120px]`}
            >
              <div className="space-y-1">
                <div className="text-xs md:text-sm font-bold leading-tight">
                  {cell.title}
                </div>
                <div className="text-xs md:text-sm font-semibold">
                  {cell.subtitle}
                </div>
                {cell.number && (
                  <div className="text-lg md:text-xl font-bold">
                    {cell.number} {cell.planet}
                  </div>
                )}
                {cell.description && (
                  <div className="text-xs md:text-sm">
                    {cell.description}
                  </div>
                )}
                {cell.friends && (
                  <div className="space-y-0.5">
                    <div className="text-xs md:text-sm">{cell.friends}</div>
                    <div className="text-xs md:text-sm">{cell.neutral}</div>
                    <div className="text-xs md:text-sm">{cell.enemy}</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-500 text-xs md:text-sm border-t border-gray-200 pt-4 md:pt-6">
          <p>&copy; 2024 Sacred Numerology. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default PlanetGridFooter;
