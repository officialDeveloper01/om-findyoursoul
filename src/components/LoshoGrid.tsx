import { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AntarDashaTable } from './AntarDashaTable';
import { PlaneAnalysis } from './PlaneAnalysis';
import { StruggleAnalysis } from './StruggleAnalysis';
import { NumberDetail } from './NumberDetail';
import { CompactNumerologyRow } from './CompactNumerologyRow';
import { calculateAntarDasha, calculatePreBirthAntarDasha, planetMap } from '@/utils/antarDashaCalculator';
import { getDriverConductorAnalysis } from '@/data/driverConductorAnalysis';

export const LoshoGrid = ({ gridData, userData }) => {
  const [selectedAntarDasha, setSelectedAntarDasha] = useState(null);
  const [showPlaneAnalysis, setShowPlaneAnalysis] = useState(false);
  const [showStruggleAnalysis, setShowStruggleAnalysis] = useState(false);
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
  const reductionCounts: Record<number, number> = {};
  const gridCells = gridNumbers.flat();

  // Keep track of how many times each digit has triggered a reduction
  const reductionTracker: Record<number, Set<number>> = {};

  for (let i = 0; i < gridCells.length; i++) {
    const digit = gridCells[i];
    const actualCount = frequencies[digit] || 0;
    const hiddenCount = hiddenNumbers[digit] || 0;

    // Rule 1 – actual count > 1
    if (actualCount > 1) {
      const total = digit * actualCount;
      const reduced = singleDigitSum(total);

      if (!frequencies[reduced]) {
        if (!reductionTracker[reduced]) {
          reductionTracker[reduced] = new Set();
        }

        if (!reductionTracker[reduced].has(digit)) {
          reductionCounts[reduced] = (reductionCounts[reduced] || 0) + 1;
          reductionTracker[reduced].add(digit);
        }
      }
    }

    // Rule 2 – combined actual + hidden
    if (
      (actualCount > 0 || hiddenCount > 1) &&
      !(actualCount === 0 && hiddenCount === 1)
    ) {
      const total = digit * (actualCount + hiddenCount);
      const reduced = singleDigitSum(total);

      if (!frequencies[reduced]) {
        if (!reductionTracker[reduced]) {
          reductionTracker[reduced] = new Set();
        }

        if (!reductionTracker[reduced].has(digit)) {
          reductionCounts[reduced] = (reductionCounts[reduced] || 0) + 1;
          reductionTracker[reduced].add(digit);
        }
      }
    }
  }

  // Limit to max 3 dashes
  Object.entries(reductionCounts).forEach(([num, count]) => {
    dashes[+num] = Math.min(count, 3);
  });

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
        className="relative w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-white border-2 border-gray-400 rounded-lg flex items-center justify-center text-center p-2 md:p-3 hover:bg-gray-50 hover:border-blue-400 transition-colors cursor-pointer shadow-md"
        title={`Click to view detailed analysis for Number ${digit}`}
      >
        {count > 0 && (
          <div className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 flex flex-wrap justify-center items-center">
            {String(digit).repeat(count)}
          </div>
        )}
        {hiddenCount > 0 && (
          <div className="absolute top-0.5 right-0.5 w-4 h-4 md:w-5 md:h-5 px-0.5 py-0.5 rounded-full border-2 border-green-600 text-green-600 text-s flex items-center justify-center font-bold">
            {String(digit).repeat(hiddenCount)}
          </div>
        )}
        {dashCount > 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-red-600 font-extrabold text-xl md:text-2xl pointer-events-none gap-1.5">
            {Array.from({ length: dashCount }, (_, i) => (
              <span key={i}>–</span>
            ))}
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

  // Remove this - we want to show NumberDetail below the grid instead of replacing it

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
    <div className="max-w-4xl mx-auto px-2 md:px-4 py-4 font-calibri">
      {/* User Info Table - Compact */}
      <Card className="shadow-xl border-2 border-gray-400 bg-white/90 backdrop-blur-md rounded-xl mb-4 max-w-2xl mx-auto">
        <CardContent className="p-3">
          {/* Name spans full width */}
          <div className="mb-3 pb-2 border-b-2 border-gray-300">
            <div className="text-center">
              <span className="font-semibold text-gray-800 text-lg">{userData.fullName}</span>
            </div>
            
            
          </div>
          
          {/* Remaining fields in 3 rows, 2 columns each */}
          <div className="space-y-2">
            {/* Row 1: Age | Name Number */}
            <div className="grid grid-cols-2 gap-x-6">
              <div className="flex justify-between items-center border-b border-gray-300 pb-1">
                <span className="text-gray-600 font-medium text-sm">Age:</span>
                <span className="font-semibold text-gray-800 text-sm">{calculateAge(userData.dateOfBirth)} years</span>
              </div>
              
              <div className="flex justify-between items-center border-b border-gray-300 pb-1 border-l border-gray-300 pl-3">
                <span className="text-gray-600 font-medium text-sm">Name Number:</span>
                <span className="font-semibold text-gray-800 text-sm">{numerologyData.chaldeanNumbers?.nameNumber || 0}</span>
              </div>
            </div>

            {/* Row 2: DOB | Mulaank */}
            <div className="grid grid-cols-2 gap-x-6">
              <div className="flex justify-between items-center border-b border-gray-300 pb-1">
                <span className="text-gray-600 font-medium text-sm">DOB:</span>
                <span className="font-semibold text-gray-800 text-sm">{formatDateDDMMYYYY(userData.dateOfBirth)}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-300 pb-1 border-l border-gray-300 pl-3">
                <span className="text-gray-600 font-medium text-sm">MULAANK:</span>
                <span className="font-semibold text-amber-700 text-sm">{numerologyData.driver || 0}</span>
              </div>
            </div>

            {/* Row 3: Bhagyaank | Time */}
            <div className="grid grid-cols-2 gap-x-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium text-sm">Time:</span>
                <span className="font-semibold text-gray-800 whitespace-nowrap text-sm">{formatTime(userData.timeOfBirth)}</span>
              </div>
              <div className="flex justify-between items-center border-l border-gray-300 pl-3">
                <span className="text-gray-600 font-medium text-sm">BHAGYAANK:</span>
                <span className="font-semibold text-blue-700 text-sm">{numerologyData.conductor || 0}</span>
              </div>           
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-6">
          {/* Driver-Conductor Analysis Summary */}
{(() => {
  const driver = numerologyData.driver || 0;
  const conductor = numerologyData.conductor || 0;
  const analysis = getDriverConductorAnalysis(driver, conductor);

  if (analysis) {
    return (
      <div className="col-span-2 mt-3 border-t pt-2 border-gray-300">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-gray-600 font-medium text-sm">Result:</span>
          <span className={`text-sm font-bold ${analysis.result.includes('Good') ? 'text-green-600' : analysis.result.includes('Challenging') ? 'text-red-600' : 'text-yellow-600'}`}>
            {analysis.result} - <span className="text-gray-800 font-semibold font-medium text-sm">{analysis.outcome}</span>
          </span>
        </div><div className="flex items-center gap-2">
          <span className="text-gray-600 font-medium text-sm">Destiny Ratio:</span>
          <span className="text-gray-800 font-semibold text-sm">{analysis.destinyRatio}</span>
          <span className="text-gray-600 font-medium text-sm">Struggle End Age:</span>
          <span className="text-gray-800 font-semibold text-sm">{analysis.struggleEndAge}</span>
        </div>
      </div>
    );
  }
  return null;
})()}
            </div>
        </CardContent>
      </Card>

      {/* Main Grid Card with celestial background */}
      <Card className="shadow-xl border-2 border-gray-400 bg-white/10 backdrop-blur-md rounded-xl celestial-bg relative overflow-hidden flex-1">
        {/* Semi-transparent overlay for readability */}
        <div className="absolute inset-0 bg-white/85 backdrop-blur-sm"></div>
        
        <div className="relative z-10">
          <CardHeader className="text-center pb-1 md:pb-2">
            {/* Analysis Buttons */}
            <div className="text-center flex flex-wrap justify-center gap-3">
              <Button 
                onClick={() => setShowPlaneAnalysis(true)}
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-4 md:px-6 py-2"
              >
                Plane Analysis
              </Button>
              <Button 
                onClick={() => setShowStruggleAnalysis(true)}
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-4 md:px-6 py-2"
              >
                Age of Struggle End
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-3 p-3 md:p-4">
            {/* Lo Shu Grid - Reduced spacing for tighter layout */}
            <div className="flex justify-center items-center">
              <div className="grid grid-cols-3 gap-1 md:gap-2 p-3 md:p-4 border-2 border-gray-400 rounded-lg bg-white/90 shadow-lg">
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
              <div>
                {/* <div className="text-center">
                  <h3 className="font-bold text-gray-700">Conductor Series (Maha Dasha)</h3>
                  <p className="font-bold text-gray-500">Click on any number below to view Antar Dasha table & Mahadasha details</p>
                </div> */}
                
                 {/* Ages Row - Enlarged for better visibility */}
                <div className="border-2 border-gray-400 rounded-lg overflow-hidden bg-white/90 backdrop-blur-sm">
                  <div className="grid grid-cols-11 bg-gray-100 border-b-2 border-gray-400">
                    {conductorSeries.map((age, index) => (
                      <div key={`age-${age}-${index}`} className="text-center font-bold text-gray-700 py-2 md:py-3 px-1 md:px-2 border-r border-gray-400 last:border-r-0 text-sm md:text-base">
                        {age}
                      </div>
                    ))}
                  </div>
                  
                  {/* Conductor Numbers Row - Enlarged for better visibility */}
                  <div className="grid grid-cols-11">
                    {bottomValues.map((number, index) => (
                      <button
                        key={`conductor-${number}-${index}`}
                        onClick={() => handleConductorClick(number, index)}
                        className="bg-amber-50 hover:bg-amber-100 py-2 md:py-3 px-1 md:px-2 text-center font-bold text-amber-800 transition-colors cursor-pointer border-r border-gray-400 last:border-r-0 text-sm md:text-base"
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

      {/* Show Number Detail below the grid when a grid number is clicked */}
      {selectedNumber && !selectedAntarDasha && !showMahadashaOnly && (
        <div className="mt-6">
          <NumberDetail 
            number={selectedNumber}
            onBack={handleBackFromNumber}
            userName={userData.fullName}
            dateOfBirth={userData.dateOfBirth}
            showOnlyMahadasha={false}
          />
        </div>
      )}

      {/* Antar Dasha Table only (when no number detail is shown) */}
      {selectedAntarDasha && !selectedNumber && (
        <div className="mt-6">
          <AntarDashaTable
            data={selectedAntarDasha.data}
            planet={selectedAntarDasha.planet}
            startAge={selectedAntarDasha.startAge}
            onClose={() => setSelectedAntarDasha(null)}
            isPreBirth={selectedAntarDasha.isPreBirth}
            dateOfBirth={selectedAntarDasha.dateOfBirth}
            conductorIndex={selectedAntarDasha.conductorIndex}
          />
        </div>
      )}

      {/* Struggle Analysis below the grid */}
      {showStruggleAnalysis && (
        <div className="mt-6">
          <StruggleAnalysis 
            onBack={() => setShowStruggleAnalysis(false)}
            userName={userData.fullName}
            dateOfBirth={userData.dateOfBirth}
          />
        </div>
      )}
    </div>
  );
};
