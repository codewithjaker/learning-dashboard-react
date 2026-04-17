import { Input } from '../ui/input';
import { SearchBar } from '../common/SearchBar';
import { Button } from '../ui/button';
import { X } from 'lucide-react';
import { DataTableFacetedFilter } from './DataTableFacetedFilter';

interface DataTableToolbarProps {
  table?: any; // Optional for flexibility
  onSearch?: (search: string) => void;
  searchPlaceholder?: string;
  filters?: Array<{
    id: string;
    label: string;
    options: Array<{ label: string; value: string }>;
    value: string;
    onChange: (value: string) => void;
  }>;
}

export function DataTableToolbar({
  onSearch,
  searchPlaceholder = 'Search...',
  filters = [],
}: DataTableToolbarProps) {
  const isFiltered = filters.some((filter) => filter.value && filter.value !== '');

  return (
    <div className="flex flex-1 items-center space-x-2">
      {onSearch && (
        <SearchBar
          value=""
          onChange={onSearch}
          placeholder={searchPlaceholder}
          delay={300}
        />
      )}
      {filters.map((filter) => (
        <DataTableFacetedFilter
          key={filter.id}
          title={filter.label}
          options={filter.options}
          value={filter.value}
          onChange={filter.onChange}
        />
      ))}
      {isFiltered && (
        <Button
          variant="ghost"
          onClick={() => {
            filters.forEach((filter) => filter.onChange(''));
            if (onSearch) onSearch('');
          }}
          className="h-8 px-2 lg:px-3"
        >
          Reset
          <X className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
}