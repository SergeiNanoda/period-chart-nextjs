'use client';
import Select from '@/components/Select/select';
import { useState, useEffect } from 'react';
import Chart from '@/components/Chart/chart';
import { PeriodChartData, ChartType } from '@/types/periodChartData';
import './periodChart.scss';

export default function PeriodChart(props: { data: PeriodChartData }) {
  const [domLoaded, setDomLoaded] = useState<boolean>(false);
  const [chartType, setChartType] = useState<ChartType>('monthly');

  useEffect(() => {
    setDomLoaded(true);
  }, [])

  return (
    <main className='diagWrapper'>
      {domLoaded && (
        <>
          <Select chartType={chartType} setChartType={setChartType} />
          <Chart chartType={chartType} data={props.data} />
        </>
      )}
    </main>
  )
}
