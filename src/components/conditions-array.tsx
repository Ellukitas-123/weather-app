import ConditionIcon from "@/components/condition-icon";

interface Props {
  className?: string;
  conditions: {
    date: Date;
    condition: string;
    is_day: boolean;
  }[];
}

export default function ConditionsArray({ className, conditions }: Props) {
  return (
    <div className={className}>
      {conditions.map((condition) => {
        console.log(condition.date);
        return (
          <ConditionIcon
            key={condition.date.toUTCString()}
            className="h-full"
            condition={condition.condition}
            is_day={condition.is_day}
          ></ConditionIcon>
        );
      })}
    </div>
  );
}
