interface PlanetData {
  name: string;
  days: number;
}

const planetMap: Record<number, PlanetData> = {
  1: { name: 'SURYA', days: 164 },
  2: { name: 'CHANDRA', days: 274 },
  3: { name: 'GURU', days: 438 },
  4: { name: 'RAHU', days: 493 },
  5: { name: 'BUDH', days: 465 },
  6: { name: 'SHUKRA', days: 547 },
  7: { name: 'KETU', days: 192 },
  8: { name: 'SHANI', days: 520 },
  9: { name: 'MANGAL', days: 192 }
};

const pratyantarFixedDays: Record<string, number[]> = {
  SURYA:   [8, 14, 10, 25, 22, 26, 23, 10, 26], 
  CHANDRA: [23, 16, 41, 37, 43, 39, 16, 46, 13], 
  MANGAL:  [11, 29, 26, 30, 27, 11, 32, 10, 16], 
  RAHU:    [74, 66, 78, 70, 29, 82, 25, 41, 28], 
  GURU:    [58, 69, 62, 26, 72, 22, 37, 27, 65], 
  SHANI:   [82, 74, 30, 87, 26, 43, 30, 78, 69], 
  BUDH:    [66, 27, 77, 23, 39, 27, 70, 62, 74], 
  KETU:    [11, 32, 10, 16, 11, 29, 26, 31, 29], 
  SHUKRA:  [91, 27, 46, 32, 82, 72, 87, 77, 32] 
};

