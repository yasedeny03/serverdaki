import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { PublicGallery } from './pages/PublicGallery';
import { Login } from './pages/Login';
import { AdminDashboard } from './pages/AdminDashboard';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AlbumDialogProvider } from './contexts/AlbumDialogContext';
import { AlbumView } from './pages/PublicGallery/components/AlbumView';
import { useAuthStore } from './store/auth';

export default function App() {
  const user = useAuthStore((state) => state.user);

  return (
    <BrowserRouter>
      <AlbumDialogProvider>
        <Routes>
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" replace />} />
          <Route path="/" element={<Layout />}>
            <Route index element={user ? <PublicGallery /> : <Navigate to="/login" replace />} />
            <Route path="album/:albumId" element={user ? <AlbumView /> : <Navigate to="/login" replace />} />
            <Route
              path="admin/*"
              element={
                <ProtectedRoute allowedRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </AlbumDialogProvider>
    </BrowserRouter>
  );
}