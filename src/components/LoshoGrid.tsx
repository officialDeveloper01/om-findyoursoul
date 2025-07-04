import { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AntarDashaTable } from './AntarDashaTable';
import { PlaneAnalysis } from './PlaneAnalysis';
import { NumberDetail } from './NumberDetail';
import { CompactNumerologyRow } from './CompactNumerologyRow';
import { calculateAntarDasha, calculatePreBirthAntarDasha, planetMap } from '@/utils/antarDashaCalculator';

export const LoshoGrid = ({ gridData, userData }) => {
  const [selectedAntarDasha, setSelectedAntarDasha] = useState(null);
  const [showPlaneAnalysis, setShowPlaneAnalysis] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [showMahadashaOnly, setShowMahadashaOnly] = useState(false);

  const hiddenMap = {
    11: 2,
    22: 3,
    33: 4,
    44: 5,
    55: 6,
    66: 7,
    77: 6,
    88: 7,
    99: 8,
  };

  const frequencies: Record<number, number> = { ...gridData.frequencies };

  const getHiddenNumbers = useCallback(() => {
    const fullFreq = { ...frequencies };
    const hiddenCountMap: Record<number, number> = {};
    const visited = new Set<string>();
    let hasNew = true;

    while (hasNew) {
      hasNew = false;
      for (let i = 1; i <= 9; i++) {
        const count = fullFreq[i] || 0;
        const repeatCount = Math.floor(count / 2);
        const repeated = Number(String(i).repeat(2));

        if (repeatCount >= 1 && hiddenMap[repeated]) {
          const hidden = hiddenMap[repeated];
          const key = `${i}->${hidden}`;
          if (!visited.has(key)) {
            visited.add(key);
            hiddenCountMap[hidden] = (hiddenCountMap[hidden] || 0) + repeatCount;
            fullFreq[hidden] = (fullFreq[hidden] || 0) + repeatCount;
            hasNew = true;
          }
        }
      }
    }

    return hiddenCountMap;
  }, [frequencies]);

  const hiddenNumbers = getHiddenNumbers();

  const singleDigitSum = (num: number): number => {
    while (num >= 10) {
      num = num
        .toString()
        .split('')
        .reduce((sum, digit) => sum + parseInt(digit), 0);
    }
    return num;
  };

  const gridNumbers = [
    [4, 9, 2],
    [3, 5, 7],
    [8, 1, 6],
  ];

  const calculateDashes = useCallback(() => {
    const dashes: Record<number, number> = {};
    const gridCells = gridNumbers.flat();
    
    for (let i = 0; i < gridCells.length; i++) {
      const digit = gridCells[i];
      const actualCount = frequencies[digit] || 0;
      const hiddenCount = hiddenNumbers[digit] || 0;

      if (actualCount > 1) {
        const total = digit * actualCount;
        const reduced = singleDigitSum(total);
        if (!frequencies[reduced]) {
          dashes[reduced] = (dashes[reduced] || 0) + 1;
        }
      }

      if (
        (actualCount > 0 || hiddenCount > 1) &&
        !(actualCount === 0 && hiddenCount === 1)
      ) {
        const total = digit * (actualCount + hiddenCount);
        const reduced = singleDigitSum(total);
        if (!frequencies[reduced] && !dashes[reduced]) {
          dashes[reduced] = 1;
        }
      }
    }

    return dashes;
  }, [frequencies, hiddenNumbers]);

  const dashes = calculateDashes();

  const numerologyData = userData.numerologyData || {};
  const conductorSeries = numerologyData.conductorSeries || [];
  const bottomValues = numerologyData.bottomValues || [];

  const handleConductorClick = useCallback((conductorNumber: number, ageIndex: number) => {
    if (!conductorSeries[ageIndex] || !userData.dateOfBirth) return;
    
    const startAge = conductorSeries[ageIndex];
    const planetName = planetMap[conductorNumber]?.name || 'Unknown';
    
    console.log('Clicked conductor:', { conductorNumber, startAge, planetName, ageIndex });
    
    try {
      let antarDashaData;
      let tableTitle;

      if (ageIndex === 0) {
        antarDashaData = calculatePreBirthAntarDasha(
          userData.dateOfBirth,
          conductorNumber,
          startAge
        );
        tableTitle = `0 – ${startAge}`;
      } else {
        antarDashaData = calculateAntarDasha(
          userData.dateOfBirth,
          startAge,
          conductorNumber
        );
        tableTitle = planetName;
      }
      
      setSelectedAntarDasha({
        data: antarDashaData,
        planet: ageIndex === 0 ? tableTitle : planetName,
        startAge: ageIndex === 0 ? 0 : startAge,
        isPreBirth: ageIndex === 0,
        dateOfBirth: userData.dateOfBirth,
        conductorIndex: ageIndex
      });
      
      // Show the Mahadasha section for this number
      setSelectedNumber(conductorNumber);
      setShowMahadashaOnly(true);
    } catch (error) {
      console.error('Error calculating Antar Dasha:', error);
    }
  }, [conductorSeries, userData.dateOfBirth]);

  const handleGridNumberClick = (digit: number) => {
    setSelectedNumber(digit);
    setShowMahadashaOnly(false);
    setSelectedAntarDasha(null); // Clear any existing Antar Dasha table
  };

  const handleBackFromNumber = () => {
    setSelectedNumber(null);
    setShowMahadashaOnly(false);
    setSelectedAntarDasha(null);
  };

  const handleCloseNumberDetail = () => {
    setSelectedNumber(null);
    setShowMahadashaOnly(false);
    // Keep Antar Dasha table if it exists
  };

  const renderGridCell = (digit: number) => {
    const count = frequencies[digit] || 0;
    const hiddenCount = hiddenNumbers[digit] || 0;
    const dashCount = dashes[digit] || 0;

    return (
      <button 
        onClick={() => handleGridNumberClick(digit)}
        className="relative w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-white border-2 border-gray-400 rounded-lg flex items-center justify-center text-center p-3 hover:bg-gray-50 hover:border-blue-400 transition-colors cursor-pointer shadow-md"
        title={`Click to view detailed analysis for Number ${digit}`}
      >
        {count > 0 && (
          <div className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 flex flex-wrap justify-center items-center">
            {String(digit).repeat(count)}
          </div>
        )}
        {hiddenCount > 0 && (
          <div className="absolute top-1 right-1 w-5 h-5 md:w-6 md:h-6 px-1 py-0.5 rounded-full border-2 border-green-600 text-green-600 text-xs md:text-sm flex items-center justify-center font-bold">
            {String(digit).repeat(hiddenCount)}
          </div>
        )}
        {dashCount > 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-red-600 font-extrabold text-2xl md:text-3xl pointer-events-none">
            {"_".repeat(dashCount)}
          </div>
        )}
      </button>
    );
  };

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birth = new Date(dateOfBirth);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const formatTime = (timeString: string) => {
    if (!timeString) return '';
    try {
      const [hours, minutes] = timeString.split(':');
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const hour12 = hour % 12 || 12;
      return `${hour12}:${minutes} ${ampm}`;
    } catch {
      return timeString;
    }
  };

  const formatDateDDMMYYYY = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  if (selectedNumber && !selectedAntarDasha && !showMahadashaOnly) {
    return (
      <NumberDetail 
        number={selectedNumber}
        onBack={handleBackFromNumber}
        userName={userData.fullName}
        dateOfBirth={userData.dateOfBirth}
        showOnlyMahadasha={false}
      />
    );
  }

  if (showPlaneAnalysis) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 font-calibri">
        <PlaneAnalysis 
          frequencies={frequencies}
          onBack={() => setShowPlaneAnalysis(false)}
          userName={userData.fullName}
          dateOfBirth={userData.dateOfBirth}
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 font-calibri">
      {/* User Info Table with stronger borders */}
      <Card className="shadow-xl border-2 border-gray-400 bg-white/90 backdrop-blur-md rounded-xl mb-8">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 gap-y-3 gap-x-8">
            {/* Row 1 */}
            <div className="flex justify-between items-center border-b border-gray-300 pb-2">
              <span className="text-gray-600 font-bold">Name:</span>
              <span className="font-bold text-gray-800">{userData.fullName}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-300 pb-2 border-l border-gray-300 pl-4">
              <span className="text-gray-600 font-bold">Age:</span>
              <span className="font-bold text-gray-800">{calculateAge(userData.dateOfBirth)} years</span>
            </div>

            {/* Row 2 */}
            <div className="flex justify-between items-center border-b border-gray-300 pb-2">
              <span className="text-gray-600 font-bold">Name Number:</span>
              <span className="font-bold text-gray-800">{numerologyData.chaldeanNumbers?.nameNumber || 0}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-300 pb-2 border-l border-gray-300 pl-4">
              <span className="text-gray-600 font-bold">MULAANK:</span>
              <span className="font-bold text-amber-700">{numerologyData.driver || 0}</span>
            </div>

            {/* Row 3 */}
            <div className="flex justify-between items-center border-b border-gray-300 pb-2">
              <span className="text-gray-600 font-bold">DOB:</span>
              <span className="font-bold text-gray-800">{formatDateDDMMYYYY(userData.dateOfBirth)}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-300 pb-2 border-l border-gray-300 pl-4">
              <span className="text-gray-600 font-bold">BHAGYAANK:</span>
              <span className="font-bold text-blue-700">{numerologyData.conductor || 0}</span>
            </div>

            {/* Row 4 */}
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-bold">Time:</span>
              <span className="font-bold text-gray-800 whitespace-nowrap">{formatTime(userData.timeOfBirth)}</span>
            </div>
            <div className="flex justify-between items-center border-l border-gray-300 pl-4">
              <span className="text-gray-600 font-bold">PERSONALITY NO:</span>
              <span className="font-bold text-green-700">{numerologyData.chaldeanNumbers?.soulUrgeNumber || 0}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Grid Card with celestial background */}
      <Card className="shadow-xl border-2 border-gray-400 bg-white/10 backdrop-blur-md rounded-xl celestial-bg relative overflow-hidden">
        {/* Semi-transparent overlay for readability */}
        <div className="absolute inset-0 bg-white/85 backdrop-blur-sm"></div>
        
        <div className="relative z-10">
          <CardHeader className="text-center pb-4">
            {/* <CardTitle className="text-3xl md:text-4xl font-bold text-blue-800">
              Analysis
            </CardTitle> */}
            {/* Plane Analysis Button */}
            <div className="text-center">
              <Button 
                onClick={() => setShowPlaneAnalysis(true)}
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 py-2"
              >
                Plane Analysis
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* Lo Shu Grid - Improved spacing and responsiveness */}
            <div className="flex justify-center items-center">
              <div className="grid grid-cols-3 gap-4 md:gap-6 lg:gap-8 p-6 md:p-8 lg:p-10 border-2 border-gray-400 rounded-lg bg-white/90 shadow-lg">
                {gridNumbers.flat().map((digit, index) => (
                  <div key={`grid-cell-${digit}-${index}`} className="flex justify-center items-center">
                    {renderGridCell(digit)}
                  </div>
                ))}
              </div>
            </div>

            {/* Grid Instructions */}
            {/* <div className="text-center">
              <p className="text-gray-600 text-sm md:text-base">
                Click on any number in the grid above to view detailed analysis
              </p>
            </div> */}

            

            {/* Conductor Series - Clickable for Antar Dasha */}
            {conductorSeries.length > 0 && bottomValues.length > 0 && (
              <div className="space-y-3">
                {/* <div className="text-center">
                  <h3 className="font-bold text-gray-700">Conductor Series (Maha Dasha)</h3>
                  <p className="font-bold text-gray-500">Click on any number below to view Antar Dasha table & Mahadasha details</p>
                </div> */}
                
                {/* Ages Row - Clean bordered table design with stronger borders */}
                <div className="border-2 border-gray-400 rounded-lg overflow-hidden bg-white/90 backdrop-blur-sm">
                  <div className="grid grid-cols-11 bg-gray-100 border-b-2 border-gray-400">
                    {conductorSeries.map((age, index) => (
                      <div key={`age-${age}-${index}`} className="text-center font-bold text-gray-700 py-2 px-2 border-r border-gray-400 last:border-r-0">
                        {age}
                      </div>
                    ))}
                  </div>
                  
                  {/* Conductor Numbers Row - Clickable with stronger borders */}
                  <div className="grid grid-cols-11">
                    {bottomValues.map((number, index) => (
                      <button
                        key={`conductor-${number}-${index}`}
                        onClick={() => handleConductorClick(number, index)}
                        className="bg-amber-50 hover:bg-amber-100 py-2 px-2 text-center font-bold text-amber-800 transition-colors cursor-pointer border-r border-gray-400 last:border-r-0"
                        title={`Click to view ${planetMap[number]?.name || 'Unknown'} Maha Dasha`}
                      >
                        {number}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </div>
      </Card>

      {/* Show Number Detail and Antar Dasha Table when conductor is clicked */}
      {selectedNumber && selectedAntarDasha && showMahadashaOnly && (
        <div className="space-y-6 mt-8">
          <AntarDashaTable
            data={selectedAntarDasha.data}
            planet={selectedAntarDasha.planet}
            startAge={selectedAntarDasha.startAge}
            onClose={() => setSelectedAntarDasha(null)}
            isPreBirth={selectedAntarDasha.isPreBirth}
            dateOfBirth={selectedAntarDasha.dateOfBirth}
            conductorIndex={selectedAntarDasha.conductorIndex}
          />

          <NumberDetail 
            number={selectedNumber}
            onBack={handleBackFromNumber}
            onClose={handleCloseNumberDetail}
            userName={userData.fullName}
            dateOfBirth={userData.dateOfBirth}
            showOnlyMahadasha={true}
          />
        </div>
      )}

      {/* Antar Dasha Table only (when no number detail is shown) */}
      {selectedAntarDasha && !selectedNumber && (
        <AntarDashaTable
          data={selectedAntarDasha.data}
          planet={selectedAntarDasha.planet}
          startAge={selectedAntarDasha.startAge}
          onClose={() => setSelectedAntarDasha(null)}
          isPreBirth={selectedAntarDasha.isPreBirth}
          dateOfBirth={selectedAntarDasha.dateOfBirth}
          conductorIndex={selectedAntarDasha.conductorIndex}
        />
      )}
    </div>
  );
};