export const dainikFixedDays: Record<string, Record<string, number[]>> = {
  SURYA: {
    SURYA: [0, 1, 0, 1, 1, 1, 1, 0, 3],
    CHANDRA: [1, 1, 2, 2, 2, 2, 1, 2, 1],
    MANGAL: [1, 2, 1, 2, 1, 1, 2, 0, 0],
    RAHU: [4, 3, 4, 4, 1, 4, 1, 2, 2],
    GURU: [3, 3, 3, 1, 4, 1, 2, 1, 4],
    SHANI: [4, 4, 2, 4, 1, 2, 2, 4  , 3],
    BUDH: [3, 1, 4, 1, 2, 1, 3, 3, 5],
    KETU: [1, 2, 0, 1, 1, 2, 1, 2, 0],
    SHUKRA: [4, 1, 2, 2, 4, 3, 4, 4, 2]
  },
  CHANDRA: {
    CHANDRA: [2, 1, 3, 3, 4, 3, 1, 4, 2],
    MANGAL: [1, 2, 2, 3, 2, 1, 3, 1, 1],
    RAHU: [6, 5, 6, 6, 2, 7, 2, 3, 4],
    GURU: [5, 6, 5, 2, 6, 2, 3, 2, 6],
    SHANI: [4, 4, 2, 4, 1, 2, 2, 4, 3],
    BUDH: [6, 2, 6, 2, 3, 2, 6, 5, 7],
    KETU: [1, 3, 1, 1, 1, 2, 2, 3, 2],
    SHUKRA: [8, 2, 4, 3, 7, 6, 7, 7, 2],
    SURYA: [1, 1, 1, 2, 2, 2, 2, 1, 1]
  },
  MANGAL: {
    MANGAL: [1, 2, 1, 2, 2, 1, 2, 0, 0],
    RAHU: [4, 4, 5, 4, 2, 5, 1, 2, 2],
    GURU: [3, 3, 4, 2, 4, 1, 2, 2, 4],
    SHANI: [5, 4, 2, 5, 1, 3, 2, 5, 3],
    BUDH: [4, 2, 4, 1, 2, 2, 4, 4, 4],
    KETU: [1, 2, 1, 1, 1, 2, 1, 2, 0],
    SHUKRA: [5, 2, 3, 2, 5, 4, 5, 5, 1],
    SURYA: [0, 1, 1, 2, 1, 2, 1, 1, 1],
    CHANDRA: [1, 1, 2, 2, 3, 2, 1, 3, 1]
  },
  RAHU: {
    RAHU : [11, 10, 12, 10, 4, 12, 4, 6, 5],
    GURU: [9, 10, 9, 4, 11, 3, 6, 4, 10],
    SHANI: [13, 11, 5, 13, 4, 7, 5, 12, 9],
    BUDH: [10, 4, 12, 3, 6, 4, 11, 9, 11],
    KETU: [2, 5 ,1, 2, 2, 4, 4, 5, 4],
    SHUKRA: [14, 4, 7, 5, 12, 11, 13, 12, 5],
    SURYA: [1, 2, 1, 4, 3, 4, 4, 1, 5],
    CHANDRA: [3, 2, 6, 5, 6, 6, 2, 7, 4],
    MANGAL: [2, 4, 4, 5, 4, 2, 5, 1, 2]
  },
  GURU: {
    GURU: [8, 9, 8, 3, 10, 3, 5, 3, 9],
    SHANI: [11, 10, 4, 11, 3, 6, 4, 10, 10],
    BUDH: [9, 4, 10, 3, 5, 4, 9, 8, 10],
    KETU: [2, 4, 1, 2, 2, 4, 3, 4, 4],
    SHUKRA: [12, 4, 6, 4, 11, 10, 12, 10, 4],
    SURYA: [1, 2, 1, 3, 3, 3, 3, 1, 5],
    CHANDRA: [3, 2, 6, 5, 6, 5, 2, 6, 2],
    MANGAL: [2, 4, 3,  4, 4, 2, 4, 1, 2],
    RAHU: [10, 9, 10 , 9, 4, 11, 3, 5, 4]
  },
  SHANI: {
    SHANI: [13, 12, 5, 14, 4, 7, 5, 12, 10],
    BUDH: [10, 4, 12, 4, 6, 4, 11, 10, 13],
    KETU: [2, 5, 1, 3, 2, 5, 4, 5, 3],
    SHUKRA: [14, 4, 7, 5, 13, 12, 14, 12, 6],
    SURYA: [1, 2, 2, 4, 3, 4, 4, 2, 4],
    CHANDRA: [4, 3, 6, 6, 7, 6, 3, 7, 1],
    MANGAL: [2, 5, 4, 5, 4, 2, 5, 1, 2],
    RAHU: [12, 10, 12, 11, 5, 13, 4, 7, 4],
    GURU: [9, 11, 10, 4, 12, 3, 6, 4, 11]
  },
  BUDH: {
    BUDH: [9, 4, 11, 3, 6, 4, 10, 9, 10],
    KETU: [2, 4, 1, 2, 2, 4, 4, 4, 4],
    SHUKRA: [13, 4, 6, 5, 12, 10, 12, 11, 4],
    SURYA: [1, 2, 1, 3, 3, 4, 3, 1, 5],
    CHANDRA: [3, 2, 6, 5, 6, 6, 2, 6, 3],
    MANGAL: [2, 4, 4, 4, 4, 2, 4, 1, 2],
    RAHU: [11, 9, 11, 10, 4, 12, 3, 6, 4],
    GURU: [8, 10, 9, 4, 10, 3, 5, 4, 9],
    SHANI: [12, 10, 4, 12, 4, 6, 4, 11, 11]
  },
  KETU: {
    KETU: [1, 2, 1, 1, 1, 2, 1, 2, 0],
    SHUKRA: [5, 2, 3, 2, 5, 4, 5, 5, 1],
    SURYA: [0, 1, 1, 2, 1, 2, 1, 1, 1],
    CHANDRA: [1, 1, 2, 2, 3, 2, 1, 3, 1],
    MANGAL: [1, 2, 1, 2, 2, 1, 2, 0, 0],
    RAHU: [4, 4, 5, 4, 2, 5, 1, 2, 2],
    GURU: [3, 4, 4, 2, 4, 1, 2, 2, 4],
    SHANI: [5, 4, 2, 5, 1, 3, 2, 5, 3],
    BUDH: [4, 2, 4, 1, 2, 2, 4, 4, 4]
  },
  SHUKRA: {
    SHUKRA: [15, 5, 8, 5, 14, 12, 14, 13, 5],
    SURYA: [1, 2, 2, 4, 4, 4, 4, 2, 4],
    CHANDRA: [4, 3, 7, 6, 7, 7, 3, 8, 1],
    MANGAL: [2, 5, 4, 5, 5, 2, 5, 2, 2],
    RAHU: [12, 11, 13, 12, 5, 14, 4, 7, 4],
    GURU: [10, 12, 10, 4, 12, 4, 6, 4, 11],
    SHANI: [14, 12, 5, 14, 4, 7, 5, 13, 13],
    BUDH: [11, 5, 13, 4, 6, 5, 12, 10, 11],
    KETU: [2, 5, 2, 3, 2, 5, 4, 5, 4]
  }
};

