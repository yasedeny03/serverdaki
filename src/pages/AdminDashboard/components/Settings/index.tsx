import React from 'react';
import { DisplaySettings } from './DisplaySettings';
import { AccountSettings } from './AccountSettings';
import { LogoSettings } from './LogoSettings';

export function Settings() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      <div className="grid gap-8">
        <LogoSettings />
        <DisplaySettings />
        <AccountSettings />
      </div>
    </div>
  );
}