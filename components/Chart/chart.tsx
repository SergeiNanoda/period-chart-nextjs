"use client";
import React, { useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  TooltipProps,
} from "recharts";
import "./chart.scss";
import get from "lodash.get";
import isEmpty from "lodash.isempty";
import { motion } from "framer-motion";
import { PeriodChartData, ChartType } from '@/types/periodChartData';
import { MONTH_TRANSLATIONS } from '@/constants/translations';

type BarPositionData = {
  x: number;
  y: number;
  width: number;
}

type BarPosition = BarPositionData;

interface ChartData {
  name: string;
  v: unknown;
}

const parseData = (data: PeriodChartData, chartType: string): ChartData[] => {
  switch (chartType) {
    case "monthly":
      const monthData = get(data, ['0', 'graph', 'month'], {});
      const monthPairs = Object.entries(monthData);

      return monthPairs.map(pair => ({
        name: pair[0],
        v: pair[1],
      }));
    case "yearly":
      const yearlyData = get(data, ['0', 'graph', 'year'], {});
      const yearlyPairs = Object.entries(yearlyData);

      return yearlyPairs.map(pair => ({
        name: MONTH_TRANSLATIONS[pair[0]],
        v: pair[1],
      }))
    case "half-yearly":
      const halfYearlyData = get(data, ['0', 'graph', 'half_year'], {});
      const halfYearlyPairs = Object.entries(halfYearlyData);

      return halfYearlyPairs.map(pair => ({
        name: MONTH_TRANSLATIONS[pair[0]],
        v: pair[1],
      }))
    default:
      throw new Error('There is no existing chart types')
  }
}

export default function Chart(props: {
  data: PeriodChartData;
  chartType: ChartType;
}) {
  let [posData, setPosData] = React.useState<BarPosition | undefined>(undefined);
  let [showTooltip, setShowTooltip] = React.useState<boolean>(false);
  let [data, setData] = React.useState<ChartData[]>([]);

  const CustomYTick = ({ x, y, payload }: any) => {
    return (
      <g transform={`translate(${x - 50},${y})`}>
        <text
          x={0}
          y={0}
          textAnchor="start"
          fill="#000"
          style={{ fontSize: "20px", fontFamily: "Manrope" }}
        >
          {payload.value}
        </text>
      </g>
    );
  };

  const CustomXTick = ({ x, y, payload }: any) => {
    if (props.chartType === "monthly") {
      return (payload.value % 5 === 0 || payload.value === '1') ? (
        <g transform={`translate(${x},${y + 15})`} className="recharts-layer recharts-cartesian-axis-tick">
          <text
            className="recharts-text recharts-cartesian-axis-tick-value"
            orientation="bottom"
            textAnchor="middle"
            fill="#000"
            style={{ fontSize: "20px", fontFamily: "Manrope" }}
          >
            <tspan>
              {payload.value < 10
                ? "0" + payload.value
                : "" + payload.value
              }
            </tspan>
          </text>
        </g>
      ) : null;
    }

    return (
      <g transform={`translate(${x},${y + 15})`} className="recharts-layer recharts-cartesian-axis-tick">
        <text
          className="recharts-text recharts-cartesian-axis-tick-value"
          orientation="bottom"
          textAnchor="middle"
          fill="#000"
          style={{ fontSize: "20px", fontFamily: "Manrope" }}
        >
          <tspan>
            {payload.value}
          </tspan>
        </text>
      </g>
    );
  };

  const CustomTooltip = (props: TooltipProps<string, number>) => {
    const { payload } = props;
    if (payload && payload.length) {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.8
          }}
        >
          <div className={`rechart-custom-tooltip ${showTooltip ? 'rechart-custom-tooltip--visible' : 'rechart-custom-tooltip--invisible'}`}>
            <span className="rechart-custom-label">{payload[0].value}</span>
          </div>
        </motion.div>
      );
    }
    return null;
  };

  useEffect(() => {
    setData([]);
    setTimeout(() => {
      setData(parseData(props.data, props.chartType));
    }, 100);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.chartType])

  return (
    <div className="chart_wrapper">
      <BarChart
        width={935}
        height={320}
        data={data}
        margin={{ top: 20 }}
      >
        <XAxis
          axisLine={false}
          tickLine={false}
          dataKey="name"
          type={'category'}
          tick={<CustomXTick />}
          interval={0}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tickCount={6}
          domain={[0, 10000]}
          tick={<CustomYTick />}
        />
        <Tooltip
          cursor={false}
          position={
            (posData?.x !== undefined && posData?.width !== undefined && posData?.y !== undefined)
              ? { x: posData?.x - posData?.width, y: posData?.y - 28 }
              : undefined
          }
          content={<CustomTooltip />}
          isAnimationActive={false}
        />
        <Bar
          barSize={16}
          dataKey="v"
          fill="#000AFF"
          shape={<rect className="recharts-single-bar" rx="4" fill="#000AFF" width="16" />}
          minPointSize={1}
          isAnimationActive={true}
          onMouseOver={(data) => {
            setPosData(data);
            setShowTooltip(true);
          }}
          onMouseLeave={() => {
            setShowTooltip(false)
          }}
        />
      </BarChart>
    </div>
  );
}