const fixedSequence = [1, 2, 9, 4, 3, 8, 5, 7, 6];

const getPlanetSequence = (startPlanetNumber: number): PlanetData[] => {
  const startIndex = fixedSequence.indexOf(startPlanetNumber);
  const rotatedSequence = [
    ...fixedSequence.slice(startIndex),
    ...fixedSequence.slice(0, startIndex)
  ];
  return rotatedSequence.map(num => planetMap[num]);
};

const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const subtractDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
};

const formatDate = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const parseDate = (dateStr: string): Date => {
  const [yearStr, monthStr, dayStr] = dateStr.split('-');
    return new Date(Number(yearStr), Number(monthStr) - 1, Number(dayStr));
};

const parseDateDDMMYYYY = (dateStr: string): Date => {
  const [dayStr, monthStr, yearStr] = dateStr.split('/');
  return new Date(Number(yearStr), Number(monthStr) - 1, Number(dayStr));
};

const getPlanetNumberFromName = (planetName: string): number => {
  for (const [key, value] of Object.entries(planetMap)) {
    if (value.name === planetName) return parseInt(key);
  }
  return 1;
};

const formatISTDate = (date: Date): string => {
  const [day, month, year] = date
    .toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' })
    .split('/');
  return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
};

export const calculateAntarDasha = (
  dateOfBirth: string,
  startAge: number,
  planetNumber: number
) => {
  const dobDate = parseDate(dateOfBirth);

  // ✅ FIX: Start from (DOB + (startAge - 9))
  const startDate = new Date(dobDate);
  startDate.setFullYear(startDate.getFullYear() + (startAge - 9));

  const endDate = new Date(startDate);
  endDate.setFullYear(endDate.getFullYear() + 9);

  const planetSequence = getPlanetSequence(planetNumber);
  const totalPlanetDays = planetSequence.reduce((sum, p) => sum + p.days, 0);
  const totalPeriodDays = Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

  let currentDate = new Date(startDate);
  let accumulatedDays = 0;

  const antarDashaData = planetSequence.map((antar, i) => {
    const fromDate = new Date(currentDate);

    let days: number;
    if (i === planetSequence.length - 1) {
      // Ensure exact end date
      days = totalPeriodDays - accumulatedDays;
    } else {
      days = Math.floor((antar.days / totalPlanetDays) * totalPeriodDays);
      accumulatedDays += days;
    }

    const toDate = addDays(fromDate, days);
    currentDate = new Date(toDate);

    return {
      antar: antar.name,
      days: days,
      from: formatDate(fromDate),
      to: formatDate(toDate),
      planetNumber: getPlanetNumberFromName(antar.name),
    };
  });

  return antarDashaData;
};

export const calculatePreBirthAntarDasha = (
  dateOfBirth: string,
  planetNumber: number,
  conductorValue: number
) => {
  const dobDate = parseDate(dateOfBirth);
  const targetAgeDate = new Date(dobDate);
  targetAgeDate.setFullYear(targetAgeDate.getFullYear() + conductorValue);

  const reversedSequence = getPlanetSequence(planetNumber).reverse();
  let currentDate = new Date(targetAgeDate);
  const antarDashaData: any[] = [];

  let crossedDOB = false;

  for (let i = 0; i < reversedSequence.length; i++) {
    const planet = reversedSequence[i];
    const originalDays = planet.days;

    if (!crossedDOB) {
      const newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() - originalDays);

      if (newDate <= dobDate) {
        const daysTillDOB = Math.ceil(
          (currentDate.getTime() - dobDate.getTime()) / (1000 * 60 * 60 * 24)
        );

        antarDashaData.push({
          antar: planet.name,
          days: daysTillDOB,
          from: formatISTDate(dobDate),
          to: formatISTDate(currentDate),
          planetNumber: getPlanetNumberFromName(planet.name),
        });

        crossedDOB = true;
      } else {
        antarDashaData.push({
          antar: planet.name,
          days: originalDays,
          from: formatISTDate(newDate),
          to: formatISTDate(currentDate),
          planetNumber: getPlanetNumberFromName(planet.name),
        });
        currentDate = newDate;
      }
    } else {
      antarDashaData.push({
        antar: planet.name,
        days: 0,
        from: '–',
        to: '–',
        planetNumber: getPlanetNumberFromName(planet.name),
      });
    }
  }

  return antarDashaData.reverse();
};

