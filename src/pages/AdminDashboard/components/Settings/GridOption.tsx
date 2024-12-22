import React from 'react';
import { Grid, LayoutGrid, Grid3x3 } from 'lucide-react';
import { cn } from '../../../../lib/utils';

interface GridOptionProps {
  columns: number;
  selected: boolean;
  onClick: () => void;
}

export function GridOption({ columns, selected, onClick }: GridOptionProps) {
  const Icon = {
    2: Grid,
    3: Grid3x3,
    4: LayoutGrid,
  }[columns];

  return (
    <button
      onClick={onClick}
      className={cn(
        'p-2 rounded-md border',
        selected
          ? 'border-indigo-500 bg-indigo-50 text-indigo-600'
          : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
      )}
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}