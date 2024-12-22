import React from 'react';
import { Trash2, CheckSquare, Square } from 'lucide-react';

interface ImageBulkActionsProps {
  selectedCount: number;
  totalCount: number;
  onSelectAll: () => void;
  onClearSelection: () => void;
  onDelete: () => void;
}

export function ImageBulkActions({
  selectedCount,
  totalCount,
  onSelectAll,
  onClearSelection,
  onDelete,
}: ImageBulkActionsProps) {
  const isAllSelected = selectedCount === totalCount;

  return (
    <div className="flex items-center justify-between bg-indigo-50 px-4 py-3 rounded-lg">
      <div className="flex items-center gap-4">
        <button
          onClick={isAllSelected ? onClearSelection : onSelectAll}
          className="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          {isAllSelected ? (
            <>
              <CheckSquare className="h-4 w-4" />
              Deselect All
            </>
          ) : (
            <>
              <Square className="h-4 w-4" />
              Select All
            </>
          )}
        </button>
        <span className="text-sm text-indigo-700">
          {selectedCount} of {totalCount} selected
        </span>
      </div>

      <button
        onClick={onDelete}
        className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-500"
      >
        <Trash2 className="h-4 w-4" />
        Delete Selected
      </button>
    </div>
  );
}