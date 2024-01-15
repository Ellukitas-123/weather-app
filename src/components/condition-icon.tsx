import SunnyIcon from "@/components/icons/conditions/sunny";
import NightIcon from "@/components/icons/conditions/night";
import { conditions } from "@/hooks/conditions";
import DayLightRain from "@/components/icons/conditions/day-light-rain";
import NightLightRain from "@/components/icons/conditions/night-light-rain";
import DayModerateRainIcon from "@/components/icons/conditions/day-moderate-rain";
import NightModerateRainIcon from "@/components/icons/conditions/night-moderate-rain";
import DayCloudyIcon from "@/components/icons/conditions/day-cloudy";
import NightCloudyIcon from "@/components/icons/conditions/night-cloudy";
import VeryCloudyIcon from "@/components/icons/conditions/very-cloudy";

interface Props {
  condition: string;
  is_day: boolean;
  className?: string;
}

export default function ConditionIcon({
  condition,
  is_day,
  className = "",
}: Props) {
  if (condition === "1000") {
    // Clear
    return is_day ? (
      <SunnyIcon className={className}></SunnyIcon>
    ) : (
      <NightIcon className={className}></NightIcon>
    );
  } else if (condition === "1003") {
    // Partly cloudy
    return is_day ? (
      <DayCloudyIcon className={className}></DayCloudyIcon>
    ) : (
      <NightCloudyIcon className={className}></NightCloudyIcon>
    );
  } else if (condition === "1006") {
    // Cloudy
    return <VeryCloudyIcon className={className}></VeryCloudyIcon>;
  } else if (condition === "1183") {
    // Light rain
    return is_day ? (
      <DayLightRain className={className}></DayLightRain>
    ) : (
      <NightLightRain className={className}></NightLightRain>
    );
  } else if (condition === "1189") {
    // Moderate rain
    return is_day ? (
      <DayModerateRainIcon className={className}></DayModerateRainIcon>
    ) : (
      <NightModerateRainIcon className={className}></NightModerateRainIcon>
    );
  }

  return is_day ? (
    <SunnyIcon className={className}></SunnyIcon>
  ) : (
    <NightIcon className={className}></NightIcon>
  );
}
