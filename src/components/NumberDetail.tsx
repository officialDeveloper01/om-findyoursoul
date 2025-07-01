
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, X } from 'lucide-react';
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

  // For Mahadasha table display
  if (showOnlyMahadasha && filteredSections.length > 0) {
    const mahadashaSection = filteredSections[0];
    
    return (
      <div className="max-w-4xl mx-auto px-4 py-6 font-calibri">
        {/* Close Button - Top */}
        <div className="mb-4 flex justify-center">
          <Button 
            onClick={onClose || onBack}
            className="bg-red-600 hover:bg-red-700 text-white font-bold"
          >
            <X className="mr-2 h-4 w-4" />
            Close
          </Button>
        </div>

        {/* Mahadasha Table */}
        <Card className="shadow-xl border-2 border-gray-400 bg-white/90 backdrop-blur-md rounded-xl mb-6">
          <CardHeader className="text-center pb-3">
            <CardTitle className="text-2xl md:text-3xl font-bold text-blue-800">
              Number {number} - Mahadasha Analysis
            </CardTitle>
            <p className="text-lg text-gray-600">Planetary Influence & Timing</p>
            {userName && dateOfBirth && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-gray-700 text-sm">
                  <span className="font-semibold">Analysis for:</span> {userName}
                </p>
                <p className="text-gray-700 text-sm">
                  <span className="font-semibold">Date of Birth:</span> {formatDateDDMMYYYY(dateOfBirth)}
                </p>
              </div>
            )}
          </CardHeader>
          <CardContent className="p-4">
            <BorderedTable className="compressed-table">
              <BorderedTableHeader>
                <BorderedTableRow>
                  <BorderedTableHead className="text-center font-bold text-gray-800 bg-gray-100">
                    {mahadashaSection.title}
                  </BorderedTableHead>
                </BorderedTableRow>
              </BorderedTableHeader>
              <BorderedTableBody>
                {mahadashaSection.content.map((line, lineIndex) => (
                  <BorderedTableRow key={lineIndex}>
                    <BorderedTableCell className="text-gray-700 leading-tight py-2 px-3">
                      {line === "" ? <div className="h-1"></div> : line}
                    </BorderedTableCell>
                  </BorderedTableRow>
                ))}
              </BorderedTableBody>
            </BorderedTable>
          </CardContent>
        </Card>

        {/* Close Button - Bottom */}
        <div className="flex justify-center">
          <Button 
            onClick={onClose || onBack}
            className="bg-red-600 hover:bg-red-700 text-white font-bold"
          >
            <X className="mr-2 h-4 w-4" />
            Close
          </Button>
        </div>

        {/* Number Details Below Table */}
        <div className="space-y-4 mt-6">
          {content.sections.filter(section => 
            !section.title.toLowerCase().includes('mahadasha') && 
            !section.title.toLowerCase().includes('antardasha')
          ).map((section, index) => (
            <Card key={index} className="shadow-lg border-2 border-gray-300 bg-white/95 backdrop-blur-sm rounded-xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg md:text-xl font-bold text-gray-800 border-b border-gray-200 pb-1">
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 pt-2">
                {section.content.map((line, lineIndex) => (
                  <div key={lineIndex}>
                    {line === "" ? (
                      <div className="h-1"></div>
                    ) : (
                      <p className={`${line.startsWith('•') ? 'ml-4' : ''} ${line.match(/^[A-Z][a-z]+ –/) ? 'font-bold text-base text-blue-700 mt-3' : ''} text-gray-700 leading-tight text-sm`}>
                        {line}
                      </p>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Regular number detail view (for grid clicks)
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
            {content.title}
          </CardTitle>
          <p className="text-xl text-gray-600 mt-2">
            {content.subtitle}
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
                Content for this number is being prepared.
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
