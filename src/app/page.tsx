"use client";
// TODO: Server side rendering (if doubts use Github copilot ;) )
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
import MoonPhaseIcon from "@/components/moon-phase-icon";
import AstroEvents from "@/components/astro-events";
import { getHourNatural } from "@/utils/time.util";
import DoubleSelector from "@/components/inputs/double-selector";

export default function Home() {
  const [location, setLocation] = useState("Vitoria-Gasteiz");
  const [degrees, setDegrees] = useState("c");
  const [metric, setMetric] = useState("km");
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
      <div className="options w-3/4 flex flex-row gap-4 justify-start">
        <DoubleSelector
          options={[
            { label: "ºC", value: "c" },
            { label: "ºF", value: "f" },
          ]}
          onChange={(value: string) => {
            setDegrees(value);
          }}
        ></DoubleSelector>
        <DoubleSelector
          options={[
            { label: "Km", value: "km" },
            { label: "M", value: "m" },
          ]}
          onChange={(value: string) => {
            setMetric(value);
          }}
        ></DoubleSelector>
      </div>
      <Bento cols={6} rows={3} className="w-3/4 h-[900px]">
        <BentoCard cols={2} className="flex flex-col items-center gap-6">
          <ConditionIcon
            className="w-full aspect-square"
            condition={forecast.current.condition.code + ""}
            is_day={forecast.current.is_day === 1 ? true : false}
          ></ConditionIcon>
          <span className="text-4xl text-white">
            {degrees === "f"
              ? forecast.current.temp_f
              : forecast.current.temp_c}{" "}
            <sup>º</sup>
            {degrees === "f" ? "F" : "C"}
          </span>
        </BentoCard>
        <BentoCard cols={4} className="flex flex-col items-center gap-6">
          <div className="forecast w-full h-full overflow-x-scroll">
            <div className="w-[1750px] h-full">
              <ConditionsArray
                className="w-full h-1/5 flex flex-row justify-between pl-7 pr-4"
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
        <BentoCard
          cols={2}
          className="flex flex-col items-center justify-between gap-2"
        >
          <MoonPhaseIcon
            className="basis-0 shrink grow min-h-0"
            phase={forecast.forecast.forecastday[0].astro.moon_phase}
            ilumination={
              forecast.forecast.forecastday[0].astro.moon_illumination
            }
          ></MoonPhaseIcon>
          <span className="text-lg text-white">
            Iluminación:{" "}
            {forecast.forecast.forecastday[0].astro.moon_illumination}%
          </span>
        </BentoCard>
        <BentoCard
          cols={4}
          className="flex flex-col justify-center items-center gap-6"
        >
          <AstroEvents
            className="w-full"
            sunrise={
              new Date(
                forecast.forecast.forecastday[0].date +
                  "T" +
                  getHourNatural(forecast.forecast.forecastday[0].astro.sunrise)
              )
            }
            sunset={
              new Date(
                forecast.forecast.forecastday[0].date +
                  "T" +
                  getHourNatural(forecast.forecast.forecastday[0].astro.sunset)
              )
            }
            moonrise={
              new Date(
                forecast.forecast.forecastday[0].date +
                  "T" +
                  getHourNatural(
                    forecast.forecast.forecastday[0].astro.moonrise
                  )
              )
            }
            moonset={
              new Date(
                forecast.forecast.forecastday[1].date +
                  "T" +
                  getHourNatural(forecast.forecast.forecastday[1].astro.moonset)
              )
            }
          ></AstroEvents>
        </BentoCard>
      </Bento>
    </main>
  );
}
