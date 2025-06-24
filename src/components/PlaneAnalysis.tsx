
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

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
      "Strong willpower and determination to achieve goals.",
      "Natural leadership qualities and ability to inspire others.",
      "Inner strength to overcome obstacles and challenges.",
      "Independent thinking and self-reliance.",
      "Courage to take calculated risks and make tough decisions.",
      "Ability to motivate self and others during difficult times.",
      "Strong sense of purpose and direction in life.",
      "Can become leaders, entrepreneurs, motivational speakers."
    ],
    ifMissing: {
      9: "Lack of humanitarian approach, may be selfish or narrow-minded.",
      5: "Difficulty in communication and social connections. May be restless.",
      1: "Weak leadership qualities, dependent on others for decisions."
    },
    allMissing: "Weak willpower and lack of determination. Easily gives up when faced with challenges. Poor leadership qualities and difficulty in making independent decisions. May lack self-confidence and rely heavily on others for guidance. Needs to develop inner strength and self-reliance through conscious effort."
  },
  { 
    name: "Action Plane", 
    numbers: [2, 7, 6],
    ifPresent: [
      "Emotionally intelligent and responsible in actions.",
      "Good at teamwork and collaborative efforts.",
      "Strong sense of duty and responsibility.",
      "Intuitive understanding of situations and people.",
      "Balanced approach between emotion and logic.",
      "Excellent in nurturing and caring roles.",
      "Strong spiritual awareness and wisdom.",
      "Can excel in counseling, healing, teaching professions."
    ],
    ifMissing: {
      2: "Poor teamwork, difficulty in cooperation and partnerships.",
      7: "Lack of spiritual awareness, may be too materialistic.",
      6: "Irresponsible behavior, poor family relationships."
    },
    allMissing: "Poor emotional intelligence and difficulty in taking responsible actions. Lacks empathy and may struggle with relationships. Poor sense of duty and responsibility. May act impulsively without considering consequences. Needs to develop emotional maturity and sense of responsibility."
  },
  { 
    name: "Mental Plane", 
    numbers: [4, 9, 2],
    ifPresent: [
      "Strategic thinker with vision and emotional intelligence.",
      "Excellent planning and organizational abilities.",
      "Good balance between logic and intuition.",
      "Strong analytical skills combined with humanitarian approach.",
      "Ability to see the bigger picture while managing details.",
      "Good at building systems and processes.",
      "Natural problem-solver with methodical approach.",
      "Can excel in management, consulting, research fields."
    ],
    ifMissing: {
      4: "Lacks systematic approach, may be disorganized in thinking.",
      9: "Narrow perspective, lacks humanitarian vision.",
      2: "Poor emotional intelligence, difficulty in understanding others."
    },
    allMissing: "Weak mental processing and poor strategic thinking. Difficulty in planning and organizing thoughts effectively. May lack both logical reasoning and emotional understanding. Poor decision-making capabilities and tendency to be confused or overwhelmed. Needs to develop both analytical and intuitive thinking skills."
  },
  { 
    name: "Emotional Plane", 
    numbers: [3, 5, 7],
    ifPresent: [
      "Emotionally expressive, intuitive, and spiritually wise.",
      "Excellent communication and creative abilities.",
      "Strong intuition and psychic abilities.",
      "Good at understanding and expressing emotions.",
      "Natural talent for arts, creativity, and self-expression.",
      "Deep spiritual connection and wisdom.",
      "Ability to inspire and uplift others through words.",
      "Can excel in creative fields, spiritual guidance, entertainment."
    ],
    ifMissing: {
      3: "Difficulty in emotional expression and communication.",
      5: "Limited social skills, may be isolated or restless.",
      7: "Lacks spiritual depth, may be too materialistic."
    },
    allMissing: "Poor emotional expression and difficulty in connecting with inner feelings. Limited creativity and communication skills. Lacks spiritual awareness and may feel emotionally empty. Difficulty in inspiring or connecting with others on emotional level. Needs to develop emotional intelligence and creative expression."
  },
  { 
    name: "Practical Plane", 
    numbers: [8, 1, 6],
    ifPresent: [
      "Grounded, reliable, executes tasks with leadership.",
      "Strong material success and business acumen.",
      "Natural leadership combined with practical wisdom.",
      "Good at managing resources and achieving goals.",
      "Reliable and trustworthy in practical matters.",
      "Strong sense of responsibility and duty.",
      "Ability to turn ideas into reality.",
      "Can excel in business, management, real estate, politics."
    ],
    ifMissing: {
      8: "Poor material management, difficulty in achieving practical success.",
      1: "Lacks leadership in practical matters, dependent on others.",
      6: "Irresponsible in practical duties, poor family/home management."
    },
    allMissing: "Poor practical abilities and difficulty in managing material aspects of life. Lacks grounding and may be too idealistic without practical application. Poor execution of plans and difficulty in achieving tangible results. May struggle with financial management and practical responsibilities. Needs to develop practical skills and grounding."
  },
  { 
    name: "Silver Plane", 
    numbers: [2, 5, 8],
    ifPresent: [
      "Emotionally aware and instinctively good with finances.",
      "Excellent intuition for financial opportunities.",
      "Good balance between emotion and material success.",
      "Natural ability to attract wealth and resources.",
      "Strong networking and communication skills for business.",
      "Intuitive understanding of market trends.",
      "Good at partnerships and joint ventures.",
      "Can excel in finance, investments, business development."
    ],
    ifMissing: {
      2: "Poor financial partnerships, difficulty in money-related cooperation.",
      5: "Limited networking for financial growth, poor communication in business.",
      8: "Weak material success, poor money management skills."
    },
    allMissing: "Poor financial intuition and difficulty in managing money matters. Lacks the emotional intelligence needed for successful financial partnerships. May struggle with wealth creation and material prosperity. Poor networking abilities for financial growth. Needs to develop both emotional and practical skills for financial success."
  },
  { 
    name: "Golden Plane", 
    numbers: [4, 5, 6],
    ifPresent: [
      "Emotionally mature, disciplined, balanced and composed under pressure.",
      "Perfect balance between logic, communication, and responsibility.",
      "Strong foundation for both personal and professional success.",
      "Excellent at maintaining stability while adapting to change.",
      "Natural counselor and guide for others.",
      "Strong family values combined with social skills.",
      "Reliable in crisis situations with calm demeanor.",
      "Can excel in counseling, teaching, management, family business."
    ],
    ifMissing: {
      4: "Lacks structured approach to emotional and family matters.",
      5: "Poor communication in relationships, social isolation.",
      6: "Irresponsible in family duties, lacks nurturing qualities."
    },
    allMissing: "Lacks emotional maturity and balanced approach to life. Poor foundation for stable relationships and family life. Difficulty in maintaining balance between different aspects of life. May be either too rigid or too flexible without proper grounding. Needs to develop emotional stability and balanced perspective on life."
  }
];

