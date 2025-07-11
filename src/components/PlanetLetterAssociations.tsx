import React from 'react';

const planetLetterData = [
  { letters: "A I J Q Y", number: 1, planet: "SURYA", letters2: "E H N X", number2: 5, planet2: "BUDH" },
  { letters: "B K R", number: 2, planet: "CHANDRA", letters2: "U V W", number2: 6, planet2: "SHUKRA" },
  { letters: "C G L S", number: 3, planet: "GURU", letters2: "O Z", number2: 7, planet2: "KETU" },
  { letters: "D M T", number: 4, planet: "RAHU", letters2: "F P", number2: 8, planet2: "SHANI" }
];

export const PlanetLetterAssociations = () => {
  return (
    <div className="w-full mt-8 pt-8 border-t border-border">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8 text-foreground">
          Planet & Letter Associations
        </h2>
        
        {/* Desktop/Tablet: 2 columns */}
        <div className="hidden md:grid md:grid-cols-2 gap-4">
          {planetLetterData.map((row, index) => (
            <React.Fragment key={index}>
              {/* First column of each row */}
              <div className="bg-card rounded-xl shadow-md p-6 border">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-lg text-card-foreground">{row.letters}</div>
                  <div className="text-2xl font-bold text-amber-600">{row.number}</div>
                  <div className="font-bold text-lg text-card-foreground">{row.planet}</div>
                </div>
              </div>
              
              {/* Second column of each row */}
              <div className="bg-card rounded-xl shadow-md p-6 border">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-lg text-card-foreground">{row.letters2}</div>
                  <div className="text-2xl font-bold text-amber-600">{row.number2}</div>
                  <div className="font-bold text-lg text-card-foreground">{row.planet2}</div>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Mobile: 1 column */}
        <div className="md:hidden grid grid-cols-1 gap-4">
          {planetLetterData.flatMap((row, index) => [
            <div key={`${index}-1`} className="bg-card rounded-xl shadow-md p-6 border">
              <div className="flex items-center justify-between">
                <div className="font-bold text-lg text-card-foreground">{row.letters}</div>
                <div className="text-2xl font-bold text-amber-600">{row.number}</div>
                <div className="font-bold text-lg text-card-foreground">{row.planet}</div>
              </div>
            </div>,
            <div key={`${index}-2`} className="bg-card rounded-xl shadow-md p-6 border">
              <div className="flex items-center justify-between">
                <div className="font-bold text-lg text-card-foreground">{row.letters2}</div>
                <div className="text-2xl font-bold text-amber-600">{row.number2}</div>
                <div className="font-bold text-lg text-card-foreground">{row.planet2}</div>
              </div>
            </div>
          ])}
        </div>
      </div>
    </div>
  );
};