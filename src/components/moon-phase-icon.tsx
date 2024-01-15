import { MoonPhases } from "../../types/forecast.d";

interface Props {
  phase: MoonPhases;
  ilumination: number;
  className?: string;
}

export default function MoonPhaseIcon({
  phase,
  ilumination,
  className = "",
}: Props) {
  const formattedPhase = phase
    .replace("Moon", "")
    .replace(" ", "-")
    .toLowerCase();
  const phaseNum =
    phase === MoonPhases.WaxingCrescent
      ? clamp(Math.round((ilumination / 50) * 6), 1, 6)
      : phase === MoonPhases.WaxingGibbous
      ? clamp(Math.round(((ilumination - 50) / 50) * 6), 1, 6)
      : phase === MoonPhases.WaningGibbous
      ? clamp(Math.round(((ilumination - 50) / 50) * 6), 1, 6)
      : phase === MoonPhases.WaningCrescent
      ? clamp(Math.round((ilumination / 50) * 6), 1, 6)
      : "";
  const phaseImage = `${formattedPhase}-${phaseNum}.svg`;
  return (
    <img
      className={`fill-[#C2C7CC] ${className ?? ""}`}
      src={`/moon-phases/wi-moon-${phaseImage}`}
    ></img>
  );
}

function clamp(num: number, min: number, max: number) {
  return Math.min(Math.max(num, min), max);
}