export const PlaneAnalysis = ({ frequencies, onBack }: PlaneAnalysisProps) => {
  const getPlaneStatus = (plane: typeof PLANE_DEFINITIONS[0]) => {
    const presentNumbers = plane.numbers.filter(num => (frequencies[num] || 0) > 0);
    const missingNumbers = plane.numbers.filter(num => (frequencies[num] || 0) === 0);
    
    return {
      allPresent: presentNumbers.length === 3,
      allMissing: missingNumbers.length === 3,
      missingNumbers,
      presentNumbers
    };
  };

  const renderPlaneContent = (plane: typeof PLANE_DEFINITIONS[0]) => {
    const status = getPlaneStatus(plane);
    
    if (status.allPresent) {
      return (
        <div className="space-y-2">
          <div className="font-bold text-lg text-green-800 mb-3 flex items-center gap-2">
            <CheckCircle size={20} className="text-green-600" />
            {plane.name} - Complete
          </div>
          <div className="space-y-1">
            {plane.ifPresent.map((point, index) => (
              <div key={index} className="text-gray-700">• {point}</div>
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <div className="space-y-3">
          <div className="font-bold text-lg text-red-800 mb-3 flex items-center gap-2">
            <XCircle size={20} className="text-red-600" />
            {plane.name} - {status.allMissing ? 'Completely Missing' : 'Partially Missing'}
          </div>
          
          {/* Show missing number details */}
          {status.missingNumbers.length > 0 && (
            <div className="space-y-2">
              <div className="font-semibold text-red-700 flex items-center gap-2">
                <AlertCircle size={16} />
                Missing Numbers Impact:
              </div>
              {status.missingNumbers.map((num) => (
                <div key={num} className="text-gray-700 ml-6">
                  <span className="font-bold text-red-600">{num}</span> – {plane.ifMissing[num]}
                </div>
              ))}
            </div>
          )}
          
          {/* Show all missing description if all numbers are missing */}
          {status.allMissing && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="font-semibold text-red-700 mb-2">Overall Impact:</div>
              <div className="text-gray-700">{plane.allMissing}</div>
            </div>
          )}
          
          {/* Show present numbers if any */}
          {status.presentNumbers.length > 0 && !status.allPresent && (
            <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="font-semibold text-green-700 mb-2">
                Present Numbers: {status.presentNumbers.join(', ')}
              </div>
              <div className="text-gray-700 text-sm">
                These numbers provide partial support for this plane.
              </div>
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <Card className="shadow-xl border border-amber-200 bg-white rounded-xl font-calibri">
      <CardHeader className="pb-4">
        <CardTitle className="text-3xl font-bold text-amber-700 text-center">
          Detailed Plane Analysis
        </CardTitle>
        <p className="text-center text-gray-600 mt-2">
          Based on your Lo Shu Grid numbers
        </p>
      </CardHeader>
      
      <CardContent className="space-y-8">
        {PLANE_DEFINITIONS.map((plane, index) => (
          <div 
            key={`plane-${index}`} 
            className="border border-gray-200 rounded-lg p-6 shadow-sm bg-gray-50"
          >
            {renderPlaneContent(plane)}
          </div>
        ))}
        
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
  );
};
