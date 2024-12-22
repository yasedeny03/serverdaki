import React from 'react';
import { Grid, Grid3x3, LayoutGrid, Calendar, AlignLeft, Move } from 'lucide-react';
import { useGalleryStore } from '../../../store/gallery';
import { cn } from '../../../lib/utils';

export function ViewOptions() {
  const { gridColumns, sortBy, setGridColumns, setSortBy } = useGalleryStore();

  return (
    <div className="flex gap-2">
      <div className="flex rounded-md shadow-sm">
        {[
          { columns: 2, icon: Grid },
          { columns: 3, icon: Grid3x3 },
          { columns: 4, icon: LayoutGrid },
        ].map(({ columns, icon: Icon }) => (
          <button
            key={columns}
            onClick={() => setGridColumns(columns as 2 | 3 | 4)}
            className={cn(
              'px-3 py-2 text-sm font-medium border',
              columns === gridColumns
                ? 'bg-indigo-50 text-indigo-600 border-indigo-200'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50',
              columns === 2 && 'rounded-l-md',
              columns === 4 && 'rounded-r-md'
            )}
          >
            <Icon className="h-5 w-5" />
          </button>
        ))}
      </div>
      <div className="flex rounded-md shadow-sm">
        {[
          { value: 'date', icon: Calendar, label: 'Date' },
          { value: 'name', icon: AlignLeft, label: 'Name' },
          { value: 'custom', icon: Move, label: 'Custom' },
        ].map(({ value, icon: Icon, label }) => (
          <button
            key={value}
            onClick={() => setSortBy(value as 'date' | 'name' | 'custom')}
            className={cn(
              'px-3 py-2 text-sm font-medium border',
              value === sortBy
                ? 'bg-indigo-50 text-indigo-600 border-indigo-200'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50',
              value === 'date' && 'rounded-l-md',
              value === 'custom' && 'rounded-r-md'
            )}
          >
            <Icon className="h-5 w-5" />
          </button>
        ))}
      </div>
    </div>
  );
}