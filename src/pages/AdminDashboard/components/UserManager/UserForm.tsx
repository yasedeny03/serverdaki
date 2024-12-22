import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '../../../../lib/utils';
import { AlbumAccessSelect } from './AlbumAccessSelect';
import type { User } from '../../../../types/user';

const userSchema = z.object({
  displayName: z.string().min(1, 'Customer name is required'),
  password: z.string().min(1, 'Password is required'),
  role: z.enum(['admin', 'user']),
  albumAccess: z.array(z.string()),
});

type UserFormData = z.infer<typeof userSchema>;

interface UserFormProps {
  onSubmit: (data: UserFormData) => void;
  initialData?: User;
}

export function UserForm({ onSubmit, initialData }: UserFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, control } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: initialData || {
      role: 'user',
      albumAccess: [],
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Customer Name (Reference Only)
        </label>
        <input
          type="text"
          {...register('displayName')}
          className={cn(
            "mt-1 block w-full rounded-md shadow-sm sm:text-sm",
            "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500",
            errors.displayName && "border-red-300"
          )}
        />
        {errors.displayName && (
          <p className="mt-1 text-sm text-red-600">{errors.displayName.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="relative mt-1">
          <input
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
            className={cn(
              "block w-full rounded-md shadow-sm sm:text-sm pr-10",
              "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500",
              errors.password && "border-red-300"
            )}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 px-3 flex items-center"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-gray-400" />
            ) : (
              <Eye className="h-4 w-4 text-gray-400" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Role
        </label>
        <select
          {...register('role')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <AlbumAccessSelect control={control} name="albumAccess" />

      <div className="mt-6 flex justify-end gap-3">
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
        >
          {initialData ? 'Update Customer' : 'Add Customer'}
        </button>
      </div>
    </form>
  );
}