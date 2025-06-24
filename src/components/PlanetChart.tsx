
import { Card, CardContent } from '@/components/ui/card';

const PLANET_MAPPINGS = [
  { letters: "A I J Q Y", number: "1", planet: "SURYA" },
  { letters: "B K R", number: "2", planet: "CHANDRA" },
  { letters: "C G L S", number: "3", planet: "GURU" },
  { letters: "D M T", number: "4", planet: "RAHU" },
  { letters: "E H N X", number: "5", planet: "BUDH" },
  { letters: "U V W", number: "6", planet: "SHUKRA" },
  { letters: "O Z", number: "7", planet: "KETU" },
  { letters: "F P", number: "8", planet: "SHANI" }
];

export const PlanetChart = () => {
  return (
    <Card className="bg-white border border-gray-400 font-calibri">
      <CardContent className="p-2">
        <div className="grid grid-cols-3 gap-1">
          {/* Header */}
          <div className="bg-gray-200 border border-gray-400 p-1 text-center font-bold text-xs">
            Letters
          </div>
          <div className="bg-gray-200 border border-gray-400 p-1 text-center font-bold text-xs">
            Number
          </div>
          <div className="bg-gray-200 border border-gray-400 p-1 text-center font-bold text-xs">
            Planet
          </div>
          
          {/* Data rows */}
          {PLANET_MAPPINGS.map((mapping, index) => (
            <>
              <div 
                key={`letters-${index}`}
                className="bg-blue-100 border border-gray-400 p-1 text-center text-xs font-semibold"
              >
                {mapping.letters}
              </div>
              <div 
                key={`number-${index}`}
                className="bg-green-100 border border-gray-400 p-1 text-center text-xs font-bold"
              >
                {mapping.number}
              </div>
              <div 
                key={`planet-${index}`}
                className="bg-yellow-100 border border-gray-400 p-1 text-center text-xs font-bold"
              >
                {mapping.planet}
              </div>
            </>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
