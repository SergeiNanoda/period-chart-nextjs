export interface Year {
  January: number;
  February: number;
  March: number;
  April: number;
  May: number;
  June: number;
  July: number;
  August: number;
  September: number;
  October: number;
  November: number;
  December: number;
}

export interface HalfYear {
  January: number;
  February: number;
  March: number;
  April: number;
  May: number;
  June: number;
}

const month_days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31] as const;
type MonthKey = typeof month_days[number];
export type Month = Record<MonthKey, number>;

export interface PeriodChartData {
  earnings: {
    year_sum: number;
    six_month_sum: number;
    last_month_sum: number;
  },
  graph: {
    year: Year,
    half_year: HalfYear,
    month: Month,
  },
}

export type ChartType = "monthly" | "yearly" | "half-yearly";

interface MonthBarChartRecord {
  name: MonthKey,

}