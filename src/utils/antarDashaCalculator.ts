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
  GURU:    [58, 69, 62, 26, 72, 22, 37, 26, 66], 
  SHANI:   [82, 74, 30, 87, 26, 43, 30, 78, 69], 
  BUDH:    [66, 27, 77, 23, 39, 27, 70, 62, 74], 
  KETU:    [11, 32, 10, 16, 11, 29, 26, 31, 29], 
  SHUKRA:  [91, 27, 46, 32, 82, 72, 87, 77, 32] 
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

  // Traverse in reverse (from last to first)
  for (let i = fixedDays.length - 1; i >= 0; i--) {
    const pratyantar = sequence[i];
    let days = fixedDays[i];
    console.log(`🪐 Processing ${pratyantar.name} with fixed ${days} days`);

    if (usedDays + days > totalDays) {
      days = totalDays - usedDays;
      console.log(`⚠️ Clipping ${pratyantar.name} to ${days} days to match total`);
    }

    const tentativeFrom = subtractDays(currentDate, days);

    if (tentativeFrom < dobDate) {
      const clippedDays = Math.ceil((currentDate.getTime() - dobDate.getTime()) / (1000 * 60 * 60 * 24));
      console.log(`📍 Clipping to DOB for ${pratyantar.name}: ${clippedDays} days`);
      
      pratyantarReverseData.unshift({
        title: `${mainPlanetName} – ${pratyantar.name}`,
        pratyantar: pratyantar.name,
        days: clippedDays,
        from: formatDate(dobDate),
        to: formatDate(currentDate),
        planetNumber: getPlanetNumberFromName(pratyantar.name)
      });
      break;
    }

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
    console.log(`✅ Added ${pratyantar.name}: ${days} days | Total used: ${usedDays}`);

    if (usedDays >= totalDays) {
      console.log('✅ Finished: Reached total Antar Dasha days.');
      break;
    }
  }

  console.log('✅ Final Pre-Birth Pratyantar Dasha Output:', pratyantarReverseData);
  return pratyantarReverseData;
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

export { planetMap };
