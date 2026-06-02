import { Progress } from '@/components/ui/progress';
import { useApp } from '@/context/AppContext';

interface StepProgressProps {
  current: number;
  total: number;
}

const StepProgress = ({ current, total }: StepProgressProps) => {
  const { t } = useApp();
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="w-full space-y-1.5">
      <Progress value={percentage} className="h-1.5 bg-muted" />
      <p className="text-xs font-medium text-muted-foreground">
        {t('common.step')} {current} / {total}
      </p>
    </div>
  );
};

export default StepProgress;
