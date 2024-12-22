import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminNav } from './components/AdminNav';
import { AlbumManager } from './components/AlbumManager';
import { UserManager } from './components/UserManager';
import { Settings } from './components/Settings';

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      <AdminNav />
      <Routes>
        <Route index element={<Navigate to="/admin/albums" replace />} />
        <Route path="albums/*" element={<AlbumManager />} />
        <Route path="users" element={<UserManager />} />
        <Route path="settings" element={<Settings />} />
      </Routes>
    </div>
  );
}