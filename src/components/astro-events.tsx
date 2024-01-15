import SunriseIcon from "@/components/icons/astro-events/sunrise";
import SunsetIcon from "@/components/icons/astro-events/sunset";
import { LegacyRef, useEffect, useRef } from "react";

interface Props {
  className?: string;
  sunrise: Date;
  sunset: Date;
  moonrise: Date;
  moonset: Date;
}

export default function AstroEvents({
  sunrise,
  sunset,
  moonrise,
  moonset,
  className = "",
}: Props) {
  const pathContainer = useRef<SVGElement>();
  const path = useRef<SVGPathElement>();
  const sun = useRef<SVGPathElement>();

  const position = () => {
    if (
      sun.current === undefined ||
      path.current === undefined ||
      pathContainer.current === undefined
    )
      return;

    const now = new Date();

    if (now < sunrise || now > sunset) {
      sun.current.style.visibility = "hidden";
      return;
    }

    // Calculate progress and position
    const totalTime = sunset.getTime() - sunrise.getTime();
    const currentTime = now.getTime() - sunrise.getTime();
    const percent = currentTime / totalTime;
    const offset = percent * path.current?.getTotalLength();
    const point = path.current?.getPointAtLength(offset);

    // Set it in %
    const viewBox = pathContainer.current.getAttribute("viewBox")?.split(" ");
    const width = viewBox ? parseFloat(viewBox[2]) : 0;
    const height = viewBox ? parseFloat(viewBox[3]) : 0;

    const relativeX = 100 - (point.x / width) * 100;
    const relativeY = (point.y / height) * 100;

    // Set position
    sun.current.style.visibility = "visible";
    sun.current.style.left = `${relativeX}%`;
    sun.current.style.top = `${relativeY}%`;
  };

  useEffect(() => {
    setInterval(() => position(), 1000);
  }, [sunrise, sunset]);

  return (
    <div className={className}>
      <div className="graphic relative w-full h-full">
        <svg
          className="w-full"
          ref={pathContainer}
          version="1.1"
          viewBox="0 0 270.93 67.733"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            ref={path}
            id="astro-events-path"
            d="m270.93 67.733c-19.684-39.757-74.204-66.504-135.47-66.508-61.148 0.094829-115.6 26.825-135.24 66.508"
            fillOpacity="0"
            stroke="#D2D7DC"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.3229"
            strokeOpacity={0.5}
          />
        </svg>
        <svg
          ref={sun}
          className="absolute size-16 -translate-x-1/2 -translate-y-1/2"
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 30 30"
          xmlSpace="preserve"
        >
          <path
            fill="yellow"
            d="M4.37,14.62c0-0.24,0.08-0.45,0.25-0.62c0.17-0.16,0.38-0.24,0.6-0.24h2.04c0.23,0,0.42,0.08,0.58,0.25
	c0.15,0.17,0.23,0.37,0.23,0.61S8,15.06,7.85,15.23c-0.15,0.17-0.35,0.25-0.58,0.25H5.23c-0.23,0-0.43-0.08-0.6-0.25
	C4.46,15.06,4.37,14.86,4.37,14.62z M7.23,21.55c0-0.23,0.08-0.43,0.23-0.61l1.47-1.43c0.15-0.16,0.35-0.23,0.59-0.23
	c0.24,0,0.44,0.08,0.6,0.23s0.24,0.34,0.24,0.57c0,0.24-0.08,0.46-0.24,0.64L8.7,22.14c-0.41,0.32-0.82,0.32-1.23,0
	C7.31,21.98,7.23,21.78,7.23,21.55z M7.23,7.71c0-0.23,0.08-0.43,0.23-0.61C7.66,6.93,7.87,6.85,8.1,6.85
	c0.22,0,0.42,0.08,0.59,0.24l1.43,1.47c0.16,0.15,0.24,0.35,0.24,0.59c0,0.24-0.08,0.44-0.24,0.6s-0.36,0.24-0.6,0.24
	c-0.24,0-0.44-0.08-0.59-0.24L7.47,8.32C7.31,8.16,7.23,7.95,7.23,7.71z M9.78,14.62c0-0.93,0.23-1.8,0.7-2.6s1.1-1.44,1.91-1.91
	s1.67-0.7,2.6-0.7c0.7,0,1.37,0.14,2.02,0.42c0.64,0.28,1.2,0.65,1.66,1.12c0.47,0.47,0.84,1.02,1.11,1.66
	c0.27,0.64,0.41,1.32,0.41,2.02c0,0.94-0.23,1.81-0.7,2.61c-0.47,0.8-1.1,1.43-1.9,1.9c-0.8,0.47-1.67,0.7-2.61,0.7
	s-1.81-0.23-2.61-0.7c-0.8-0.47-1.43-1.1-1.9-1.9C10.02,16.43,9.78,15.56,9.78,14.62z M11.48,14.62c0,0.98,0.34,1.81,1.03,2.5
	c0.68,0.69,1.51,1.04,2.49,1.04s1.81-0.35,2.5-1.04s1.04-1.52,1.04-2.5c0-0.96-0.35-1.78-1.04-2.47c-0.69-0.68-1.52-1.02-2.5-1.02
	c-0.97,0-1.8,0.34-2.48,1.02C11.82,12.84,11.48,13.66,11.48,14.62z M14.14,22.4c0-0.24,0.08-0.44,0.25-0.6s0.37-0.24,0.6-0.24
	c0.24,0,0.45,0.08,0.61,0.24s0.24,0.36,0.24,0.6v1.99c0,0.24-0.08,0.45-0.25,0.62c-0.17,0.17-0.37,0.25-0.6,0.25
	s-0.44-0.08-0.6-0.25c-0.17-0.17-0.25-0.38-0.25-0.62V22.4z M14.14,6.9V4.86c0-0.23,0.08-0.43,0.25-0.6C14.56,4.09,14.76,4,15,4
	s0.43,0.08,0.6,0.25c0.17,0.17,0.25,0.37,0.25,0.6V6.9c0,0.23-0.08,0.42-0.25,0.58S15.23,7.71,15,7.71s-0.44-0.08-0.6-0.23
	S14.14,7.13,14.14,6.9z M19.66,20.08c0-0.23,0.08-0.42,0.23-0.56c0.15-0.16,0.34-0.23,0.56-0.23c0.24,0,0.44,0.08,0.6,0.23
	l1.46,1.43c0.16,0.17,0.24,0.38,0.24,0.61c0,0.23-0.08,0.43-0.24,0.59c-0.4,0.31-0.8,0.31-1.2,0l-1.42-1.42
	C19.74,20.55,19.66,20.34,19.66,20.08z M19.66,9.16c0-0.25,0.08-0.45,0.23-0.59l1.42-1.47c0.17-0.16,0.37-0.24,0.59-0.24
	c0.24,0,0.44,0.08,0.6,0.25c0.17,0.17,0.25,0.37,0.25,0.6c0,0.25-0.08,0.46-0.24,0.62l-1.46,1.43c-0.18,0.16-0.38,0.24-0.6,0.24
	c-0.23,0-0.41-0.08-0.56-0.24S19.66,9.4,19.66,9.16z M21.92,14.62c0-0.24,0.08-0.44,0.24-0.62c0.16-0.16,0.35-0.24,0.57-0.24h2.02
	c0.23,0,0.43,0.09,0.6,0.26c0.17,0.17,0.26,0.37,0.26,0.6s-0.09,0.43-0.26,0.6c-0.17,0.17-0.37,0.25-0.6,0.25h-2.02
	c-0.23,0-0.43-0.08-0.58-0.25S21.92,14.86,21.92,14.62z"
          />
        </svg>
      </div>
      <div className="times flex flex-row justify-between">
        <div className="start">
          <span className="flex flex-row items-center gap-2 text-lg">
            <SunriseIcon className="size-10"></SunriseIcon>
            {sunrise.getHours().toString().padStart(2, "0") +
              ":" +
              sunrise.getMinutes().toString().padStart(2, "0")}
          </span>
        </div>
        <div className="end">
          <span className="flex flex-row items-center gap-2 text-lg">
            {sunset.getHours().toString().padStart(2, "0") +
              ":" +
              sunset.getMinutes().toString().padStart(2, "0")}
            <SunsetIcon className="size-10"></SunsetIcon>
          </span>
        </div>
      </div>
    </div>
  );
}
