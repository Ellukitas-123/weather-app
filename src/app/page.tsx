"use client";

import Bento from "@/components/bento/bento";
import BentoCard from "@/components/bento/bento-card";
import ReactECharts from "@/components/chart";
import Compass from "@/components/compass";
import { useForecat } from "@/hooks/forecast";
import { useState } from "react";
import ConditionIcon from "@/components/condition-icon";
import {
  getHourlyForecastChart,
  getHourlyConditions,
} from "@/utils/hourly-forecast";
import ConditionsArray from "@/components/conditions-array";

export default function Home() {
  const [location, setLocation] = useState("Cartagena, murcia, españa");
  const { isLoading, isError, forecast } = useForecat(location);

  if (isLoading || isError) {
    return <></>;
  }

  const condition = `${forecast.current.condition.code}`;
  const hourlyChart = getHourlyForecastChart(forecast.forecast.forecastday);
  const hourlyConditions = getHourlyConditions(forecast.forecast.forecastday);
  return (
    <main className="flex max-h-screen flex-col items-center justify-between gap-12 p-12">
      <h2 className="text-3xl text-slate-100">{location}</h2>
      <Bento cols={6} rows={3} className="w-3/4 h-[900px]">
        <BentoCard cols={2} className="flex flex-col items-center gap-6">
          <ConditionIcon
            className="w-full aspect-square"
            condition={forecast.current.condition.code + ""}
            is_day={forecast.current.is_day === 1 ? true : false}
          ></ConditionIcon>
          <span className="text-4xl text-white">
            {forecast.current.temp_c} <sup>º</sup>C
          </span>
        </BentoCard>
        <BentoCard cols={4} className="flex flex-col items-center gap-6">
          <div className="forecast w-full h-full overflow-x-scroll">
            <div className="w-[300%] h-full">
              <ConditionsArray
                className="w-full h-1/5 flex flex-row justify-between pl-7 pr-2"
                conditions={hourlyConditions}
              ></ConditionsArray>
              <ReactECharts
                option={hourlyChart}
                style={{ width: "100%", height: "80%" }}
              ></ReactECharts>
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
