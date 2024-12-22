import React from 'react';
import { useGalleryStore } from '../../../../store/gallery';
import { SettingSection } from './SettingSection';
import { GridOption } from './GridOption';

export function DisplaySettings() {
  const { gridColumns, setGridColumns, sortBy, setSortBy } = useGalleryStore();

  return (
    <SettingSection
      title="Display Settings"
      description="Customize how images are displayed in the gallery"
    >
      <div className="space-y-6">
        <div>
          <label className="text-sm font-medium text-gray-700">Default Grid Layout</label>
          <div className="mt-2 flex gap-3">
            {[2, 3, 4].map((cols) => (
              <GridOption
                key={cols}
                columns={cols}
                selected={gridColumns === cols}
                onClick={() => setGridColumns(cols as 2 | 3 | 4)}
              />
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Default Sort Order</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'name' | 'custom')}
            className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="date">Date Added</option>
            <option value="name">Name</option>
            <option value="custom">Custom Order</option>
          </select>
        </div>
      </div>
    </SettingSection>
  );
}