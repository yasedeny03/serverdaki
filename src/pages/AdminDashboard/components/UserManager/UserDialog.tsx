import React from 'react';
import { X } from 'lucide-react';
import { UserForm } from './UserForm';
import type { User } from '../../../../types/user';

interface UserDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: User;
}

export function UserDialog({ isOpen, onClose, onSubmit, initialData }: UserDialogProps) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
            <div className="absolute right-4 top-4">
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                {initialData ? 'Edit Customer' : 'Add New Customer'}
              </h2>
            </div>

            <UserForm onSubmit={onSubmit} initialData={initialData} />
          </div>
        </div>
      </div>
    </>
  );
}