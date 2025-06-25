import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { X, ChevronDown, ChevronRight } from 'lucide-react';
import { 
  calculatePratyantarDasha, 
  calculatePreBirthPratyantarDasha, 
  calculateDainikDasha, 
  calculatePreBirthDainikDasha 
} from '@/utils/antarDashaCalculator';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(isSameOrBefore);

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
  dateOfBirth: string;  // ✅ MAKE THIS REQUIRED
}

export const AntarDashaTable = ({ data, planet, startAge, onClose, isPreBirth = false, dateOfBirth }: AntarDashaTableProps) => {
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

    const dob = dayjs(dateOfBirth, 'DD/MM/YYYY');
    const rowEnd = dayjs(row.to, 'DD/MM/YYYY');
    const isTrulyPreBirth = isPreBirth && dayjs(row.to, 'DD/MM/YYYY').isSameOrBefore(dayjs(dateOfBirth, 'DD/MM/YYYY'));
 // ensures we're in pre-birth *and* row ends before DOB

    console.log('🚀 handleRowClick called:', {
      index,
      isPreBirth,
      rowEnd: row.to,
      dob: dateOfBirth,
      isTrulyPreBirth,
      row
    });

    if (isTrulyPreBirth) {
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
      expandedRow, 
      dateOfBirth,
      pratyantarRow,
      antarRow 
    });

    // ✅ FIXED: Use antarRow.antar for mainPlanetName
    if (isPreBirth && dateOfBirth && expandedRow === 0) {
      console.log('✅ Calling calculatePreBirthDainikDasha');
      dainik = calculatePreBirthDainikDasha(
        pratyantarRow.from,
        pratyantarRow.to,
        antarRow.antar, // ✅ Correct mainPlanetName
        pratyantarRow.pratyantar,
        dateOfBirth
      );
    } else {
      console.log('✅ Calling normal calculateDainikDasha');
      dainik = calculateDainikDasha(
        pratyantarRow.from,
        pratyantarRow.to,
        pratyantarRow.planetNumber || antarRow.planetNumber,
        antarRow.antar, // ✅ Correct mainPlanetName
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
        <Table className="compressed-table">
          <TableHeader>
            <TableRow className="bg-amber-50">
              <TableHead className="w-6 px-1 py-1 font-bold text-amber-800"></TableHead>
              <TableHead className="px-1 py-1 font-bold text-amber-800 whitespace-nowrap">ANTAR</TableHead>
              <TableHead className="px-1 py-1 font-bold text-amber-800 whitespace-nowrap">DAYS</TableHead>
              <TableHead className="px-1 py-1 font-bold text-amber-800 whitespace-nowrap">FROM</TableHead>
              <TableHead className="px-1 py-1 font-bold text-amber-800 whitespace-nowrap">TO</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((row, index) => (
              <>
                <TableRow
                  key={index}
                  className="hover:bg-amber-25 cursor-pointer transition-colors"
                  onClick={() => handleRowClick(index, row)}
                >
                  <TableCell className="text-center px-1 py-1">
                    {expandedRow === index ? (
                      <ChevronDown size={16} className="text-amber-600" />
                    ) : (
                      <ChevronRight size={16} className="text-amber-600" />
                    )}
                  </TableCell>
                  <TableCell className="text-gray-800 font-bold px-1 py-1">{row.antar}</TableCell>
                  <TableCell className="text-gray-600 font-bold px-1 py-1">{row.days}</TableCell>
                  <TableCell className="text-gray-600 px-1 py-1">{formatDateCell(row.from)}</TableCell>
                  <TableCell className="text-gray-600 px-1 py-1">{formatDateCell(row.to)}</TableCell>
                </TableRow>

                {expandedRow === index && pratyantarData.length > 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="p-0">
                      <div className="bg-orange-25 border-l-4 border-orange-300 ml-4 mr-2 my-2">
                        <div className="p-4">
                          <h4 className="font-bold text-orange-700 mb-3">
                            Pratyantar Dasha – {row.antar}
                            {isPreBirth && <span className="text-sm ml-2">(Pre-Birth Reverse)</span>}
                          </h4>
                          <Table className="compressed-table">
                            <TableHeader>
                              <TableRow className="bg-orange-50">
                                <TableHead className="w-6 text-orange-800 font-bold px-1 py-1"></TableHead>
                                <TableHead className="text-orange-800 font-bold px-1 py-1">PRATYANTAR</TableHead>
                                <TableHead className="text-orange-800 font-bold px-1 py-1">DAYS</TableHead>
                                <TableHead className="text-orange-800 font-bold px-1 py-1">FROM</TableHead>
                                <TableHead className="text-orange-800 font-bold px-1 py-1">TO</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {pratyantarData.map((pratyRow, pratyIndex) => (
                                <>
                                  <TableRow
                                    key={pratyIndex}
                                    className="hover:bg-orange-100 cursor-pointer"
                                    onClick={() => handlePratyantarRowClick(pratyIndex, pratyRow, row)}
                                  >
                                    <TableCell className="text-center px-1 py-1">
                                      {expandedPratyantarRow === `${index}-${pratyIndex}` ? (
                                        <ChevronDown size={14} className="text-orange-600" />
                                      ) : (
                                        <ChevronRight size={14} className="text-orange-600" />
                                      )}
                                    </TableCell>
                                    <TableCell className="text-gray-700 font-bold px-1 py-1">{pratyRow.pratyantar}</TableCell>
                                    <TableCell className="text-gray-600 font-bold px-1 py-1">{pratyRow.days}</TableCell>
                                    <TableCell className="text-gray-600 px-1 py-1">{formatDateCell(pratyRow.from)}</TableCell>
                                    <TableCell className="text-gray-600 px-1 py-1">{formatDateCell(pratyRow.to)}</TableCell>
                                  </TableRow>

                                  {expandedPratyantarRow === `${index}-${pratyIndex}` && dainikData.length > 0 && (
                                    <TableRow>
                                      <TableCell colSpan={5} className="p-0">
                                        <div className="bg-red-25 border-l-4 border-red-300 ml-6 mr-2 my-2">
                                          <div className="p-3">
                                            <h5 className="font-bold text-red-700 mb-2">
                                              Dainik Dasha – {row.antar} – {pratyRow.pratyantar}
                                            </h5>
                                            <Table className="compressed-table">
                                              <TableHeader>
                                                <TableRow className="bg-red-50">
                                                  <TableHead className="text-red-800 font-bold px-1 py-1">DAINIK</TableHead>
                                                  <TableHead className="text-red-800 font-bold px-1 py-1">DAYS</TableHead>
                                                  <TableHead className="text-red-800 font-bold px-1 py-1">FROM</TableHead>
                                                  <TableHead className="text-red-800 font-bold px-1 py-1">TO</TableHead>
                                                </TableRow>
                                              </TableHeader>
                                              <TableBody>
                                                {dainikData.map((dainikRow, dainikIndex) => (
                                                  <TableRow key={dainikIndex}>
                                                    <TableCell className="text-gray-700 font-bold px-1 py-1">{dainikRow.dainik}</TableCell>
                                                    <TableCell className="text-gray-600 font-bold px-1 py-1">{dainikRow.days}</TableCell>
                                                    <TableCell className="text-gray-600 px-1 py-1">{formatDateCell(dainikRow.from)}</TableCell>
                                                    <TableCell className="text-gray-600 px-1 py-1">{formatDateCell(dainikRow.to)}</TableCell>
                                                  </TableRow>
                                                ))}
                                              </TableBody>
                                            </Table>
                                          </div>
                                        </div>
                                      </TableCell>
                                    </TableRow>
                                  )}
                                </>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