export const calculatePratyantarDasha = (
  fromDateStr: string,
  toDateStr: string,
  startPlanetNumber: number,
  mainPlanetName: string
) => {
  const startDate = parseDateDDMMYYYY(fromDateStr);
  const endDate = parseDateDDMMYYYY(toDateStr);
  const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const sequence = getPlanetSequence(startPlanetNumber);
  const totalPlanetDays = sequence.reduce((sum, p) => sum + p.days, 0);

  const pratyantarData = [];
  let currentDate = new Date(startDate);

  for (let i = 0; i < sequence.length; i++) {
    const pratyantar = sequence[i];
    const fromDate = new Date(currentDate);
    let toDate: Date;

    if (i === sequence.length - 1) {
      toDate = new Date(endDate);
    } else {
      const proportionalDays = Math.round((pratyantar.days / totalPlanetDays) * totalDays);
      toDate = addDays(currentDate, proportionalDays);
    }

    const actualDays = Math.ceil((toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24));

    pratyantarData.push({
      title: `${mainPlanetName} – ${pratyantar.name}`,
      pratyantar: pratyantar.name,
      days: actualDays,
      from: formatDate(fromDate),
      to: formatDate(toDate),
      planetNumber: getPlanetNumberFromName(pratyantar.name)
    });

    currentDate = new Date(toDate);
  }

  return pratyantarData;
};

export const calculatePreBirthPratyantarDasha = (
  fromDateStr: string,
  toDateStr: string,
  startPlanetNumber: number,
  mainPlanetName: string,
  dateOfBirth: string
) => {
  console.log('🚀 calculatePreBirthPratyantarDasha called');
  console.log('fromDate:', fromDateStr, 'toDate:', toDateStr);
  console.log('mainPlanet:', mainPlanetName, 'startPlanetNumber:', startPlanetNumber);
  console.log('DOB:', dateOfBirth);

  const startDate = parseDateDDMMYYYY(fromDateStr);
  const endDate = parseDateDDMMYYYY(toDateStr);
  const dobDate = parseDateDDMMYYYY(dateOfBirth);
  const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  console.log('Total Days in Antar Dasha:', totalDays);

  const fixedDays = pratyantarFixedDays[mainPlanetName];
  if (!fixedDays) {
    console.error(`❌ No fixed days found for planet: ${mainPlanetName}`);
    return [];
  }

  const sequence = getPlanetSequence(startPlanetNumber);
  const pratyantarReverseData = [];
  let currentDate = new Date(endDate);
  let usedDays = 0;

  // Traverse full sequence in reverse
  for (let i = fixedDays.length - 1; i >= 0; i--) {
    const pratyantar = sequence[i];
    let days = fixedDays[i];

    if (usedDays >= totalDays) {
      // Placeholder if total is already filled
      pratyantarReverseData.unshift({
        title: `${mainPlanetName} – ${pratyantar.name}`,
        pratyantar: pratyantar.name,
        days: 0,
        from: '–',
        to: '–',
        planetNumber: getPlanetNumberFromName(pratyantar.name)
      });
      continue;
    }

    if (usedDays + days > totalDays) {
      days = totalDays - usedDays;
    }

    const tentativeFrom = subtractDays(currentDate, days);

    if (tentativeFrom < dobDate) {
      const clippedDays = Math.ceil((currentDate.getTime() - dobDate.getTime()) / (1000 * 60 * 60 * 24));
      pratyantarReverseData.unshift({
        title: `${mainPlanetName} – ${pratyantar.name}`,
        pratyantar: pratyantar.name,
        days: clippedDays,
        from: formatDate(dobDate),
        to: formatDate(currentDate),
        planetNumber: getPlanetNumberFromName(pratyantar.name)
      });

      currentDate = new Date(dobDate);
      usedDays += clippedDays;
    } else {
      pratyantarReverseData.unshift({
        title: `${mainPlanetName} – ${pratyantar.name}`,
        pratyantar: pratyantar.name,
        days,
        from: formatDate(tentativeFrom),
        to: formatDate(currentDate),
        planetNumber: getPlanetNumberFromName(pratyantar.name)
      });

      currentDate = new Date(tentativeFrom);
      usedDays += days;
    }
  }

  console.log('✅ Final Pre-Birth Pratyantar Dasha Output:', pratyantarReverseData);
  return pratyantarReverseData;
};


