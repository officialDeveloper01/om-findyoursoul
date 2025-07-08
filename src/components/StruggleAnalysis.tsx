import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface StruggleAnalysisProps {
  onBack: () => void;
  userName: string;
  dateOfBirth: string;
}

export const StruggleAnalysis = ({ onBack, userName, dateOfBirth }: StruggleAnalysisProps) => {
  const planetStruggles = [
    {
      numbers: "1",
      planets: "Surya",
      area: "Confidence, father, government, self-identity",
      signs: "Ego issues, father problems, weak career start",
      end: "22 – 24 Age"
    },
    {
      numbers: "2",
      planets: "Chandra",
      area: "Emotions, mother, peace of mind, mind stability",
      signs: "Anxiety, mood swings, emotional volatility",
      end: "23 – 24 Age"
    },
    {
      numbers: "3",
      planets: "Guru",
      area: "Wisdom, finances, children, dharma",
      signs: "Delay in education, marriage, wealth, and children",
      end: "15 – 16 Age"
    },
    {
      numbers: "4",
      planets: "Rahu",
      area: "Worldly desires, illusion, obsession",
      signs: "Sudden rise/fall, foreign struggles, addictions",
      end: "42 Age"
    },
    {
      numbers: "5",
      planets: "Budh",
      area: "Intelligence, business, speech, decision-making",
      signs: "Confusion, poor judgment, speech or career instability",
      end: "32 – 34 Age"
    },
    {
      numbers: "6",
      planets: "Shukra",
      area: "Love, marriage, luxury, art",
      signs: "Struggles in relationships, delay in love/marriage",
      end: "25 – 28 Age"
    },
    {
      numbers: "7",
      planets: "Ketu",
      area: "Spirituality, detachment, isolation",
      signs: "Confusion, isolation, fear, loss of purpose",
      end: "48 Age"
    },
    {
      numbers: "8",
      planets: "Shani",
      area: "Career, karma, responsibility, patience",
      signs: "Long-term financial, job, or marriage delay",
      end: "36 Age"
    },
    {
      numbers: "9",
      planets: "Mangal",
      area: "Anger, siblings, action, aggression, health",
      signs: "Accidents, court issues, impulsiveness",
      end: "28 – 30 Age"
    }
  ];

  const planeStruggles = [
    {
      sNo: "1",
      grid: "4 – 9 – 2",
      plane: "Mental Plane",
      end: "30 – 34 Age"
    },
    {
      sNo: "2",
      grid: "3 – 5 – 7",
      plane: "Emotional Plane",
      end: "35 – 40 Age"
    },
    {
      sNo: "3",
      grid: "8 – 1 – 6",
      plane: "Practical Plane",
      end: "38 – 45 Age"
    },
    {
      sNo: "4",
      grid: "4 – 3 – 8",
      plane: "Thought Plane",
      end: "36 – 40 Age"
    },
    {
      sNo: "5",
      grid: "9 – 5 – 1",
      plane: "Will Power Plane",
      end: "32 – 36 Age"
    },
    {
      sNo: "6",
      grid: "2 – 7 – 6",
      plane: "Action Plane",
      end: "35 – 38 Age"
    },
    {
      sNo: "7",
      grid: "2 – 5 – 8",
      plane: "Silver Diagonal Plane",
      end: "38 – 44 Age"
    },
    {
      sNo: "8",
      grid: "4 – 5 – 6",
      plane: "Golden Diagonal Plane",
      end: "30 – 36 Age"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 font-calibri">
      <Card className="shadow-xl border-2 border-gray-400 bg-white/90 backdrop-blur-md rounded-xl">
        <CardHeader className="text-center pb-6 relative">
          <Button
            onClick={onBack}
            variant="outline"
            size="sm"
            className="absolute top-4 right-4 flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Back
          </Button>
          
          <CardTitle className="text-2xl font-bold text-gray-700 mb-2">
            Age of Struggle End Analysis
          </CardTitle>
          <div className="text-center mb-4">
            <p className="font-semibold text-gray-800 text-lg">{userName}</p>
            <p className="text-gray-600">{new Date(dateOfBirth).toLocaleDateString()}</p>
          </div>
        </CardHeader>

        <CardContent className="space-y-8 p-6">
          {/* Table 1: Struggles by Planet */}
          <div>
            <h3 className="text-xl font-bold text-gray-700 mb-4 text-center">
              Struggles by Planet
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-2 border-gray-400 rounded-lg overflow-hidden bg-white">
                <thead className="bg-amber-100">
                  <tr>
                    <th className="border border-gray-400 px-3 py-3 text-left font-bold text-gray-700 text-sm">Numbers</th>
                    <th className="border border-gray-400 px-3 py-3 text-left font-bold text-gray-700 text-sm">Planets</th>
                    <th className="border border-gray-400 px-3 py-3 text-left font-bold text-gray-700 text-sm">Area of Struggle</th>
                    <th className="border border-gray-400 px-3 py-3 text-left font-bold text-gray-700 text-sm">Struggle Signs</th>
                    <th className="border border-gray-400 px-3 py-3 text-left font-bold text-gray-700 text-sm">Struggle End</th>
                  </tr>
                </thead>
                <tbody>
                  {planetStruggles.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="border border-gray-400 px-3 py-3 font-semibold text-amber-700 text-sm">{row.numbers}</td>
                      <td className="border border-gray-400 px-3 py-3 font-semibold text-gray-800 text-sm">{row.planets}</td>
                      <td className="border border-gray-400 px-3 py-3 text-gray-700 text-sm">{row.area}</td>
                      <td className="border border-gray-400 px-3 py-3 text-gray-700 text-sm">{row.signs}</td>
                      <td className="border border-gray-400 px-3 py-3 font-semibold text-blue-700 text-sm">{row.end}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Table 2: Struggles by Plane */}
          <div>
            <h3 className="text-xl font-bold text-gray-700 mb-4 text-center">
              Struggles by Plane
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-2 border-gray-400 rounded-lg overflow-hidden bg-white">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="border border-gray-400 px-3 py-3 text-left font-bold text-gray-700 text-sm">S. No.</th>
                    <th className="border border-gray-400 px-3 py-3 text-left font-bold text-gray-700 text-sm">Grid</th>
                    <th className="border border-gray-400 px-3 py-3 text-left font-bold text-gray-700 text-sm">Plane</th>
                    <th className="border border-gray-400 px-3 py-3 text-left font-bold text-gray-700 text-sm">Struggle End</th>
                  </tr>
                </thead>
                <tbody>
                  {planeStruggles.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="border border-gray-400 px-3 py-3 font-semibold text-gray-800 text-sm">{row.sNo}</td>
                      <td className="border border-gray-400 px-3 py-3 font-semibold text-amber-700 text-sm">{row.grid}</td>
                      <td className="border border-gray-400 px-3 py-3 font-semibold text-gray-800 text-sm">{row.plane}</td>
                      <td className="border border-gray-400 px-3 py-3 font-semibold text-blue-700 text-sm">{row.end}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom Back Button */}
          <div className="text-center pt-4">
            <Button
              onClick={onBack}
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 py-2"
            >
              Back to Grid
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};