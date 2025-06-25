
import React from 'react';
import { Card } from '@/components/ui/card';

const PlanetGridFooter = () => {
  const gridData = [
    // Row 1 - Head
    {
      plane: "DIAGONAL GOLDEN PLANE",
      numbers: [],
      planet: "",
      planetNumber: "",
      effects: [],
      bgColor: "bg-gray-100",
      textColor: "text-gray-800"
    },
    {
      plane: "THOUGHT PLANE",
      numbers: [4, 3, 8],
      planet: "RAHU",
      planetNumber: "4",
      effects: [
        "Wealth & Prosperity",
        "Appreciation & Gratitude",
        "Friends - 6 & 8",
        "Neutral - 3, 5 & 7",
        "Enemy - 1, 2 & 9"
      ],
      bgColor: "bg-amber-700",
      textColor: "text-white"
    },
    {
      plane: "WILL POWER PLANE",
      numbers: [9, 5, 1],
      planet: "MANGAL",
      planetNumber: "9",
      effects: [
        "Fame & Reputation",
        "Clarity & Integrity",
        "Friends - 1, 2 & 3",
        "Neutral - 6 & 8",
        "Enemy - 4, 5 & 7"
      ],
      bgColor: "bg-orange-500",
      textColor: "text-white"
    },
    {
      plane: "ACTION PLANE",
      numbers: [2, 7, 6],
      planet: "CHANDRA",
      planetNumber: "2",
      effects: [
        "Marriage & Relationship",
        "Directness & Simplicity",
        "Friends - 1 & 5",
        "Neutral - 9, 3, 6 & 8",
        "Enemy - 4 & 7"
      ],
      bgColor: "bg-red-500",
      textColor: "text-white"
    },
    {
      plane: "DIAGONAL SILVER PLANE",
      numbers: [],
      planet: "",
      planetNumber: "",
      effects: [],
      bgColor: "bg-gray-100",
      textColor: "text-gray-800"
    },
    // Row 2 - Body
    {
      plane: "MENTAL PLANE",
      numbers: [],
      planet: "",
      planetNumber: "",
      effects: [],
      bgColor: "bg-blue-100",
      textColor: "text-gray-800"
    },
    {
      plane: "HEAD",
      numbers: [],
      planet: "",
      planetNumber: "",
      effects: [],
      bgColor: "bg-gray-200",
      textColor: "text-gray-800"
    },
    {
      plane: "EMOTIONAL PLANE",
      numbers: [3, 5, 7],
      planet: "GURU",
      planetNumber: "3",
      effects: [
        "Family & Elder Blessing",
        "Health & Knowledge",
        "Friends - 1, 2 & 9",
        "Neutral - 7 & 8",
        "Enemy - 4, 5 & 6"
      ],
      bgColor: "bg-yellow-400",
      textColor: "text-black"
    },
    {
      plane: "BODY",
      numbers: [5],
      planet: "BUDH",
      planetNumber: "5",
      effects: [
        "Energy & Stability",
        "Health & Mind",
        "Friends - 1 & 6",
        "Neutral - 3, 4, 8 & 9",
        "Enemy - 2 & 7"
      ],
      bgColor: "bg-green-500",
      textColor: "text-white"
    },
    {
      plane: "FEET",
      numbers: [7],
      planet: "KETU",
      planetNumber: "7",
      effects: [
        "Children, Research &",
        "Spirituality, Hardwork &",
        "Friends - 1 & 9",
        "Neutral - 2, 3, 4 & 5",
        "Enemy - 6 & 8"
      ],
      bgColor: "bg-blue-600",
      textColor: "text-white"
    },
    // Row 3 - Feet
    {
      plane: "PRACTICAL PLANE",
      numbers: [8, 1, 6],
      planet: "SHANI",
      planetNumber: "8",
      effects: [
        "Wisdom & Knowledge",
        "Real Estate & Practical",
        "Friends - 4, 5 & 6",
        "Neutral - 3 & 7",
        "Enemy - 1, 2 & 9"
      ],
      bgColor: "bg-blue-900",
      textColor: "text-white"
    },
    {
      plane: "SURYA",
      numbers: [1],
      planet: "SURYA",
      planetNumber: "1",
      effects: [
        "Career & Success",
        "Courage & Mentors",
        "Friends - 2, 3 & 9",
        "Neutral - 5 & 7",
        "Enemy - 4, 6 & 8"
      ],
      bgColor: "bg-red-600",
      textColor: "text-white"
    },
    {
      plane: "SHUKRA",
      numbers: [6],
      planet: "SHUKRA",
      planetNumber: "6",
      effects: [
        "Luxury & Friends",
        "Sex Amusement & Travel",
        "Friends - 4, 5 & 8",
        "Neutral - 3, 7 & 9",
        "Enemy - 1 & 2"
      ],
      bgColor: "bg-purple-600",
      textColor: "text-white"
    }
  ];

  // Planet reference grid
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
    <footer className="bg-gradient-to-b from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Nine Planet Grid & Plane System
          </h2>
          <p className="text-gray-600">
            Sacred numerological analysis based on planetary influences and energy planes
          </p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left Side - 3x3 Plane Grid */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-center text-gray-700 mb-4">
              Plane Analysis System
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {gridData.map((cell, index) => (
                <Card 
                  key={index} 
                  className={`${cell.bgColor} ${cell.textColor} p-3 text-center min-h-[120px] flex flex-col justify-center border-2 border-white shadow-lg`}
                >
                  {cell.plane && (
                    <>
                      <div className="font-bold text-xs mb-1">{cell.plane}</div>
                      {cell.numbers.length > 0 && (
                        <div className="font-bold text-lg mb-1">
                          {cell.numbers.join(' - ')}
                        </div>
                      )}
                      {cell.planet && (
                        <div className="font-bold text-sm">
                          {cell.planetNumber} {cell.planet}
                        </div>
                      )}
                      {cell.effects.length > 0 && (
                        <div className="text-xs mt-1 space-y-0.5">
                          {cell.effects.slice(0, 3).map((effect, idx) => (
                            <div key={idx}>{effect}</div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </Card>
              ))}
            </div>
          </div>

          {/* Right Side - Planet Reference */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-center text-gray-700 mb-4">
              Planet & Letter Associations
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {planetGrid.map((planet, index) => (
                <Card key={index} className="bg-white border-2 border-gray-200 p-3 shadow-lg">
                  <div className="grid grid-cols-3 gap-4 items-center text-center">
                    <div className="font-bold text-gray-800">{planet.letters}</div>
                    <div className="font-bold text-2xl text-amber-600">{planet.number}</div>
                    <div className="font-bold text-gray-800">{planet.planet}</div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Body Zones Legend */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card className="bg-blue-100 p-4 text-center border-2 border-blue-200">
            <div className="font-bold text-blue-800 text-lg mb-2">HEAD</div>
            <div className="text-sm text-blue-700">Mental & Thought Processes</div>
          </Card>
          <Card className="bg-green-100 p-4 text-center border-2 border-green-200">
            <div className="font-bold text-green-800 text-lg mb-2">BODY</div>
            <div className="text-sm text-green-700">Physical & Emotional Energy</div>
          </Card>
          <Card className="bg-purple-100 p-4 text-center border-2 border-purple-200">
            <div className="font-bold text-purple-800 text-lg mb-2">FEET</div>
            <div className="text-sm text-purple-700">Practical & Material Aspects</div>
          </Card>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-500 text-sm border-t border-gray-200 pt-6">
          <p>&copy; 2024 Sacred Numerology. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default PlanetGridFooter;
