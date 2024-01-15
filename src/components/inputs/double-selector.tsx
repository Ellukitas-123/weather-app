import { useState } from "react";

interface Props {
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
}

export default function DoubleSelector({ options, onChange }: Props) {
  const [value, setValue] = useState(0);

  const change = () => {
    const val = value === 0 ? 1 : 0;
    setValue(val);
    onChange(options[val].value);
  };

  return (
    <div
      className="relative flex flex-row items-center gap-3 p-1 rounded-lg bg-slate-100/20 cursor-pointer"
      onClick={change}
    >
      <div
        className={`selector absolute ${
          value === 0 ? "left-1" : "right-1"
        } h-9 aspect-square bg-slate-100/30 rounded transition duration-1000`}
      ></div>
      <div className="roption-0 z-10 flex flex-row items-center justify-center size-9 p-1 text-xl text-center">
        <span>{options[0].label}</span>
      </div>
      <div className="option-1 z-10 flex flex-row items-center justify-center size-9 p-1 text-xl text-center">
        <span>{options[1].label}</span>
      </div>
    </div>
  );
}
