
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

interface PlaneAnalysisProps {
  frequencies: Record<number, number>;
  onBack: () => void;
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
      "This plane represents inner strength and determination.",
      "Strong willpower and leadership qualities.",
      "Ability to overcome obstacles and challenges.",
      "Natural leadership and pioneering spirit.",
      "Independent and self-reliant nature.",
      "Goal-oriented with strong focus.",
      "Confident decision-making abilities.",
      "Can inspire and motivate others effectively."
    ],
    ifMissing: {
      9: "Lacks compassion and humanitarian instincts. May be self-centered.",
      5: "Poor adaptability and flexibility. Struggles with change.",
      1: "Weak leadership qualities and lack of initiative. Dependent on others."
    },
    allMissing: "Lacks inner strength and determination. May be easily influenced by others. Difficulty in making independent decisions. Tends to give up easily when faced with challenges. Needs external motivation and support. May lack confidence and self-belief."
  },
  {
    name: "Action Plane",
    numbers: [2, 7, 6],
    ifPresent: [
      "Emotionally intelligent and responsible in actions.",
      "Strong sense of duty and service to others.",
      "Excellent in teamwork and cooperation.",
      "Intuitive and spiritually aware.",
      "Caring and nurturing personality.",
      "Good at maintaining relationships.",
      "Balanced approach to life decisions.",
      "Reliable and trustworthy in commitments."
    ],
    ifMissing: {
      2: "Poor cooperation and teamwork abilities. May be overly independent.",
      7: "Lacks spiritual awareness and introspection. Surface-level thinking.",
      6: "Irresponsible and unreliable. Poor family and relationship management."
    },
    allMissing: "Lacks emotional intelligence and responsibility. May be self-centered and unreliable. Difficulty in maintaining relationships. Poor sense of duty and service. Needs to develop empathy and caring nature."
  },
  {
    name: "Mental Plane",
    numbers: [4, 9, 2],
    ifPresent: [
      "Strategic thinker with vision and emotional intelligence.",
      "Excellent planning and organizational skills.",
      "Combines logic with compassion effectively.",
      "Strong analytical and problem-solving abilities.",
      "Good at understanding human psychology.",
      "Balanced approach to mental challenges.",
      "Can handle complex situations with ease.",
      "Natural ability to see the bigger picture."
    ],
    ifMissing: {
      4: "Lacks systematic thinking and organizational skills.",
      9: "Poor humanitarian instincts and broader vision.",
      2: "Weak emotional intelligence and cooperation skills."
    },
    allMissing: "Lacks strategic thinking and mental balance. May have difficulty in complex problem-solving. Poor planning abilities and emotional understanding. Needs to develop analytical and cooperative skills."
  },
  {
    name: "Emotional Plane",
    numbers: [3, 5, 7],
    ifPresent: [
      "Emotionally expressive, intuitive, and spiritually wise.",
      "Excellent communication and creative abilities.",
      "Highly adaptable and flexible nature.",
      "Strong spiritual and intuitive insights.",
      "Creative and artistic tendencies.",
      "Good at expressing emotions and ideas.",
      "Inspirational and motivational personality.",
      "Deep understanding of life's mysteries."
    ],
    ifMissing: {
      3: "Poor communication and creative expression. Difficulty in articulating thoughts.",
      5: "Lacks adaptability and freedom of expression. Rigid thinking.",
      7: "Missing spiritual awareness and introspective abilities."
    },
    allMissing: "Lacks emotional expression and spiritual awareness. May be rigid and uncreative. Poor communication skills and difficulty in adapting to changes. Needs to develop emotional intelligence and spiritual growth."
  },
  {
    name: "Practical Plane",
    numbers: [8, 1, 6],
    ifPresent: [
      "Grounded, reliable, executes tasks with leadership.",
      "Strong material and practical achievements.",
      "Excellent business and management skills.",
      "Natural leadership in practical matters.",
      "Responsible and reliable in commitments.",
      "Good at organizing and executing plans.",
      "Material success and financial stability.",
      "Balanced approach to work and family."
    ],
    ifMissing: {
      8: "Poor business sense and material achievements. Lacks practical ambition.",
      1: "Weak leadership and initiative in practical matters.",
      6: "Irresponsible and unreliable in practical commitments."
    },
    allMissing: "Lacks practical abilities and material success. May be impractical and unreliable. Poor business sense and financial management. Needs to develop practical skills and responsibility."
  },
  {
    name: "Silver Plane",
    numbers: [2, 5, 8],
    ifPresent: [
      "Emotionally aware and instinctively good with finances.",
      "Natural business instincts and financial wisdom.",
      "Excellent at managing resources and investments.",
      "Balanced emotional and material approach.",
      "Good at adapting to financial opportunities.",
      "Cooperative in business partnerships.",
      "Material prosperity through emotional intelligence.",
      "Intuitive understanding of market dynamics."
    ],
    ifMissing: {
      2: "Poor cooperation in financial matters. Overly independent in business.",
      5: "Lacks adaptability in financial opportunities. Rigid financial thinking.",
      8: "Poor material achievements and business sense."
    },
    allMissing: "Lacks financial wisdom and material prosperity. Poor business instincts and difficulty in managing resources. May struggle with financial stability and investment decisions."
  },
  {
    name: "Golden Plane",
    numbers: [4, 5, 6],
    ifPresent: [
      "Emotionally mature, disciplined, balanced and composed under pressure.",
      "Perfect balance of logic, flexibility, and responsibility.",
      "Excellent in managing both personal and professional life.",
      "Strong family values with practical wisdom.",
      "Adaptable yet disciplined approach to life.",
      "Natural ability to handle stress and pressure.",
      "Harmonious personality with balanced traits.",
      "Success in both material and emotional aspects."
    ],
    ifMissing: {
      4: "Lacks discipline and systematic approach. Disorganized thinking.",
      5: "Poor adaptability and rigid behavior. Difficulty in changing circumstances.",
      6: "Irresponsible and unreliable. Poor family and relationship management."
    },
    allMissing: "Lacks balance and maturity in life. May be either too rigid or too flexible. Poor family values and responsibility. Difficulty in handling pressure and stress. Needs overall personality development."
  }
];

export const PlaneAnalysis = ({ frequencies, onBack }: PlaneAnalysisProps) => {
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

  const renderPlaneContent = (plane: typeof PLANE_DEFINITIONS[0]) => {
    const status = getPlaneStatus(plane);
    
    return (
      <div className="space-y-4">
        {/* If Present - Show when plane is complete */}
        {status.isComplete && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle size={20} className="text-green-600" />
              <h4 className="font-bold text-green-800 text-lg">Strengths</h4>
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
              <h4 className="font-bold text-amber-800 text-lg">Areas for Improvement</h4>
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
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
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
          {/* Render all planes */}
          {PLANE_DEFINITIONS.map((plane, index) => {
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
                    ({plane.numbers.join(', ')})
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
  );
};
