import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';
import { useSettingsStore } from '../../../../store/settings';
import { SettingSection } from './SettingSection';

export function LogoSettings() {
  const { logoUrl, setLogoUrl } = useSettingsStore();

  const handleLogoChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, you would upload this to a server
      // For now, we'll use a URL.createObjectURL as a placeholder
      const url = URL.createObjectURL(file);
      setLogoUrl(url);
    }
  }, [setLogoUrl]);

  return (
    <SettingSection
      title="Logo Settings"
      description="Update the website logo"
    >
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="w-24 h-24 border rounded-lg overflow-hidden bg-white">
            <img
              src={logoUrl}
              alt="Current logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <label
              htmlFor="logo-upload"
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
            >
              <Upload className="h-5 w-5" />
              Change Logo
            </label>
            <input
              id="logo-upload"
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              className="hidden"
            />
          </div>
        </div>
        <p className="text-sm text-gray-500">
          Recommended size: 200x200 pixels. Maximum file size: 2MB.
        </p>
      </div>
    </SettingSection>
  );
}