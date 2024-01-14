"use client";

import Bento from "@/components/bento/bento";
import BentoCard from "@/components/bento/bento-card";
import Sun from "@/components/conditions/sunny";
import ReactECharts from "@/components/chart";
import Compass from "@/components/compass";
import { useForecat } from "@/hooks/forecast";
import { useState } from "react";
import { EChartOption } from "echarts";
import { conditions } from "@/hooks/conditions";
import ConditionIcon from "@/components/condition-icon";

export default function Home() {
  const [location, setLocation] = useState("Vitoria-Gasteiz");
  const { isLoading, isError, forecast } = useForecat(location);

  if (isLoading || isError) {
    return <></>;
  }

  const condition = `${forecast.current.condition.code}`;
  const hourly: EChartOption<EChartOption.Series> = {
    xAxis: {
      type: "category",
      data: [
        "00:00",
        "01:00",
        "02:00",
        "03:00",
        "04:00",
        "05:00",
        "06:00",
        "07:00",
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00",
      ],
      axisLine: {
        onZero: false,
        lineStyle: {
          color: "#ffffff",
        },
      },
    },
    yAxis: {
      type: "value",
      show: false,
      axisLine: {
        onZero: false,
        lineStyle: {
          color: "#ffffff",
        },
      },
    },
    graphic: [
      {
        type: "text",
      },
    ],
    series: [
      {
        type: "line",
        lineStyle: {
          color: "#ffffff",
        },
        itemStyle: {
          color: "#ffffff",
        },
        emphasis: {
          upperLabel: {
            show: true,
            position: "top",
            formatter: "{d}",
          },
          label: {
            show: true,
            position: "top",
            color: "#ffffff",
            fontSize: 16,
            formatter: function (d: any) {
              return d.data + " ºC";
            },
          },
        },
        data: [
          forecast.forecast.forecastday[0].hour[0].temp_c,
          forecast.forecast.forecastday[0].hour[1].temp_c,
          forecast.forecast.forecastday[0].hour[2].temp_c,
          forecast.forecast.forecastday[0].hour[3].temp_c,
          forecast.forecast.forecastday[0].hour[4].temp_c,
          forecast.forecast.forecastday[0].hour[5].temp_c,
          forecast.forecast.forecastday[0].hour[6].temp_c,
          forecast.forecast.forecastday[0].hour[7].temp_c,
          forecast.forecast.forecastday[0].hour[8].temp_c,
          forecast.forecast.forecastday[0].hour[9].temp_c,
          forecast.forecast.forecastday[0].hour[10].temp_c,
          forecast.forecast.forecastday[0].hour[11].temp_c,
          forecast.forecast.forecastday[0].hour[12].temp_c,
          forecast.forecast.forecastday[0].hour[13].temp_c,
          forecast.forecast.forecastday[0].hour[14].temp_c,
          forecast.forecast.forecastday[0].hour[15].temp_c,
          forecast.forecast.forecastday[0].hour[16].temp_c,
          forecast.forecast.forecastday[0].hour[17].temp_c,
          forecast.forecast.forecastday[0].hour[18].temp_c,
          forecast.forecast.forecastday[0].hour[19].temp_c,
          forecast.forecast.forecastday[0].hour[20].temp_c,
          forecast.forecast.forecastday[0].hour[21].temp_c,
          forecast.forecast.forecastday[0].hour[22].temp_c,
          forecast.forecast.forecastday[0].hour[23].temp_c,
        ],
      },
    ],
    grid: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      containLabel: true,
    },
  };

  return (
    <main className="flex max-h-screen flex-col items-center justify-between gap-12 p-12">
      <h2 className="text-3xl text-slate-100">{location}</h2>
      <Bento cols={6} rows={3} className="w-3/4 h-[900px]">
        <BentoCard cols={2} className="flex flex-col items-center gap-6">
          <ConditionIcon
            condition={forecast.current.condition.code + ""}
            is_day={forecast.current.is_day === 1 ? true : false}
          ></ConditionIcon>
          <span className="text-4xl text-white">
            {forecast.current.temp_c} ºC
          </span>
        </BentoCard>
        <BentoCard cols={4} className="flex flex-col items-center gap-6">
          <div className="forecast w-full h-full overflow-x-scroll">
            <div className="w-[200%] h-full">
              <ReactECharts option={hourly}></ReactECharts>
            </div>
          </div>
        </BentoCard>
        <BentoCard cols={3} className="flex flex-col items-center gap-6">
          <span>Alerta</span>
        </BentoCard>
        <BentoCard cols={1} className="flex flex-col items-center gap-6">
          <span>Presión</span>
        </BentoCard>
        <BentoCard cols={2} className="flex flex-col items-center gap-6">
          <Compass
            className="w-full h-full"
            angle={forecast.current.wind_degree}
          ></Compass>
        </BentoCard>
        <BentoCard cols={2} className="flex flex-col items-center gap-6">
          <span>Fase lunar</span>
        </BentoCard>
        <BentoCard cols={4} className="flex flex-col items-center gap-6">
          <span>Amanecer y atardecer</span>
        </BentoCard>
      </Bento>
    </main>
  );
}
