import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import { Settings, LogOut } from 'lucide-react';
import { useSettingsStore } from '../store/settings';
import { useGalleryStore } from '../store/gallery';

export function Layout() {
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const logoUrl = useSettingsStore((state) => state.logoUrl);
  const albums = useGalleryStore((state) => state.albums);

  const getBreadcrumbLabel = (path: string) => {
    if (path === 'album') return 'Album';
    if (path === 'admin') return 'Admin';
    
    const album = albums.find(a => a.id === path);
    if (album) return album.name;
    
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-20 flex items-center justify-between">
            <div className="w-20" /> {/* Spacer for visual balance */}
            <div className="flex-1 flex items-center justify-center">
              <Link to="/" className="flex items-center">
                <img
                  src={logoUrl}
                  alt="Logo"
                  className="h-16 w-auto"
                />
              </Link>
            </div>
            <div className="w-20 flex items-center justify-end">
              {user && (
                <div className="flex items-center gap-4">
                  {user.role === 'admin' && (
                    <Link
                      to="/admin"
                      className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-gray-600"
                    >
                      <Settings className="h-5 w-5" />
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-gray-600"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {location.pathname !== '/' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm">
            <ol className="list-none p-0 inline-flex">
              <li className="flex items-center">
                <Link to="/" className="text-gray-600 hover:text-gray-900">
                  Home
                </Link>
              </li>
              {location.pathname.split('/').filter(Boolean).map((path, index) => (
                <li key={path} className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <span className="capitalize text-gray-900">
                    {getBreadcrumbLabel(path)}
                  </span>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}