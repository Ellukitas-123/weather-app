interface Props {
  title?: string;
  cols: number;
  className: string;
  children?: React.ReactNode;
}

export default function BentoCard({ title, cols, className, children }: Props) {
  return (
    <div
      className={"p-6 rounded-xl bg-slate-100/20 shadow-lg " + className ?? ""}
      style={{
        gridColumn: `span ${cols} / span ${cols}`,
      }}
    >
      {children}
    </div>
  );
}
