import SunnyIcon from "@/components/conditions/sunny";
import NightIcon from "@/components/conditions/night";
import { conditions } from "@/hooks/conditions";

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
    if (is_day) {
      return <SunnyIcon></SunnyIcon>;
    }
    return <NightIcon></NightIcon>;
  }

  return is_day
    ? conditions[condition as keyof typeof conditions].day
    : conditions[condition as keyof typeof conditions].night;
}
