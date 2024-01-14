import React from "react";

interface Props {
  cols: number;
  rows: number;
  className?: string;
  children?: React.ReactNode;
}

export default function Bento({ cols, rows, className, children }: Props) {
  return (
    <div
      className={"bento grid gap-4 " + className ?? ""}
      style={{
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
      }}
    >
      {children}
    </div>
  );
}
