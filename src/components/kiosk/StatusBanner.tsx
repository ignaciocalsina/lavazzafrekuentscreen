import { type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatusBannerProps {
  icon: LucideIcon;
  text: string;
  variant?: 'success' | 'primary';
}

const StatusBanner = ({ icon: Icon, text, variant = 'success' }: StatusBannerProps) => {
  return (
    <div
      className={cn(
        'w-full rounded-xl p-3 flex items-center gap-2.5',
        variant === 'success' && 'bg-success/10 text-success',
        variant === 'primary' && 'bg-primary/10 text-primary'
      )}
    >
      <Icon className="w-5 h-5 shrink-0" />
      <span className="font-bold text-sm">{text}</span>
    </div>
  );
};

export default StatusBanner;
