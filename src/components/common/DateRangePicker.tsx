import { useState } from 'react';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { CalendarIcon } from 'lucide-react';
import { formatDate } from '../../lib/utils';

interface DateRangePickerProps {
  onChange: (range: { startDate?: string; endDate?: string }) => void;
}

export function DateRangePicker({ onChange }: DateRangePickerProps) {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const handleApply = () => {
    onChange({
      startDate: startDate?.toISOString().split('T')[0],
      endDate: endDate?.toISOString().split('T')[0],
    });
  };

  const handleReset = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    onChange({});
  };

  return (
    <div className="flex gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="justify-start text-left font-normal w-auto">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {startDate ? formatDate(startDate.toISOString()) : 'Start Date'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar mode="single" selected={startDate} onSelect={setStartDate} />
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="justify-start text-left font-normal w-auto">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {endDate ? formatDate(endDate.toISOString()) : 'End Date'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar mode="single" selected={endDate} onSelect={setEndDate} />
        </PopoverContent>
      </Popover>
      <Button onClick={handleApply} size="sm">Apply</Button>
      <Button onClick={handleReset} variant="ghost" size="sm">Reset</Button>
    </div>
  );
}