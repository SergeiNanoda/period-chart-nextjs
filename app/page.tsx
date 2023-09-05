import { Suspense } from 'react';
import PeriodChart from '@/components/PeriodChart/periodChart';
import { PeriodChartData } from '@/types/periodChartData';

async function getData() {
  const res = await fetch(`http://localhost:3001/periods`, {
    cache: "no-store",
    method: "GET",
  });

  return res.json();
}

export default async function Home() {
  const data: PeriodChartData = await getData();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PeriodChart data={data} />
    </Suspense>
  )
}
