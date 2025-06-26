
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, ChevronDown, ChevronRight } from 'lucide-react';
import { 
  calculatePratyantarDasha, 
  calculatePreBirthPratyantarDasha, 
  calculateDainikDasha, 
  calculatePreBirthDainikDasha 
} from '@/utils/antarDashaCalculator';

interface AntarDashaRow {
  antar: string;
  days: number;
  from: string;
  to: string;
  planetNumber: number;
}

interface AntarDashaTableProps {
  data: AntarDashaRow[];
  planet: string;
  startAge: number;
  onClose: () => void;
  isPreBirth?: boolean;
  dateOfBirth: string;
  conductorIndex: number;
}

export const AntarDashaTable = ({ 
  data, 
  planet, 
  startAge, 
  onClose, 
  isPreBirth = false, 
  dateOfBirth,
  conductorIndex
}: AntarDashaTableProps) => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [pratyantarData, setPratyantarData] = useState<any[]>([]);
  const [expandedPratyantarRow, setExpandedPratyantarRow] = useState<string | null>(null);
  const [dainikData, setDainikData] = useState<any[]>([]);

  // Validate data is an array before rendering
  if (!Array.isArray(data)) {
    return null;
  }

  const formatDateCell = (date: string) => {
    return (
      <div className="date-cell whitespace-nowrap font-bold">
        {date}
      </div>
    );
  };

  const handleRowClick = async (index: number, row: AntarDashaRow) => {
    if (expandedRow === index) {
      setExpandedRow(null);
      setPratyantarData([]);
      return;
    }

    try {
      let pratyantar;

      console.log('🚀 handleRowClick called:', {
        index,
        isPreBirth,
        conductorIndex,
        shouldUseReverse: isPreBirth && conductorIndex === 0,
        row
      });

      if (isPreBirth && conductorIndex === 0) {
        console.log('✅ Calling calculatePreBirthPratyantarDasha');
        pratyantar = calculatePreBirthPratyantarDasha(
          row.from,
          row.to,
          row.planetNumber,
          row.antar,
          dateOfBirth
        );
      } else {
        console.log('✅ Calling calculatePratyantarDasha');
        pratyantar = calculatePratyantarDasha(
          row.from,
          row.to,
          row.planetNumber,
          row.antar
        );
      }

      console.log('📊 Pratyantar result:', pratyantar);
      setPratyantarData(pratyantar);
      setExpandedRow(index);
    } catch (error) {
      console.error('❌ Error calculating Pratyantar Dasha:', error);
    }
  };

  const handlePratyantarRowClick = async (
    pratyantarIndex: number,
    pratyantarRow: any,
    antarRow: AntarDashaRow
  ) => {
    const rowKey = `${expandedRow}-${pratyantarIndex}`;

    if (expandedPratyantarRow === rowKey) {
      setExpandedPratyantarRow(null);
      setDainikData([]);
      return;
    }

    try {
      let dainik;

      console.log('🚀 handlePratyantarRowClick called for Dainik:', { 
        pratyantarIndex, 
        isPreBirth, 
        conductorIndex,
        shouldUseReverse: isPreBirth && conductorIndex === 0,
        expandedRow, 
        dateOfBirth,
        pratyantarRow,
        antarRow 
      });

      if (isPreBirth && conductorIndex === 0) {
        console.log('✅ Calling calculatePreBirthDainikDasha');
        dainik = calculatePreBirthDainikDasha(
          pratyantarRow.from,
          pratyantarRow.to,
          antarRow.antar,
          pratyantarRow.pratyantar,
          dateOfBirth
        );
      } else {
        console.log('✅ Calling normal calculateDainikDasha');
        dainik = calculateDainikDasha(
          pratyantarRow.from,
          pratyantarRow.to,
          pratyantarRow.planetNumber || antarRow.planetNumber,
          antarRow.antar,
          antarRow.antar,
          pratyantarRow.pratyantar
        );
      }

      console.log('📊 Dainik result:', dainik);
      setDainikData(dainik);
      setExpandedPratyantarRow(rowKey);
    } catch (error) {
      console.error('Error calculating Dainik Dasha:', error);
    }
  };

  const getTableTitle = () => {
    if (isPreBirth) {
      return `Birth Maha Dasha (Age ${planet})`;
    }
    return `${planet} Maha Dasha (Age ${startAge - 9} - ${startAge})`;
  };

  return (
    <Card className="mt-6 shadow-lg border border-amber-200 font-calibri">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <CardTitle className="font-bold text-amber-700">
            {getTableTitle()}
          </CardTitle>
          <Button onClick={onClose} variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
            <X size={18} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-400">
          <thead>
            <tr className="bg-amber-50">
              <th className="border border-gray-400 w-6 px-2 py-2 font-bold text-amber-800"></th>
              <th className="border border-gray-400 px-2 py-2 font-bold text-amber-800 whitespace-nowrap">ANTAR</th>
              <th className="border border-gray-400 px-2 py-2 font-bold text-amber-800 whitespace-nowrap">DAYS</th>
              <th className="border border-gray-400 px-2 py-2 font-bold text-amber-800 whitespace-nowrap">FROM</th>
              <th className="border border-gray-400 px-2 py-2 font-bold text-amber-800 whitespace-nowrap">TO</th>
            </tr>
          </thead>

          <tbody>
            {data.map((row, index) => (
              <>
                <tr
                  key={index}
                  className="hover:bg-amber-25 cursor-pointer transition-colors"
                  onClick={() => handleRowClick(index, row)}
                >
                  <td className="border border-gray-400 text-center px-2 py-2">
                    {expandedRow === index ? (
                      <ChevronDown size={16} className="text-amber-600" />
                    ) : (
                      <ChevronRight size={16} className="text-amber-600" />
                    )}
                  </td>
                  <td className="border border-gray-400 text-gray-800 font-bold px-2 py-2">{row.antar}</td>
                  <td className="border border-gray-400 text-gray-600 font-bold px-2 py-2">{row.days}</td>
                  <td className="border border-gray-400 text-gray-600 px-2 py-2">{formatDateCell(row.from)}</td>
                  <td className="border border-gray-400 text-gray-600 px-2 py-2">{formatDateCell(row.to)}</td>
                </tr>

                {expandedRow === index && pratyantarData.length > 0 && (
                  <tr>
                    <td colSpan={5} className="border border-gray-400 p-0">
                      <div className="bg-orange-25 border-l-4 border-orange-300 ml-4 mr-2 my-2">
                        <div className="p-4">
                          <h4 className="font-bold text-orange-700 mb-3">
                            Pratyantar Dasha – {row.antar}
                            {isPreBirth && conductorIndex === 0 && <span className="text-sm ml-2">(Pre-Birth Reverse)</span>}
                          </h4>
                          <table className="w-full border-collapse border border-gray-400">
                            <thead>
                              <tr className="bg-orange-50">
                                <th className="border border-gray-400 w-6 text-orange-800 font-bold px-2 py-2"></th>
                                <th className="border border-gray-400 text-orange-800 font-bold px-2 py-2">PRATYANTAR</th>
                                <th className="border border-gray-400 text-orange-800 font-bold px-2 py-2">DAYS</th>
                                <th className="border border-gray-400 text-orange-800 font-bold px-2 py-2">FROM</th>
                                <th className="border border-gray-400 text-orange-800 font-bold px-2 py-2">TO</th>
                              </tr>
                            </thead>
                            <tbody>
                              {pratyantarData.map((pratyRow, pratyIndex) => (
                                <>
                                  <tr
                                    key={pratyIndex}
                                    className="hover:bg-orange-100 cursor-pointer"
                                    onClick={() => handlePratyantarRowClick(pratyIndex, pratyRow, row)}
                                  >
                                    <td className="border border-gray-400 text-center px-2 py-2">
                                      {expandedPratyantarRow === `${index}-${pratyIndex}` ? (
                                        <ChevronDown size={14} className="text-orange-600" />
                                      ) : (
                                        <ChevronRight size={14} className="text-orange-600" />
                                      )}
                                    </td>
                                    <td className="border border-gray-400 text-gray-700 font-bold px-2 py-2">{pratyRow.pratyantar}</td>
                                    <td className="border border-gray-400 text-gray-600 font-bold px-2 py-2">{pratyRow.days}</td>
                                    <td className="border border-gray-400 text-gray-600 px-2 py-2">{formatDateCell(pratyRow.from)}</td>
                                    <td className="border border-gray-400 text-gray-600 px-2 py-2">{formatDateCell(pratyRow.to)}</td>
                                  </tr>

                                  {expandedPratyantarRow === `${index}-${pratyIndex}` && dainikData.length > 0 && (
                                    <tr>
                                      <td colSpan={5} className="border border-gray-400 p-0">
                                        <div className="bg-red-25 border-l-4 border-red-300 ml-6 mr-2 my-2">
                                          <div className="p-3">
                                            <h5 className="font-bold text-red-700 mb-2">
                                              Dainik Dasha – {row.antar} – {pratyRow.pratyantar}
                                            </h5>
                                            <table className="w-full border-collapse border border-gray-400">
                                              <thead>
                                                <tr className="bg-red-50">
                                                  <th className="border border-gray-400 text-red-800 font-bold px-2 py-2">DAINIK</th>
                                                  <th className="border border-gray-400 text-red-800 font-bold px-2 py-2">DAYS</th>
                                                  <th className="border border-gray-400 text-red-800 font-bold px-2 py-2">FROM</th>
                                                  <th className="border border-gray-400 text-red-800 font-bold px-2 py-2">TO</th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                {dainikData.map((dainikRow, dainikIndex) => (
                                                  <tr key={dainikIndex}>
                                                    <td className="border border-gray-400 text-gray-700 font-bold px-2 py-2">{dainikRow.dainik}</td>
                                                    <td className="border border-gray-400 text-gray-600 font-bold px-2 py-2">{dainikRow.days}</td>
                                                    <td className="border border-gray-400 text-gray-600 px-2 py-2">{formatDateCell(dainikRow.from)}</td>
                                                    <td className="border border-gray-400 text-gray-600 px-2 py-2">{formatDateCell(dainikRow.to)}</td>
                                                  </tr>
                                                ))}
                                              </tbody>
                                            </table>
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  )}
                                </>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};
