import { type LucideIcon } from 'lucide-react';
import StepProgress from './StepProgress';

interface DataItem {
  label: string;
  value: string;
}

interface OperationCardProps {
  icon?: LucideIcon;
  title: string;
  data?: DataItem[];
  step: number;
  totalSteps: number;
}

const OperationCard = ({ icon: Icon, title, data, step, totalSteps }: OperationCardProps) => {
  return (
    <div className="w-full border-2 border-border rounded-xl p-4 shadow-sm space-y-3">
      <div className="flex items-center gap-2.5">
        {Icon && <Icon className="w-5 h-5 text-foreground shrink-0" />}
        <h2 className="text-sm font-bold uppercase tracking-wide text-foreground">{title}</h2>
      </div>

      {data && data.length > 0 && (
        <div className="space-y-1">
          {data.map((item, i) => (
            <p key={i} className="text-sm text-foreground">
              <span className="text-muted-foreground">{item.label}:</span>{' '}
              <span className="font-mono font-bold">{item.value}</span>
            </p>
          ))}
        </div>
      )}

      <StepProgress current={step} total={totalSteps} />
    </div>
  );
};

export default OperationCard;
