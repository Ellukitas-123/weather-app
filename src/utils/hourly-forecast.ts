import { EChartOption } from "echarts";
import { Forecastday } from "../../types/forecast";

export function getHourlyForecastChart(forecast: Forecastday[]) {
  const chart: EChartOption<EChartOption.Series> = {
    xAxis: {
      type: "category",
      data: [],
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
      min: "auto",
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
          color: "#C2C7CC",
        },
        itemStyle: {
          color: "#C2C7CC",
        },
        label: {
          show: true,
          position: "top",
          color: "#ffffff",
          textBorderColor: "#D2D7DD",
          textBorderWidth: 1,
          fontSize: 16,
          distance: 12,
          formatter: function (d: any) {
            return d.data + " ºC";
          },
        },
        data: [],
      },
    ],
    grid: {
      top: "32px",
      bottom: 0,
      left: 0,
      right: 0,
      containLabel: true,
    },
  };

  const hoursArr = dayHoursArray();

  const labels = hoursArr.hours.map((hour) => {
    return hour.toString().padStart(2, "0") + ":00";
  });
  const data = hoursArr.hours.map((hour, i) => {
    if (i > hoursArr.thisDayHours - 1) {
      // Next day forecast
      return forecast[1].hour[hour].temp_c;
    }

    // Current day forecast
    return forecast[0].hour[hour].temp_c;
  });

  (chart.xAxis as EChartOption.XAxis).data = labels;
  (chart.series as EChartOption.Series[])[0].data = data;

  return chart;
}
export function getHourlyConditions(forecast: Forecastday[]) {
  const hoursArr = dayHoursArray();
  const todayStart = new Date(forecast[0].date).setHours(hoursArr.hours[0]);
  const todayEnd = new Date(forecast[0].date).setHours(23);
  const tomorrowStart = new Date(forecast[1].date).setHours(0);
  const tomorrowEnd = new Date(forecast[1].date).setHours(
    hoursArr.hours[hoursArr.hours.length - 1]
  );

  const data = hoursArr.hours.map((hour, i) => {
    if (i > hoursArr.thisDayHours - 1) {
      const thisDate = new Date(forecast[1].hour[hour].time_epoch * 1000);

      const thisDaySunriseDate = new Date(
        forecast[1].date + "T" + getHour(forecast[1].astro.sunrise)
      );
      const thisDaySunsetDate = new Date(
        forecast[1].date + "T" + getHour(forecast[1].astro.sunset)
      );

      // Next day forecast
      return {
        date: new Date(forecast[1].hour[hour].time_epoch * 1000),
        condition: forecast[1].hour[hour].condition.code + "",
        is_day: thisDate > thisDaySunriseDate && thisDate < thisDaySunsetDate,
      };
    }
    const thisDate = new Date(forecast[0].hour[hour].time_epoch * 1000);

    const thisDaySunriseDate = new Date(
      forecast[0].date + "T" + getHour(forecast[0].astro.sunrise)
    );
    const thisDaySunsetDate = new Date(
      forecast[0].date + "T" + getHour(forecast[0].astro.sunset)
    );

    // Current day forecast
    return {
      date: new Date(forecast[0].hour[hour].time_epoch * 1000),
      condition: forecast[0].hour[hour].condition.code + "",
      is_day: thisDate > thisDaySunriseDate && thisDate < thisDaySunsetDate,
    };
  });

  return data;
}

function dayHoursArray() {
  const hourStart = new Date().getHours();
  const thisDayHours = 24 - hourStart;

  const hours = Array.from({ length: 24 }, (v, i) => {
    // Add hours from today
    if (i < thisDayHours) {
      return i + hourStart;
    }

    // Start from 0 to the rest of hours
    return i - thisDayHours;
  });

  return {
    start: hourStart,
    thisDayHours,
    hours,
  };
}

function getHour(time: string) {
  if (time.includes("AM")) {
    return time.replace(" AM", ":00");
  }
  const timeStr = time.replace(" PM", ":00");
  const timeArr = timeStr.split(":");
  timeArr[0] = (Number.parseInt(timeArr[0]) + 12).toString().padStart(2, "0");
  return timeArr.join(":");
}
