
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { getNumberData } from '@/data/numbers';

interface NumberDetailProps {
  number: number;
  onBack: () => void;
  userName: string;
  dateOfBirth: string;
  showOnlyMahadasha?: boolean;
}

export const NumberDetail = ({ number, onBack, userName, dateOfBirth, showOnlyMahadasha = false }: NumberDetailProps) => {
  const formatDateDDMMYYYY = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const content = getNumberData(number);
  
  // Filter sections based on the showOnlyMahadasha prop
  const filteredSections = showOnlyMahadasha 
    ? content.sections.filter(section => 
        section.title.toLowerCase().includes('mahadasha') || 
        section.title.toLowerCase().includes('antardasha')
      )
    : content.sections.filter(section => 
        !section.title.toLowerCase().includes('mahadasha') && 
        !section.title.toLowerCase().includes('antardasha')
      );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 font-calibri">
      {/* Top Back Button */}
      <div className="mb-6">
        <Button 
          onClick={onBack}
          className="bg-amber-600 hover:bg-amber-700 text-white font-bold"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Analysis
        </Button>
      </div>

      {/* Header with User Info */}
      <Card className="shadow-xl border-2 border-gray-400 bg-white/90 backdrop-blur-md rounded-xl mb-8">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl md:text-4xl font-bold text-blue-800">
            {showOnlyMahadasha ? `Number ${number} - Mahadasha Analysis` : content.title}
          </CardTitle>
          <p className="text-xl text-gray-600 mt-2">
            {showOnlyMahadasha ? "Planetary Influence & Timing" : content.subtitle}
          </p>
          {userName && dateOfBirth && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-gray-700">
                <span className="font-semibold">Analysis for:</span> {userName}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Date of Birth:</span> {formatDateDDMMYYYY(dateOfBirth)}
              </p>
            </div>
          )}
        </CardHeader>
      </Card>

      {/* Content Sections */}
      <div className="space-y-6">
        {filteredSections.map((section, index) => (
          <Card key={index} className="shadow-lg border-2 border-gray-300 bg-white/95 backdrop-blur-sm rounded-xl">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl font-bold text-gray-800 border-b border-gray-200 pb-2">
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {section.content.map((line, lineIndex) => (
                <div key={lineIndex}>
                  {line === "" ? (
                    <div className="h-2"></div>
                  ) : (
                    <p className={`${line.startsWith('•') ? 'ml-4' : ''} ${line.match(/^[A-Z][a-z]+ –/) ? 'font-bold text-lg text-blue-700 mt-4' : ''} text-gray-700 leading-relaxed`}>
                      {line}
                    </p>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
        
        {filteredSections.length === 0 && (
          <Card className="shadow-lg border-2 border-gray-300 bg-white/95 backdrop-blur-sm rounded-xl">
            <CardContent className="text-center py-8">
              <p className="text-gray-600">
                {showOnlyMahadasha 
                  ? "Mahadasha information for this number is not available yet."
                  : "Content for this number is being prepared."
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Bottom Back Button */}
      <div className="mt-8 text-center">
        <Button 
          onClick={onBack}
          className="bg-amber-600 hover:bg-amber-700 text-white font-bold"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Analysis
        </Button>
      </div>
    </div>
  );
};
