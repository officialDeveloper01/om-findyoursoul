
import { Card } from '@/components/ui/card';

const PLANE_DATA = [
  // Mental Plane Row
  [
    {
      title: "DIAGONAL GOLDEN PLANE",
      description: "Wealth & Prosperity\nAppreciation & Gratitude",
      planet: "4 Rahu",
      friends: "6 & 8",
      neutral: "3, 5 & 7", 
      enemy: "1, 2 & 9",
      bgColor: "bg-amber-100"
    },
    {
      title: "THOUGHT PLANE",
      description: "Fame & Reputation\nClarity & Integrity",
      planet: "9 Mangal",
      friends: "1, 2 & 3",
      neutral: "6 & 8",
      enemy: "4, 5 & 7",
      bgColor: "bg-orange-200"
    },
    {
      title: "WILL POWER PLANE",
      description: "Marriage & Relationship\nDirectness & Simplicity",
      planet: "2 Chandra",
      friends: "1 & 5",
      neutral: "9, 3, 6 & 8",
      enemy: "4 & 7",
      bgColor: "bg-red-200"
    },
    {
      title: "ACTION PLANE",
      description: "Energy & Stability\nHealth & Mind",
      planet: "5 Budh",
      friends: "1 & 6",
      neutral: "3, 4, 8 & 9",
      enemy: "2 & 7",
      bgColor: "bg-green-200"
    },
    {
      title: "DIAGONAL SILVER PLANE",
      description: "HEAD",
      planet: "",
      friends: "",
      neutral: "",
      enemy: "",
      bgColor: "bg-blue-100"
    }
  ],
  // Emotional Plane Row
  [
    {
      title: "MENTAL PLANE",
      description: "Family & Elder Blessing\nHealth & Knowledge",
      planet: "3 Guru",
      friends: "1, 2 & 9",
      neutral: "7 & 8",
      enemy: "4, 5 & 6",
      bgColor: "bg-yellow-200"
    },
    {
      title: "",
      description: "Children, Research &\nSpirituality, Hardwork &",
      planet: "7 Ketu",
      friends: "1 & 9",
      neutral: "2, 3, 4 & 5",
      enemy: "6 & 8",
      bgColor: "bg-blue-200"
    },
    {
      title: "",
      description: "Luxury & Friends\nSex Amusement & Travel",
      planet: "6 Shukra",
      friends: "4, 5 & 8",
      neutral: "3, 7 & 9",
      enemy: "1 & 2",
      bgColor: "bg-purple-200"
    },
    {
      title: "",
      description: "BODY",
      planet: "",
      friends: "",
      neutral: "",
      enemy: "",
      bgColor: "bg-blue-100"
    },
    {
      title: "",
      description: "",
      planet: "",
      friends: "",
      neutral: "",
      enemy: "",
      bgColor: "bg-blue-100"
    }
  ],
  // Practical Plane Row
  [
    {
      title: "EMOTIONAL PLANE",
      description: "Wisdom & Knowledge\nReal Estate & Practical",
      planet: "8 Shani",
      friends: "4, 5 & 6",
      neutral: "3 & 7",
      enemy: "1, 2 & 9",
      bgColor: "bg-blue-300"
    },
    {
      title: "",
      description: "Career & Success\nCourage & Mentors",
      planet: "1 Surya",
      friends: "2, 3 & 9",
      neutral: "5 & 7",
      enemy: "4, 6 & 8",
      bgColor: "bg-red-300"
    },
    {
      title: "",
      description: "FEET",
      planet: "",
      friends: "",
      neutral: "",
      enemy: "",
      bgColor: "bg-blue-100"
    },
    {
      title: "",
      description: "",
      planet: "",
      friends: "",
      neutral: "",
      enemy: "",
      bgColor: "bg-blue-100"
    },
    {
      title: "PRACTICAL PLANE",
      description: "",
      planet: "",
      friends: "",
      neutral: "",
      enemy: "",
      bgColor: "bg-blue-100"
    }
  ]
];

export const PlaneMatrixGrid = () => {
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[800px] grid grid-cols-5 gap-1 font-calibri text-xs">
        {PLANE_DATA.map((row, rowIndex) => 
          row.map((cell, cellIndex) => (
            <Card 
              key={`${rowIndex}-${cellIndex}`} 
              className={`${cell.bgColor} border border-gray-400 p-2 min-h-[120px] relative`}
            >
              {cell.title && (
                <div className="font-bold text-center mb-1 text-[10px] leading-tight">
                  {cell.title}
                </div>
              )}
              
              {cell.description && (
                <div className="text-center mb-2 text-[9px] leading-tight whitespace-pre-line">
                  {cell.description}
                </div>
              )}
              
              {cell.planet && (
                <div className="text-center font-bold mb-1 text-[10px]">
                  {cell.planet}
                </div>
              )}
              
              {cell.friends && (
                <div className="space-y-0.5 text-[8px]">
                  <div className="text-green-700">
                    <span className="font-semibold">Friends - </span>{cell.friends}
                  </div>
                  <div className="text-blue-700">
                    <span className="font-semibold">Neutral - </span>{cell.neutral}
                  </div>
                  <div className="text-red-700">
                    <span className="font-semibold">Enemy - </span>{cell.enemy}
                  </div>
                </div>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
