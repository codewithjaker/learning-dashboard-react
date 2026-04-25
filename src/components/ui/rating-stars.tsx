import { Star } from 'lucide-react';
import { cn } from '../../lib/utils';

interface RatingStarsProps {
  value: number;
  onChange: (value: number) => void;
  allowHalf?: boolean;
  size?: number;
}

export function RatingStars({ value, onChange, allowHalf = true, size = 24 }: RatingStarsProps) {
  const handleClick = (rating: number) => {
    onChange(rating);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    if (!allowHalf) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const isHalf = x < rect.width / 2;
    const newRating = index + (isHalf ? 0.5 : 1);
    onChange(newRating);
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const isFull = value >= star;
        const isHalf = !isFull && value >= star - 0.5;
        return (
          <div
            key={star}
            className="relative cursor-pointer"
            onClick={() => handleClick(star)}
            onMouseMove={(e) => handleMouseMove(e, star - 1)}
          >
            <Star
              size={size}
              className={cn(
                'transition-colors',
                isFull
                  ? 'fill-yellow-500 text-yellow-500'
                  : isHalf
                  ? 'fill-yellow-500 text-yellow-500 opacity-50'
                  : 'text-muted-foreground'
              )}
            />
          </div>
        );
      })}
      <span className="ml-2 text-sm text-muted-foreground">
        {value.toFixed(1)} / 5
      </span>
    </div>
  );
}