export const calculatePreBirthDainikDasha = (
  fromDateStr: string,
  toDateStr: string,
  mainPlanetName: string,
  pratyantarPlanetName: string,
  dateOfBirth: string
) => {
  const startDate = parseDateDDMMYYYY(fromDateStr);
  const endDate = parseDateDDMMYYYY(toDateStr);
  const dobDate = parseDateDDMMYYYY(dateOfBirth);
  const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

  const fixedDays = dainikFixedDays[mainPlanetName]?.[pratyantarPlanetName];
  if (!fixedDays) {
    console.error(`❌ No fixed Dainik days found for ${mainPlanetName} → ${pratyantarPlanetName}`);
    return [];
  }

  const fixedSequence = [1, 2, 9, 4, 3, 8, 5, 7, 6];

  // 🔁 Rotate the fixed sequence starting from Pratyantar planet
  const startIndex = fixedSequence.indexOf(getPlanetNumberFromName(pratyantarPlanetName));
  const rotatedSequence = [...fixedSequence.slice(startIndex), ...fixedSequence.slice(0, startIndex)];
  const sequence = rotatedSequence.map(num => getPlanetData(num));
  const rotatedFixedDays = [...fixedDays.slice(startIndex), ...fixedDays.slice(0, startIndex)];

  const dainikData = [];
  let currentDate = new Date(endDate);
  let usedDays = 0;
  let lastUsedIndex = rotatedSequence.length;

  // Traverse in reverse
  for (let i = rotatedFixedDays.length - 1; i >= 0; i--) {
    const dainik = sequence[i];
    let days = rotatedFixedDays[i];

    if (usedDays + days > totalDays) {
      days = totalDays - usedDays;
    }

    const fromDate = subtractDays(currentDate, days);

    if (fromDate < dobDate) {
      const clippedDays = Math.ceil((currentDate.getTime() - dobDate.getTime()) / (1000 * 60 * 60 * 24));
      dainikData.unshift({
        title: `${mainPlanetName} – ${pratyantarPlanetName} – ${dainik.name}`,
        dainik: dainik.name,
        days: clippedDays,
        from: formatDate(dobDate),
        to: formatDate(currentDate)
      });
      lastUsedIndex = i;
      break;
    }

    dainikData.unshift({
      title: `${mainPlanetName} – ${pratyantarPlanetName} – ${dainik.name}`,
      dainik: dainik.name,
      days,
      from: formatDate(fromDate),
      to: formatDate(currentDate)
    });

    currentDate = new Date(fromDate);
    usedDays += days;

    if (usedDays >= totalDays) {
      lastUsedIndex = i;
      break;
    }
  }

  // Add placeholder dash rows for the remaining unused planets
  for (let j = lastUsedIndex - 1; j >= 0; j--) {
    const dainik = sequence[j];
    dainikData.unshift({
      title: `${mainPlanetName} – ${pratyantarPlanetName} – ${dainik.name}`,
      dainik: dainik.name,
      days: 0,
      from: '–',
      to: '–'
    });
  }

  return dainikData;
};



export const calculateDainikDasha = (
  fromDateStr: string,
  toDateStr: string,
  startPlanetNumber: number,
  mainPlanetName: string,
  antarPlanetName: string,
  pratyantarPlanetName: string
) => {
  const startDate = parseDateDDMMYYYY(fromDateStr);
  const endDate = parseDateDDMMYYYY(toDateStr);
  const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const sequence = getPlanetSequence(startPlanetNumber);
  const totalPlanetDays = sequence.reduce((sum, p) => sum + p.days, 0);

  const dainikData = [];
  let currentDate = new Date(startDate);

  for (let i = 0; i < sequence.length; i++) {
    const dainik = sequence[i];
    const fromDate = new Date(currentDate);
    let toDate: Date;

    if (i === sequence.length - 1) {
      toDate = new Date(endDate);
    } else {
      const proportionalDays = (dainik.days / totalPlanetDays) * totalDays;
      toDate = addDays(currentDate, Math.round(proportionalDays));
    }

    const actualDays = (toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24);

    dainikData.push({
      title: `${mainPlanetName} – ${antarPlanetName} – ${pratyantarPlanetName} – ${dainik.name}`,
      dainik: dainik.name,
      days: Math.round(actualDays * 100) / 100,
      from: formatDate(fromDate),
      to: formatDate(toDate)
    });

    currentDate = new Date(toDate);
  }

  return dainikData;
};

export const getPlanetData = (planetNumber: number): PlanetData => {
  return planetMap[planetNumber];
};

export { planetMap };
