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
  const [showMahadashaAnalysis, setShowMahadashaAnalysis] = useState(false);

  const renderAntarDashaCards = (content: string[]) => {
    const cards: JSX.Element[] = [];
    let currentCard: { heading: string; positive: string[]; negative: string[] } | null = null;
    
    for (let i = 0; i < content.length; i++) {
      const line = content[i].trim();
      
      // Check if this is a heading (contains " – " for Antardasha pairs)
      if (line.includes(' – ') && !line.startsWith('•') && !line.includes('Positive') && !line.includes('Negative')) {
        // Save previous card if exists
        if (currentCard) {
          cards.push(
            <Card key={cards.length} className="shadow-lg border border-gray-200 bg-white rounded-lg">
              <CardContent className="p-4">
                <h3 className="font-bold text-lg text-blue-800 mb-3">{currentCard.heading}</h3>
                
                {currentCard.positive.length > 0 && (
                  <div className="mb-3">
                    <h4 className="font-bold text-green-700 mb-1">Positive</h4>
                    <ul className="space-y-1">
                      {currentCard.positive.map((item, idx) => (
                        <li key={idx} className="text-sm text-gray-700 ml-2">• {item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {currentCard.negative.length > 0 && (
                  <div>
                    <h4 className="font-bold text-red-700 mb-1">Negative</h4>
                    <ul className="space-y-1">
                      {currentCard.negative.map((item, idx) => (
                        <li key={idx} className="text-sm text-gray-700 ml-2">• {item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        }
        
        // Start new card
        currentCard = { heading: line, positive: [], negative: [] };
      } else if (currentCard && line.includes('Positive')) {
        // Continue collecting content for current section
      } else if (currentCard && line.includes('Negative')) {
        // Continue collecting content for current section
      } else if (currentCard && line.startsWith('•')) {
        // Add bullet point to appropriate section
        const bulletText = line.substring(1).trim();
        // Look back to find if we're in Positive or Negative section
        let sectionType = 'positive';
        for (let j = i - 1; j >= 0; j--) {
          if (content[j].includes('Negative')) {
            sectionType = 'negative';
            break;
          } else if (content[j].includes('Positive')) {
            sectionType = 'positive';
            break;
          }
        }
        
        if (sectionType === 'negative') {
          currentCard.negative.push(bulletText);
        } else {
          currentCard.positive.push(bulletText);
        }
      }
    }
    
    // Add the last card
    if (currentCard) {
      cards.push(
        <Card key={cards.length} className="shadow-lg border border-gray-200 bg-white rounded-lg">
          <CardContent className="p-4">
            <h3 className="font-bold text-lg text-blue-800 mb-3">{currentCard.heading}</h3>
            
            {currentCard.positive.length > 0 && (
              <div className="mb-3">
                <h4 className="font-bold text-green-700 mb-1">Positive</h4>
                <ul className="space-y-1">
                  {currentCard.positive.map((item, idx) => (
                    <li key={idx} className="text-sm text-gray-700 ml-2">• {item}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {currentCard.negative.length > 0 && (
              <div>
                <h4 className="font-bold text-red-700 mb-1">Negative</h4>
                <ul className="space-y-1">
                  {currentCard.negative.map((item, idx) => (
                    <li key={idx} className="text-sm text-gray-700 ml-2">• {item}</li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      );
    }
    
    return cards;
  };

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

  // For bottom number clicks - show button only, no default table
  if (showOnlyMahadasha) {
    const antarDashaSection = filteredSections[0]; // This is the Antar Dasha table
    
    return (
      <div className="max-w-4xl mx-auto px-4 py-4 font-calibri">
        {/* Close Button - Top */}
        {/* <div className="mb-3 flex justify-center">
          <Button 
            onClick={onClose || onBack}
            className="bg-red-600 hover:bg-red-700 text-white font-bold"
          >
            <X className="mr-2 h-4 w-4" />
            Close
          </Button>
        </div> */}

        {/* Mahadasha – Antardasha Button (Always show when analysis is hidden) */}
        {!showMahadashaAnalysis && (
          <div className="flex justify-center mb-3">
            <Button 
              onClick={() => setShowMahadashaAnalysis(true)}
              variant="outline"
              className="bg-blue-50 border-blue-300 text-blue-700 hover:bg-blue-100 flex items-center gap-2 px-6 py-2"
            >
              <ChevronDown className="h-4 w-4" />
              Mahadasha – Antardasha
            </Button>
          </div>
        )}

        {/* Detailed Mahadasha Analysis (Initially Hidden) */}
        {showMahadashaAnalysis && antarDashaSection && (
          <Card className="shadow-xl border-2 border-gray-400 bg-white/90 backdrop-blur-md rounded-xl mb-3">
            <div className="flex justify-left pt-3 pb-2 px-4">
              <Button 
                onClick={() => setShowMahadashaAnalysis(false)}
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <CardTitle className="text-2xl md:text-xl font-bold text-blue-800 ml-4">
                Number {number} - Mahadasha Analysis
              </CardTitle>
            </div>
            <CardContent className="p-3">
              <div className="space-y-4">
                {renderAntarDashaCards(antarDashaSection.content)}
              </div>
            </CardContent>
            
            {/* Back Button inside Mahadasha section */}
            <div className="flex justify-center pb-4">
              <Button 
                onClick={() => setShowMahadashaAnalysis(false)}
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </div>
          </Card>
        )}

        {/* Close Button - Bottom */}
        {/* <div className="flex justify-center">
          <Button 
            onClick={onClose || onBack}
            className="bg-red-600 hover:bg-red-700 text-white font-bold"
          >
            <X className="mr-2 h-4 w-4" />
            Close
          </Button>
        </div> */}
      </div>
    );
  }

  // Regular number detail view (for grid clicks) - Compact layout
  const [showMahadashaTable, setShowMahadashaTable] = useState(false);
  const mahadashaSection = content.sections.find(section => 
    section.title.toLowerCase().includes('mahadasha') || 
    section.title.toLowerCase().includes('antardasha')
  );

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
          {/* {userName && dateOfBirth && (
            <div className="mt-2 p-2 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-gray-700 text-sm">
                <span className="font-semibold">Analysis for:</span> {userName}
              </p>
              <p className="text-gray-700 text-sm">
                <span className="font-semibold">Date of Birth:</span> {formatDateDDMMYYYY(dateOfBirth)}
              </p>
            </div>
          )} */}
        </CardHeader>
      </Card>

      {/* Content Sections - Compact */}
      <div className="space-y-4">
        {filteredSections.map((section, index) => (
  <Card key={index} className="shadow-lg border-2 border-gray-300 bg-white/95 backdrop-blur-sm rounded-xl">
    <CardHeader className="pb-2">
      <CardTitle className="text-lg font-bold text-blue-600 border-b border-gray-200">
        {section.title}
      </CardTitle>
    </CardHeader>
    <CardContent className="text-s space-y-1 pt-2">
      {section.content.map((line, lineIndex) => {
        // Primary headings (blue and distinct)
        const isPrimaryHeading =
                                line.includes('Spiritual Remedies') ||
                                line.includes('Astrological Remedies') ||
                                line.includes('Fasting & Rituals') ||
                                line.includes('Gemstone Remedies') ||
                                line.includes('Herbal & Ayurvedic Remedies') ||
                                line.includes('Yogic & Lifestyle Remedies') ||
                                line.includes('Behavioral / Karmic Corrections') ||
                                line.includes('Other Powerful Mantras') ||
                                line.includes('Powerful Shani Mantra Ritual');

        // Subheadings (orange and secondary style)
        const isSubheading = line.includes("Do's") ||
                            line.includes('Daily Chanting') ||
                            line.includes("Don'ts") ||
                            line.includes('Positive') || 
                            line.includes('Negative') ||
                            line.includes('Spiritual & Devotional') ||
                            line.includes('Gemstone Remedy') ||
                            line.includes('Yogic & Lifestyle') ||
                            line.includes('Destiny Ratio') ||
                            line.includes('Days)') ||
                            line.includes('Shani Remedy') ||
                            line.includes('Simple')||
                            line.includes('Other Powerful Remedies') ||
                            line.match(/^[A-Z][a-z]+ –/);

        // Sub-sub-headings (darker orange or italic bold)
        const isSubSubheading = line.includes('Avoid') ||
                               line.includes('Practice') ||
                               line.includes('Powerful Shani Mantra Ritual') && !isPrimaryHeading;

        // Mantras (deep purple/saffron highlighting)
        const isMantra = line.startsWith('ॐ') && (line.includes(':') || line.includes('–'));

        const isBulletPoint = line.startsWith('•');

        return (
          <div key={lineIndex}>
            {line === "" ? (
              <div className="h-2"></div>
            ) : (
              <p className={`leading-relaxed ${
                isPrimaryHeading
                  ? 'font-bold text-blue-700 mt-4 mb-2 text-lg border-b border-blue-200 pb-1'
                  : isMantra
                  ? 'font-bold text-purple-700 mt-2 mb-1 text-base bg-purple-50 px-2 py-1 rounded'
                  : isBulletPoint 
                  ? 'ml-4 text-base font-bold text-gray-800 mt-1'
                  : isSubheading 
                  ? 'font-bold text-orange-600 mt-3 mb-1 text-base'
                  : isSubSubheading
                  ? 'font-bold text-orange-800 mt-2 mb-1 text-sm italic'
                  : 'text-base font-bold text-gray-800'
              }`}>
                {line}
              </p>
            )}
          </div>
        );
      })}
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

      {/* Mahadasha – Antardasha Button */}
      {/* <div className="flex justify-center mb-4">
        <Button 
          onClick={() => setShowMahadashaTable(!showMahadashaTable)}
          variant="outline"
          className="bg-blue-50 border-blue-300 text-blue-700 hover:bg-blue-100 flex items-center gap-2 px-6 py-2"
        >
          {showMahadashaTable ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          Mahadasha – Antardasha
        </Button>
      </div> */}

      {/* Mahadasha Table (Initially Hidden) */}
      {/* {showMahadashaTable && mahadashaSection && (
        <Card className="shadow-xl border-2 border-gray-400 bg-white/90 backdrop-blur-md rounded-xl mb-4">
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
              <div className="space-y-4">
                {renderAntarDashaCards(mahadashaSection.content)}
              </div>
          </CardContent>
        </Card>
      )} */}

      {/* Bottom Back Button */}
      {/* <div className="mt-6 text-center">
        <Button 
          onClick={onBack}
          className="bg-amber-600 hover:bg-amber-700 text-white font-bold"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Analysis
        </Button>
      </div> */}
    </div>
  );
};