import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { UserList } from './UserList';
import { UserDialog } from './UserDialog';
import { useUsersStore } from '../../../../store/users';
import type { User } from '../../../../types/user';

export function UserManager() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | undefined>();
  const { addUser, updateUser } = useUsersStore();

  const handleSubmit = (data: any) => {
    try {
      if (editingUser) {
        updateUser(editingUser.id, data);
      } else {
        addUser(data);
      }
      handleClose();
    } catch (error) {
      // Handle unique password error
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const handleClose = () => {
    setIsDialogOpen(false);
    setEditingUser(undefined);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Customers</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage customer access and permissions
          </p>
        </div>
        <button
          onClick={() => setIsDialogOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <UserPlus className="h-5 w-5" />
          New Customer
        </button>
      </div>

      <UserList onEdit={handleEdit} />

      <UserDialog
        isOpen={isDialogOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
        initialData={editingUser}
      />
    </div>
  );
}