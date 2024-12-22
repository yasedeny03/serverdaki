import React from 'react';
import { Edit2, Trash2, Eye, EyeOff } from 'lucide-react';
import { User } from '../../../../types/user';
import { useUsersStore } from '../../../../store/users';
import { formatDate } from '../../../../lib/utils';
import { useState } from 'react';

interface UserRowProps {
  user: User;
  onEdit: (user: User) => void;
}

export function UserRow({ user, onEdit }: UserRowProps) {
  const deleteUser = useUsersStore((state) => state.deleteUser);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">
          {user.displayName}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">
            {showPassword ? user.password : '••••••'}
          </span>
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-400 hover:text-gray-600"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          {user.role}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {formatDate(user.createdAt)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex justify-end gap-2">
          <button
            onClick={() => onEdit(user)}
            className="text-indigo-600 hover:text-indigo-900"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => deleteUser(user.id)}
            className="text-red-600 hover:text-red-900"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}