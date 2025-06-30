
import { number1Data } from './number1';
import { number2Data } from './number2';
import { number3Data } from './number3';
import { number4Data } from './number4';
import { number5Data } from './number5';
import { number6Data } from './number6';
import { number7Data } from './number7';
import { number8Data } from './number8';
import { number9Data } from './number9';

export interface NumberSection {
  title: string;
  content: string[];
}

export interface NumberData {
  title: string;
  subtitle: string;
  sections: NumberSection[];
}

export const numberDataMap: Record<number, NumberData> = {
  1: number1Data,
  2: number2Data,
  3: number3Data,
  4: number4Data,
  5: number5Data,
  6: number6Data,
  7: number7Data,
  8: number8Data,
  9: number9Data,
};

export const getNumberData = (number: number): NumberData => {
  return numberDataMap[number] || {
    title: `ALL ABOUT NUMBER ${number}`,
    subtitle: "Coming Soon",
    sections: [
      {
        title: "Content Coming Soon",
        content: [
          `Detailed information for Number ${number} will be available soon.`,
          "This section will include spiritual meanings, career guidance, health associations, and remedies."
        ]
      }
    ]
  };
};
