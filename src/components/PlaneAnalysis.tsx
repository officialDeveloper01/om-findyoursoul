
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

interface PlaneAnalysisProps {
  frequencies: Record<number, number>;
  onBack: () => void;
  userName?: string;
  dateOfBirth?: string;
}

const PLANE_DEFINITIONS = [
  {
    name: "Thought Plane",
    numbers: [4, 3, 8],
    ifPresent: [
      "This plane shows the intellectual capability of a person.",
      "It reflects how someone thinks, analyses, and processes information.",
      "It shows clarity of thought, imagination, memory, discipline, and logic.",
      "Extremely strong and sharp intellect.",
      "Analytical + Creative + Ambitious.",
      "Good at problem-solving, planning, and execution.",
      "Strong memory and concentration.",
      "Can become inventors, strategists, successful in business or technology."
    ],
    individualStrengths: {
      4: "Strong logic, method, and structure. Appears well-organized and systematic.",
      3: "Excellent communication and creative expression skills.",
      8: "Strong long-term planning and pressure handling capabilities."
    },
    ifMissing: {
      4: "Weakness in logic, method, or structure. May appear disorganized.",
      3: "Difficulty expressing thoughts, poor communication.",
      8: "Lacks long-term planning or management capability. Poor in handling pressure."
    },
    allMissing: "May result in imbalanced thinking or gaps in mental ability. Either too dreamy (without execution) or too rigid (without creativity). Thought plane completely absent. Indicates poor concentration. Person may lack clarity, poor decision-making, impulsive or overly dependent on others. Difficulty in learning, memory, long-term thinking, mental restlessness and easily influenced. Needs conscious effort to improve mental strength."
  },
  {
    name: "Will Power Plane",
    numbers: [9, 5, 1],
    ifPresent: [
      "Very determined and persistent.",
      "Strong decision-making abilities.",
      "A natural leader with clear goals.",
      "Possess strong self-discipline and mental focus.",
      "Can resist temptations and distractions with ease.",
      "Confident in actions and convictions.",
      "Suited for leadership roles, entrepreneurship, and high-responsibility jobs.",
      "Can handle pressure, challenges, and responsibilities gracefully.",
      "Excellent in executing plans and maintaining consistency."
    ],
    individualStrengths: {
      9: "Strong initiative and ability to start tasks with determination.",
      5: "Excellent balance and ability to stay centered under pressure.",
      1: "Strong moral conviction, purpose, and long-term vision."
    },
    ifMissing: {
      9: "Lacks initiative, struggles to start tasks.",
      5: "Finds it hard to balance or stay centered. Easily overwhelmed.",
      1: "May lack moral conviction, purpose, or long-term vision."
    },
    allMissing: "The willpower might be weakened or inconsistent. May struggle with self-control, focus, or decision-making. There may be a tendency to procrastinate, or give in to pressure. Indicates a lack of willpower, confidence, and direction. May find it difficult to say no, take decisions, or stay focused. Tendency to rely on others for motivation or leadership."
  },
  {
    name: "Action Plane",
    numbers: [2, 7, 6],
    ifPresent: [
      "A doer – turns thoughts and plans into tangible actions.",
      "Balanced between feelings (2), wisdom (7), and practicality (6).",
      "Takes responsibility seriously, often works for the betterment of others.",
      "Combines empathy with action, making you a great caregiver, guide, or leader.",
      "Has inner spiritual depth, yet remains grounded and responsible.",
      "Strong execution power; you don't just dream, you act.",
      "Attracted to service-based roles – teaching, healing, leadership, counselling, or social work.",
      "Strong sense of duty, can handle work pressure with calmness and grace."
    ],
    individualStrengths: {
      2: "Strong emotional intelligence and ability to relate well to others.",
      7: "Takes responsibility seriously and maintains family/duty focus.",
      6: "Deep spiritual wisdom, inner reflection, and contemplative nature."
    },
    ifMissing: {
      2: "Lack of emotional intelligence or inability to relate to others.",
      7: "Avoids responsibility, may neglect family or duty.",
      6: "Misses spiritual depth, inner wisdom, and reflective nature."
    },
    allMissing: "The action power may be imbalanced or inconsistent. Might struggle with completion, empathy, or responsibility depending on what's missing. Difficulty in translating thoughts into action. May remain in a state of indecision or inaction. Struggles with commitment, consistency, and fulfilling responsibilities."
  },
  {
    name: "Mental Plane",
    numbers: [4, 9, 2],
    ifPresent: [
      "Sharp thinker: Combines logic (4), idealism (9), and intuition (2).",
      "Balanced mind set: Rational, visionary, and emotionally intelligent.",
      "Has a structured way of thinking, but also sees the bigger picture.",
      "Can use both analytical skills and gut feeling to make decisions.",
      "Excellent in planning, analysing, and innovating.",
      "Well-suited for fields that need mental focus, like engineering, strategy, law, education, research, or leadership.",
      "Quick learner with capacity for deep understanding and visionary thinking.",
      "Makes fair, calculated decisions and is often a good advisor."
    ],
    individualStrengths: {
      4: "Strong discipline and structured thinking approach.",
      9: "Excellent long-term vision and idealistic thinking.",
      2: "Strong emotional intelligence and teamwork abilities."
    },
    ifMissing: {
      4: "Lack of discipline, scattered thinking, struggles with structure.",
      9: "Can't see long-term goals, lacks vision or idealism.",
      2: "Weak emotional intelligence, poor at teamwork or understanding others."
    },
    allMissing: "An incomplete mental plane leads to either rigid, short-sighted, or emotionally distant thought patterns. Thinking can be scattered, inconsistent, or confused. May act impulsively or depend on others for intellectual direction. Lacks mental discipline, foresight, or emotional clarity."
  },
  {
    name: "Emotional Plane",
    numbers: [3, 5, 7],
    ifPresent: [
      "Emotionally expressive, yet composed and balanced.",
      "Strong EQ (Emotional Intelligence).",
      "Able to understand, express, and manage feelings well.",
      "Deep spiritual sensitivity combined with emotional stability.",
      "Likely to be empathetic, warm, and intuitive.",
      "Good at handling stress, maintaining inner peace.",
      "Builds healthy, emotionally connected relationships.",
      "Can comfort, motivate, and lead with compassion.",
      "Often a healer, counsellor, artist, or spiritual guide."
    ],
    individualStrengths: {
      3: "Excellent emotional expression and warm communication style.",
      5: "Strong emotional balance and ability to stay centered.",
      7: "Deep spiritual calm and emotional depth."
    },
    ifMissing: {
      3: "Difficulty expressing emotions, may appear cold or reserved.",
      5: "Struggles with emotional balance; gets overwhelmed or detached.",
      7: "Lacks depth or spiritual calm; may be restless or shallow emotionally."
    },
    allMissing: "An incomplete emotional plane may lead to Mood swings, Emotional suppression and Difficulty connecting deeply with others. Low emotional resilience and poor emotional expression. Can lead to emotional blockages, social disconnection, or fear of intimacy. May become overly logical, withdrawn, or reactive."
  },
  {
    name: "Practical Plane",
    numbers: [8, 1, 6],
    ifPresent: [
      "Highly organized and efficient in managing life and responsibilities.",
      "Strong sense of duty, both personal and social.",
      "Capable of turning ideas into action with discipline and foresight.",
      "Good at financial planning, time management, and administration.",
      "Possesses leadership abilities, yet remains family- and society-oriented.",
      "Excels in careers related to business, management, finance, law, public service, or any field needing grounded execution.",
      "Reliable, practical, and respected for getting things done.",
      "Values both material success and social responsibility."
    ],
    individualStrengths: {
      8: "Excellent planning, money management, and authority handling.",
      1: "Strong initiative, self-drive, and leadership capabilities.",
      6: "Strong family responsibilities and emotional grounding."
    },
    ifMissing: {
      8: "Poor in planning, money management, or handling authority.",
      1: "Lack of initiative, self-drive, or leadership.",
      6: "Struggles with family responsibilities or emotional grounding."
    },
    allMissing: "A partially missing practical plane may result in: Inconsistent execution, Avoidance of responsibility and Trouble with long-term planning or leadership roles. May struggle to apply thoughts into real-world action. Poor in money matters, work discipline, and responsibility handling. Can be impractical, lacking structure, or overwhelmed by daily life tasks."
  },
  {
    name: "Silver Plane",
    numbers: [2, 5, 8],
    ifPresent: [
      "Strong financial instincts; knows when and where to invest time, money, and effort.",
      "Emotionally intelligent with money — balances head and heart well.",
      "Able to read people, sense trends, and make timely decisions.",
      "Highly adaptable; can handle change well while staying grounded.",
      "Has a mix of intuitive, practical, and organizational strengths.",
      "Great potential in finance, investments, trading, real estate, or any field requiring quick judgment and calculated risks.",
      "Can balance personal emotions with professional goals.",
      "Often becomes financially stable over time due to smart decisions."
    ],
    individualStrengths: {
      2: "Strong emotional awareness in decision-making and balanced approach.",
      5: "Excellent adaptability and ability to stay balanced in changing situations.",
      8: "Strong planning and organization in material and financial matters."
    },
    ifMissing: {
      2: "Lacks emotional awareness in decision-making; may become too mechanical.",
      5: "Difficulty adapting or staying balanced; can feel stuck or chaotic.",
      8: "Poor planner, disorganized in material or financial matters."
    },
    allMissing: "Incomplete Silver Plane may lead to: Financial instability, Poor adaptability in practical life and Emotional imbalance in work or money-related matters. Struggles to balance emotions with practical decisions. Poor money management, often impulsive or overly cautious. May face frequent financial stress or fail to capitalize on opportunities."
  },
  {
    name: "Golden Plane",
    numbers: [4, 5, 6],
    ifPresent: [
      "Highly organized and disciplined thinker (4)",
      "Emotionally balanced and adaptable (5)",
      "Strong sense of responsibility and care for family, community, and work (6)",
      "Can efficiently manage both personal and professional life",
      "Naturally attracts respect, trust, and stability",
      "Very successful in both career and family life.",
      "Has the ability to solve problems calmly and logically, even under pressure.",
      "Ideal for careers in management, education, healthcare, administration, or any people-oriented leadership role.",
      "Tends to attract abundance through sincere efforts, ethical work, and emotional maturity."
    ],
    individualStrengths: {
      4: "Strong structure, time management, and clear thinking abilities.",
      5: "Excellent emotional stability and adaptability.",
      6: "Strong sense of responsibility and emotional connection to family/work."
    },
    ifMissing: {
      4: "Struggles with structure, time management, and clear thinking.",
      5: "Lacks emotional stability; gets overwhelmed easily or becomes too rigid.",
      6: "Avoids responsibilities; may be emotionally disconnected from family/work."
    },
    allMissing: "An incomplete Golden Plane can result in: Imbalance in work-life harmony, Inconsistent decision-making, poor relationship management and Emotional reactivity or avoidance of duties. May lack the core stability needed to succeed in the real world. Tends to be disorganized, emotionally reactive, or ungrounded. Struggles in maintaining balance between work, emotions, and responsibilities. Needs strong external support or discipline to succeed."
  }
];

