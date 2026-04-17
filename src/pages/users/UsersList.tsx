import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { DataTable } from '../../components/data-table/DataTable';
import { columns } from './columns';
import { UserFormDialog } from './UserFormDialog';
import type { RootState } from '../../store';
import { fetchUsers, setQueryParams, createUser, updateUser, deleteUser } from '../../store/slices/userSlice';
import type { User, CreateUserRequest, UpdateUserRequest } from '../../types/user.types';
import { useToast } from '../../components/ui/use-toast';
import { ConfirmationDialog } from '../../components/common/ConfirmationDialog';

export default function UsersList() {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { users, total, isLoading, queryParams } = useSelector((state: RootState) => state.users);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const loadUsers = useCallback(() => {
    dispatch(fetchUsers(queryParams));
  }, [dispatch, queryParams]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handlePageChange = (page: number) => {
    dispatch(setQueryParams({ page }));
  };

  const handleLimitChange = (limit: number) => {
    dispatch(setQueryParams({ limit, page: 1 }));
  };

  const handleSearch = (search: string) => {
    dispatch(setQueryParams({ search, page: 1 }));
  };

  const handleRoleFilter = (role: string) => {
    dispatch(setQueryParams({ role, page: 1 }));
  };

  const handleSort = (sortBy: string, sortOrder: 'asc' | 'desc') => {
    dispatch(setQueryParams({ sortBy, sortOrder }));
  };

  const handleCreate = async (data: CreateUserRequest) => {
    try {
      await dispatch(createUser(data)).unwrap();
      //   toast({ title: 'Success', description: 'User created successfully' });
      setFormOpen(false);
    } catch (error: any) {
      //   toast({ title: 'Error', description: error, variant: 'destructive' });
    }
  };

  const handleUpdate = async (data: UpdateUserRequest) => {
    if (!selectedUser) return;
    try {
      await dispatch(updateUser({ id: selectedUser.id, data })).unwrap();
      //   toast({ title: 'Success', description: 'User updated successfully' });
      setFormOpen(false);
      setSelectedUser(null);
    } catch (error: any) {
      //   toast({ title: 'Error', description: error, variant: 'destructive' });
    }
  };

  const handleDelete = async () => {
    if (!userToDelete) return;
    try {
      await dispatch(deleteUser(userToDelete.id)).unwrap();
    //   toast({ title: 'Success', description: 'User deleted successfully' });
      setDeleteDialogOpen(false);
      setUserToDelete(null);
    } catch (error: any) {
    //   toast({ title: 'Error', description: error, variant: 'destructive' });
    }
  };

  const openCreateDialog = () => {
    setSelectedUser(null);
    setFormOpen(true);
  };

  const openEditDialog = (user: User) => {
    setSelectedUser(user);
    setFormOpen(true);
  };

  const openDeleteDialog = (user: User) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const openViewPage = (user: User) => {
    // Navigate to user details page
    window.location.href = `/users/${user.id}`;
  };

  const tableColumns = columns(openViewPage, openEditDialog, openDeleteDialog);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Users Management</h1>
        <Button onClick={openCreateDialog}>
          <Plus className="mr-2 h-4 w-4" /> Add User
        </Button>
      </div>

      <DataTable
        columns={tableColumns}
        data={users}
        total={total}
        page={queryParams.page || 1}
        limit={queryParams.limit || 10}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
        onSearch={handleSearch}
        onSort={handleSort}
        searchPlaceholder="Search by name or email..."
        filters={[
          {
            id: 'role',
            label: 'Role',
            options: [
              { label: 'All', value: '' },
              { label: 'Student', value: 'student' },
              { label: 'Instructor', value: 'instructor' },
              { label: 'Admin', value: 'admin' },
            ],
            value: queryParams.role || '',
            onChange: handleRoleFilter,
          },
        ]}
        isLoading={isLoading}
      />

      <UserFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        user={selectedUser}
        onSubmit={selectedUser ? handleUpdate : handleCreate}
        isLoading={isLoading}
      />

      <ConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete User"
        description={`Are you sure you want to delete user "${userToDelete?.fullName}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
      />
    </div>
  );
}