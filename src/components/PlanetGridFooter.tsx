
import React from 'react';
import { Card } from '@/components/ui/card';

const PlanetGridFooter = () => {
  const gridData = [
    // Row 1
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
    // Row 2
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
    // Row 3
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
    }
  ];

  return (
    <footer className="bg-gradient-to-b from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Nine Planet Grid & Plane System
          </h2>
          <p className="text-sm md:text-base text-gray-600">
            Sacred numerological analysis based on planetary influences and energy planes
          </p>
        </div>

        {/* Main 3x3 Grid - Always maintains 3 columns */}
        <div className="grid grid-cols-3 gap-1 md:gap-2 max-w-4xl mx-auto">
          {gridData.map((cell, index) => (
            <Card 
              key={index} 
              className={`${cell.bgColor} ${cell.textColor} p-2 md:p-4 text-center border-2 border-white shadow-lg`}
            >
              <div className="space-y-1 md:space-y-2">
                <div className="text-xs md:text-sm font-bold leading-tight">
                  {cell.title}
                </div>
                <div className="text-xs md:text-sm font-bold leading-tight">
                  {cell.subtitle}
                </div>
                <div className="text-lg md:text-2xl font-bold">
                  {cell.number} {cell.planet}
                </div>
                <div className="space-y-0.5 md:space-y-1">
                  <div className="text-xs md:text-sm">{cell.friends}</div>
                  <div className="text-xs md:text-sm">{cell.neutral}</div>
                  <div className="text-xs md:text-sm">{cell.enemy}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-500 text-xs md:text-sm border-t border-gray-200 pt-4 md:pt-6 mt-6 md:mt-8">
          <p>&copy; 2024 Sacred Numerology. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default PlanetGridFooter;
