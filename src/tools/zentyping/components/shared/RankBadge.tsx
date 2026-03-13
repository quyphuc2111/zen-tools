import { Crown } from 'lucide-react';
import { cn } from '../../../../lib/utils';
import { rankVisuals } from '../../core/scoring';
import { RankTitle } from '../../types/game';

interface RankBadgeProps {
  rank: RankTitle;
}

export function RankBadge({ rank }: RankBadgeProps) {
  const visuals = rankVisuals(rank);

  return (
    <div className={cn('inline-flex items-center gap-2 rounded-md border border-[#48484A] bg-[#2C2C2E] px-4 py-2 text-sm font-semibold', visuals.colorClass)}>
      <Crown className="h-4 w-4 text-[#D1D1D6]" />
      {rank}
    </div>
  );
}
