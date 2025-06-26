
import React from 'react';
import { Card } from '@/components/ui/card';

const PlanetGridFooter = () => {
  // 5x5 grid data - organized by position
  const gridData = [
    // Row 1 (Headers)
    {
      title: "DIAGONAL GOLDEN PLANE",
      subtitle: "4 - 3 - 8",
      description: "Courage, Energy, Fame",
      bgColor: "grey",
      textColor: "text-black"
    },
    {
      title: "THOUGHT PLANE",
      subtitle: "4 - 9 - 2", 
      description: "Planning, Reputation, Simplicity",
      bgColor: "grey-",
      textColor: "text-black"
    },
    {
      title: "WILL POWER PLANE",
      subtitle: "9 - 5 - 1",
      description: "Knowledge, Stability, Research", 
      bgColor: "grey",
      textColor: "text-black"
    },
    {
      title: "ACTION PLANE",
      subtitle: "2 - 7 - 6",
      description: "Wisdom, Success, Luxury",
      bgColor: "grey",
      textColor: "text-black"
    },
    {
      title: "DIAGONAL SILVER PLANE",
      subtitle: "2 - 5 - 8",
      description: "Family, Mind, Spirituality",
      bgColor: "grey",
      textColor: "text-black"
    },
    
    // Row 2
    {
      title: "MENTAL PLANE",
      subtitle: "4 - 9 - 2",
      description: "Wealth, Family, Knowledge",
      bgColor: "grey",
      textColor: "text-black"
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
      textColor: "text-black"
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
      textColor: "text-black"
    },
    {
      title: "Marriage & Relationship",
      subtitle: "Directness & Simplicity",
      number: "2",
      planet: "Chandra", 
      friends: "Friends - 1 & 5",
      neutral: "Neutral - 9, 3, 6 & 8",
      enemy: "Enemy - 4 & 7",
      bgColor: "bg-white",
      textColor: "text-black"
    },
    {
      title: "HEAD",
      subtitle: "4 - 9 - 2",
      description: "Mental Activities",
      bgColor: "grey",
      textColor: "text-black"
    },
    
    // Row 3
    {
      title: "EMOTIONAL PLANE", 
      subtitle: "3 - 5 - 7",
      description: "Fame, Energy, Career",
      bgColor: "grey",
      textColor: "text-black"
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
      textColor: "text-black"
    },
    {
      title: "Children, Research &",
      subtitle: "Spirituality, Hardwork &",
      number: "7",
      planet: "Ketu",
      friends: "Friends - 1 & 9",
      neutral: "Neutral - 2, 3, 4 & 5",
      enemy: "Enemy - 6 & 8",
      bgColor: "bg-green-200",
      textColor: "text-black"
    },
    {
      title: "BODY",
      subtitle: "3 - 5 - 7",
      description: "Physical Activities",
      bgColor: "grey",
      textColor: "text-black"
    },
    
    // Row 4
    {
      title: "PRACTICAL PLANE",
      subtitle: "8 - 1 - 6", 
      description: "Marriage, Research, Luxury",
      bgColor: "grey",
      textColor: "text-black"
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
      textColor: "text-black"
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
      textColor: "text-black"
    },
    {
      title: "Luxury & Friends",
      subtitle: "Sex Amusement & Travel",
      number: "6",
      planet: "Shukra",
      friends: "Friends - 4, 5 & 8",
      neutral: "Neutral - 3, 7 & 9",
      enemy: "Enemy - 1 & 2",
      bgColor: "bg-white",
      textColor: "text-black"
    },
    {
      title: "FEET",
      subtitle: "8 - 1 - 6",
      description: "Ground Level Activities", 
      bgColor: "grey",
      textColor: "text-black"
    }
  ];

  const planetGrid = [
    { letters: "A I J Q Y", number: "1", planet: "SURYA" },
    { letters: "B K R", number: "2", planet: "CHANDRA" },
    { letters: "C G L S", number: "3", planet: "GURU" },
    { letters: "D M T", number: "4", planet: "RAHU" },
    { letters: "E H N X", number: "5", planet: "BUDH" },
    { letters: "U V W", number: "6", planet: "SHUKRA" },
    { letters: "O Z", number: "7", planet: "KETU" },
    { letters: "F P", number: "8", planet: "SHANI" }
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

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-center text-gray-700 mb-4">
            Planet & Letter Associations
          </h3>

            {/* Responsive 2-column layout (4 cards per column) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[0, 1].map((col) => (
                <div key={col} className="space-y-2">
                  {planetGrid.slice(col * 4, col * 4 + 4).map((planet, index) => (
                    <Card key={index} className="bg-white border-2 border-gray-200 p-3 shadow-lg">
                      <div className="grid grid-cols-3 gap-4 items-center text-center">
                        <div className="font-bold text-gray-800">{planet.letters}</div>
                        <div className="font-bold text-2xl text-amber-600">{planet.number}</div>
                        <div className="font-bold text-gray-800">{planet.planet}</div>
                      </div>
                    </Card>
                  ))}
                </div>
              ))}
            </div>
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
