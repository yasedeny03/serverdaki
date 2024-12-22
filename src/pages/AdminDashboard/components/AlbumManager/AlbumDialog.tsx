import React from 'react';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '../../../../lib/utils';

const albumSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string(),
});

type AlbumForm = z.infer<typeof albumSchema>;

interface AlbumDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AlbumForm) => void;
  initialData?: { name: string; description: string };
}

export function AlbumDialog({ isOpen, onClose, onSubmit, initialData }: AlbumDialogProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<AlbumForm>({
    resolver: zodResolver(albumSchema),
    defaultValues: initialData,
  });

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      
      {/* Dialog */}
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
                {initialData ? 'Edit Album' : 'Create New Album'}
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                {initialData ? 'Update album details' : 'Add a new album to organize your images'}
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Album Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register('name')}
                  className={cn(
                    "mt-1 block w-full rounded-md shadow-sm sm:text-sm",
                    "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500",
                    errors.name && "border-red-300 focus:border-red-500 focus:ring-red-500"
                  )}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  {...register('description')}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {initialData ? 'Update Album' : 'Create Album'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}