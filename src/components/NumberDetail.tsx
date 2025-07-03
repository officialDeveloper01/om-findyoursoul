
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, X, ChevronDown, ChevronUp } from 'lucide-react';
import { getNumberData } from '@/data/numbers';
import { 
  BorderedTable, 
  BorderedTableHeader, 
  BorderedTableBody, 
  BorderedTableRow, 
  BorderedTableHead, 
  BorderedTableCell 
} from '@/components/ui/bordered-table';

interface NumberDetailProps {
  number: number;
  onBack: () => void;
  userName: string;
  dateOfBirth: string;
  showOnlyMahadasha?: boolean;
  onClose?: () => void;
}

export const NumberDetail = ({ 
  number, 
  onBack, 
  userName, 
  dateOfBirth, 
  showOnlyMahadasha = false,
  onClose
}: NumberDetailProps) => {
  const [showDetailedContent, setShowDetailedContent] = useState(false);
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

  // For Mahadasha table display - ONLY show the table with toggle for detailed content
  if (showOnlyMahadasha && filteredSections.length > 0) {
    const mahadashaSection = filteredSections[0];
    const detailedSections = content.sections.filter(section => 
      !section.title.toLowerCase().includes('mahadasha') && 
      !section.title.toLowerCase().includes('antardasha')
    );
    
    return (
      <div className="max-w-4xl mx-auto px-4 py-4 font-calibri">
        {/* Close Button - Top */}
        <div className="mb-3 flex justify-center">
          <Button 
            onClick={onClose || onBack}
            className="bg-red-600 hover:bg-red-700 text-white font-bold"
          >
            <X className="mr-2 h-4 w-4" />
            Close
          </Button>
        </div>

        {/* Mahadasha Table */}
        <Card className="shadow-xl border-2 border-gray-400 bg-white/90 backdrop-blur-md rounded-xl mb-3">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl md:text-3xl font-bold text-blue-800">
              Number {number} - Mahadasha Analysis
            </CardTitle>
            <p className="text-lg text-gray-600">Planetary Influence & Timing</p>
            {userName && dateOfBirth && (
              <div className="mt-2 p-2 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-gray-700 text-sm">
                  <span className="font-semibold">Analysis for:</span> {userName}
                </p>
                <p className="text-gray-700 text-sm">
                  <span className="font-semibold">Date of Birth:</span> {formatDateDDMMYYYY(dateOfBirth)}
                </p>
              </div>
            )}
          </CardHeader>
          <CardContent className="p-3">
            <BorderedTable className="compressed-table">
              <BorderedTableHeader>
                <BorderedTableRow>
                  <BorderedTableHead className="text-center font-bold text-gray-800 bg-gray-100 py-2">
                    {mahadashaSection.title}
                  </BorderedTableHead>
                </BorderedTableRow>
              </BorderedTableHeader>
              <BorderedTableBody>
                {mahadashaSection.content.map((line, lineIndex) => (
                  <BorderedTableRow key={lineIndex}>
                    <BorderedTableCell className={`text-gray-700 py-1.5 px-3 text-sm leading-tight ${
                      line.startsWith('•') ? 'pl-6' : ''
                    } ${line.includes('Positive') || line.includes('Negative') ? 'font-semibold text-blue-700' : ''}`}>
                      {line === "" ? <div className="h-1"></div> : line}
                    </BorderedTableCell>
                  </BorderedTableRow>
                ))}
              </BorderedTableBody>
            </BorderedTable>
          </CardContent>
        </Card>

        {/* Toggle Button for Detailed Content */}
        <div className="flex justify-center mb-3">
          <Button 
            onClick={() => setShowDetailedContent(!showDetailedContent)}
            variant="outline"
            className="bg-blue-50 border-blue-300 text-blue-700 hover:bg-blue-100 flex items-center gap-2"
          >
            {showDetailedContent ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            Mahadasha–Antardasha Details
          </Button>
        </div>

        {/* Detailed Content (Initially Hidden) */}
        {showDetailedContent && detailedSections.length > 0 && (
          <div className="space-y-4">
            {detailedSections.map((section, index) => (
              <Card key={index} className="shadow-lg border-2 border-gray-300 bg-white/95 backdrop-blur-sm rounded-xl">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-1">
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-1 pt-2">
                  {section.content.map((line, lineIndex) => (
                    <div key={lineIndex}>
                      {line === "" ? (
                        <div className="h-1"></div>
                      ) : (
                        <p className={`${
                          line.startsWith('•') ? 'ml-4 text-sm' : ''
                        } ${
                          line.match(/^[A-Z][a-z]+ –/) ? 'font-bold text-base text-blue-700 mt-2' : 'text-sm'
                        } text-gray-700 leading-snug`}>
                          {line}
                        </p>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Close Button - Bottom */}
        <div className="flex justify-center mt-4">
          <Button 
            onClick={onClose || onBack}
            className="bg-red-600 hover:bg-red-700 text-white font-bold"
          >
            <X className="mr-2 h-4 w-4" />
            Close
          </Button>
        </div>
      </div>
    );
  }

  // Regular number detail view (for grid clicks) - Compact layout
  return (
    <div className="max-w-4xl mx-auto px-4 py-4 font-calibri">
      {/* Top Back Button */}
      <div className="mb-4">
        <Button 
          onClick={onBack}
          className="bg-amber-600 hover:bg-amber-700 text-white font-bold"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Analysis
        </Button>
      </div>

      {/* Header with User Info - Compact */}
      <Card className="shadow-xl border-2 border-gray-400 bg-white/90 backdrop-blur-md rounded-xl mb-4">
        <CardHeader className="text-center pb-3">
          <CardTitle className="text-2xl font-bold text-blue-800">
            {content.title}
          </CardTitle>
          <p className="text-lg text-gray-600">
            {content.subtitle}
          </p>
          {userName && dateOfBirth && (
            <div className="mt-2 p-2 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-gray-700 text-sm">
                <span className="font-semibold">Analysis for:</span> {userName}
              </p>
              <p className="text-gray-700 text-sm">
                <span className="font-semibold">Date of Birth:</span> {formatDateDDMMYYYY(dateOfBirth)}
              </p>
            </div>
          )}
        </CardHeader>
      </Card>

      {/* Content Sections - Compact */}
      <div className="space-y-4">
        {filteredSections.map((section, index) => (
          <Card key={index} className="shadow-lg border-2 border-gray-300 bg-white/95 backdrop-blur-sm rounded-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-1">
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 pt-2">
              {section.content.map((line, lineIndex) => (
                <div key={lineIndex}>
                  {line === "" ? (
                    <div className="h-1"></div>
                  ) : (
                    <p className={`${
                      line.startsWith('•') ? 'ml-4 text-sm' : ''
                    } ${
                      line.match(/^[A-Z][a-z]+ –/) ? 'font-bold text-base text-blue-700 mt-2' : 'text-sm'
                    } text-gray-700 leading-snug`}>
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
            <CardContent className="text-center py-4">
              <p className="text-gray-600 text-sm">
                Content for this number is being prepared.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Bottom Back Button */}
      <div className="mt-6 text-center">
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