export const PlaneAnalysis = ({ frequencies, onBack, userName, dateOfBirth }: PlaneAnalysisProps) => {
  const getPlaneStatus = (plane: typeof PLANE_DEFINITIONS[0]) => {
    const presentNumbers = plane.numbers.filter(num => (frequencies[num] || 0) > 0);
    const missingNumbers = plane.numbers.filter(num => (frequencies[num] || 0) === 0);
    
    return {
      isComplete: presentNumbers.length === plane.numbers.length,
      isPartiallyMissing: missingNumbers.length > 0 && missingNumbers.length < plane.numbers.length,
      isCompletelyMissing: missingNumbers.length === plane.numbers.length,
      missingNumbers,
      presentNumbers
    };
  };

  // Sort planes: complete first, then partially missing, then completely missing
  const sortedPlanes = [...PLANE_DEFINITIONS].sort((a, b) => {
    const statusA = getPlaneStatus(a);
    const statusB = getPlaneStatus(b);
    
    if (statusA.isComplete && !statusB.isComplete) return -1;
    if (!statusA.isComplete && statusB.isComplete) return 1;
    if (statusA.isPartiallyMissing && statusB.isCompletelyMissing) return -1;
    if (statusA.isCompletelyMissing && statusB.isPartiallyMissing) return 1;
    
    return 0;
  });

  const renderGridCell = (digit: number) => {
    const count = frequencies[digit] || 0;

    return (
      <div className="relative aspect-square bg-white border border-gray-300 rounded-lg flex items-center justify-center text-center p-2">
        {count > 0 && (
          <div className="text-2xl md:text-3xl font-bold text-gray-800 flex flex-wrap justify-center">
            {String(digit).repeat(count)}
          </div>
        )}
      </div>
    );
  };

  const gridNumbers = [
    [4, 9, 2],
    [3, 5, 7],
    [8, 1, 6],
  ];

  const renderPlaneContent = (plane: typeof PLANE_DEFINITIONS[0]) => {
    const status = getPlaneStatus(plane);
    
    return (
      <div className="space-y-4">
        {/* Show present numbers and their strengths */}
        {status.presentNumbers.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle size={20} className="text-green-600" />
              <h4 className="font-bold text-green-800 text-lg">Present</h4>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <ul className="space-y-2">
                {status.presentNumbers.map((presentNum) => (
                  <li key={`present-${presentNum}`} className="text-gray-700 flex items-start gap-2">
                    <span className="text-green-600 mt-1 font-bold">{presentNum}:</span>
                    <span>{plane.individualStrengths[presentNum]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* If Complete - Show when plane is complete */}
        {status.isComplete && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle size={20} className="text-green-600" />
              <h4 className="font-bold text-green-800 text-lg">Overall Strengths</h4>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <ul className="space-y-2">
                {plane.ifPresent.map((point, index) => (
                  <li key={`present-${index}`} className="text-gray-700 flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* If Missing - Show missing number points */}
        {(status.isPartiallyMissing || status.isCompletelyMissing) && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle size={20} className="text-amber-600" />
              <h4 className="font-bold text-amber-800 text-lg">Missing</h4>
            </div>
            
            {/* Individual missing number points */}
            {status.missingNumbers.length > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <ul className="space-y-2">
                  {status.missingNumbers.map((missingNum) => (
                    <li key={`missing-${missingNum}`} className="text-gray-700 flex items-start gap-2">
                      <span className="text-amber-600 mt-1 font-bold">{missingNum}:</span>
                      <span>{plane.ifMissing[missingNum]}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* All missing - show complete missing description */}
            {status.isCompletelyMissing && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-3">
                <div className="flex items-center gap-2 mb-2">
                  <XCircle size={16} className="text-red-600" />
                  <span className="font-bold text-red-800">Complete Absence</span>
                </div>
                <p className="text-gray-700">{plane.allMissing}</p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 font-calibri">
      {/* Back Button */}
      <div className="mb-6">
        <Button 
          onClick={onBack}
          className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 py-2"
        >
          ← Back to Analysis
        </Button>
      </div>

      {/* User Info Header */}
      {(userName || dateOfBirth) && (
        <Card className="shadow-xl border border-amber-200 bg-white rounded-xl mb-8">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-blue-800">
              Plane Analysis Report
            </CardTitle>
            <div className="text-lg text-gray-700 space-y-1">
              {userName && <div className="font-semibold">{userName}</div>}
              {dateOfBirth && <div className="text-gray-600">Date of Birth: {dateOfBirth}</div>}
            </div>
          </CardHeader>
        </Card>
      )}

      {/* Lo Shu Grid for Reference */}
      <Card className="shadow-xl border border-amber-200 bg-white rounded-xl mb-8">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl font-bold text-blue-800">
            Lo Shu Grid Reference
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center">
            <div className="grid grid-cols-3 gap-2 w-full max-w-xs mx-auto">
              {gridNumbers.flat().map((digit, index) => (
                <div key={`grid-cell-${digit}-${index}`}>{renderGridCell(digit)}</div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Plane Analysis */}
      <Card 
        className="shadow-xl border border-amber-200 bg-white rounded-xl font-calibri relative overflow-hidden"
        style={{
          backgroundImage: `url(/lovable-uploads/b4d05a52-4d67-4119-a39b-5f854008adab.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Semi-transparent overlay for readability */}
        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm"></div>
        
        <div className="relative z-10">
          <CardHeader className="pb-4">
            <CardTitle className="text-3xl font-bold text-amber-700 text-center">
              Detailed Plane Analysis
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-8">
            {/* Render sorted planes */}
            {sortedPlanes.map((plane, index) => {
              const status = getPlaneStatus(plane);
              
              return (
                <div 
                  key={`plane-${index}`} 
                  className="border border-gray-300 rounded-lg p-6 shadow-sm bg-white/80 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-3 mb-4">
                    {status.isComplete ? (
                      <CheckCircle size={24} className="text-green-600" />
                    ) : status.isPartiallyMissing ? (
                      <AlertTriangle size={24} className="text-amber-600" />
                    ) : (
                      <XCircle size={24} className="text-red-600" />
                    )}
                    <h3 className="text-xl font-bold text-gray-800">{plane.name}</h3>
                    <div className="text-sm text-gray-500">
                      ({plane.numbers.join(' – ')})
                    </div>
                  </div>
                  
                  {renderPlaneContent(plane)}
                </div>
              );
            })}
            
            <div className="text-center pt-4">
              <Button 
                onClick={onBack}
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 py-2"
              >
                Back to Analysis
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};
