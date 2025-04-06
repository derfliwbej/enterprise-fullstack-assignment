import { ReactNode } from 'react';
import Typography from './typography';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';

type SummaryCardProps<T> = {
  metric: string;
  value: T;
  footer?: ReactNode;
};

const SummaryCard = <T extends ReactNode>({
  metric,
  value,
  footer,
}: SummaryCardProps<T>) => {
  return (
    <Card className="w-full p-4 bg-muted min-h-28 flex flex-col gap-1">
      <CardHeader className="p-0 text-muted-foreground font-semibold">
        {metric}
      </CardHeader>
      <CardContent className="p-0">
        <Typography.H3>{value}</Typography.H3>
      </CardContent>
      <CardFooter className="p-0 text-muted-foreground text-xs">
        {footer}
      </CardFooter>
    </Card>
  );
};

export default SummaryCard;
