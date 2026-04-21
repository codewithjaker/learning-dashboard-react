// import { useState, useEffect, useCallback } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Plus } from 'lucide-react';
// import { Button } from '../../components/ui/button';
// import { DataTable } from '../../components/data-table/DataTable';
// import { columns } from './columns';
// import { UserFormDialog } from './UserFormDialog';
// import type { RootState } from '../../store';
// import { fetchUsers, setQueryParams, createUser, updateUser, deleteUser } from '../../store/slices/userSlice';
// import type { User, CreateUserRequest, UpdateUserRequest } from '../../types/user.types';
// import { useToast } from '../../components/ui/use-toast';
// import { ConfirmationDialog } from '../../components/common/ConfirmationDialog';

// export default function UsersList() {
//   const dispatch = useDispatch();
//   const { toast } = useToast();
//   const { users, total, isLoading, queryParams } = useSelector((state: RootState) => state.users);
//   const [formOpen, setFormOpen] = useState(false);
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [userToDelete, setUserToDelete] = useState<User | null>(null);

//   const loadUsers = useCallback(() => {
//     dispatch(fetchUsers(queryParams));
//   }, [dispatch, queryParams]);

//   useEffect(() => {
//     loadUsers();
//   }, [loadUsers]);

//   const handlePageChange = (page: number) => {
//     dispatch(setQueryParams({ page }));
//   };

//   const handleLimitChange = (limit: number) => {
//     dispatch(setQueryParams({ limit, page: 1 }));
//   };

//   const handleSearch = (search: string) => {
//     dispatch(setQueryParams({ search, page: 1 }));
//   };

//   const handleRoleFilter = (role: string) => {
//     dispatch(setQueryParams({ role, page: 1 }));
//   };

//   const handleSort = (sortBy: string, sortOrder: 'asc' | 'desc') => {
//     dispatch(setQueryParams({ sortBy, sortOrder }));
//   };

//   const handleCreate = async (data: CreateUserRequest) => {
//     try {
//       await dispatch(createUser(data)).unwrap();
//       //   toast({ title: 'Success', description: 'User created successfully' });
//       setFormOpen(false);
//     } catch (error: any) {
//       //   toast({ title: 'Error', description: error, variant: 'destructive' });
//     }
//   };

//   const handleUpdate = async (data: UpdateUserRequest) => {
//     if (!selectedUser) return;
//     try {
//       await dispatch(updateUser({ id: selectedUser.id, data })).unwrap();
//       //   toast({ title: 'Success', description: 'User updated successfully' });
//       setFormOpen(false);
//       setSelectedUser(null);
//     } catch (error: any) {
//       //   toast({ title: 'Error', description: error, variant: 'destructive' });
//     }
//   };

//   const handleDelete = async () => {
//     if (!userToDelete) return;
//     try {
//       await dispatch(deleteUser(userToDelete.id)).unwrap();
//     //   toast({ title: 'Success', description: 'User deleted successfully' });
//       setDeleteDialogOpen(false);
//       setUserToDelete(null);
//     } catch (error: any) {
//     //   toast({ title: 'Error', description: error, variant: 'destructive' });
//     }
//   };

//   const openCreateDialog = () => {
//     setSelectedUser(null);
//     setFormOpen(true);
//   };

//   const openEditDialog = (user: User) => {
//     setSelectedUser(user);
//     setFormOpen(true);
//   };

//   const openDeleteDialog = (user: User) => {
//     setUserToDelete(user);
//     setDeleteDialogOpen(true);
//   };

//   const openViewPage = (user: User) => {
//     // Navigate to user details page
//     window.location.href = `/users/${user.id}`;
//   };

//   const tableColumns = columns(openViewPage, openEditDialog, openDeleteDialog);

//   return (
//     <div className="container mx-auto p-6 space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-3xl font-bold">Users Management</h1>
//         <Button onClick={openCreateDialog}>
//           <Plus className="mr-2 h-4 w-4" /> Add User
//         </Button>
//       </div>

//       <DataTable
//         columns={tableColumns}
//         data={users}
//         total={total}
//         page={queryParams.page || 1}
//         limit={queryParams.limit || 10}
//         onPageChange={handlePageChange}
//         onLimitChange={handleLimitChange}
//         onSearch={handleSearch}
//         onSort={handleSort}
//         searchPlaceholder="Search by name or email..."
//         filters={[
//           {
//             id: 'role',
//             label: 'Role',
//             options: [
//               { label: 'All', value: '' },
//               { label: 'Student', value: 'student' },
//               { label: 'Instructor', value: 'instructor' },
//               { label: 'Admin', value: 'admin' },
//             ],
//             value: queryParams.role || '',
//             onChange: handleRoleFilter,
//           },
//         ]}
//         isLoading={isLoading}
//       />

//       <UserFormDialog
//         open={formOpen}
//         onOpenChange={setFormOpen}
//         user={selectedUser}
//         onSubmit={selectedUser ? handleUpdate : handleCreate}
//         isLoading={isLoading}
//       />

//       <ConfirmationDialog
//         open={deleteDialogOpen}
//         onOpenChange={setDeleteDialogOpen}
//         title="Delete User"
//         description={`Are you sure you want to delete user "${userToDelete?.fullName}"? This action cannot be undone.`}
//         onConfirm={handleDelete}
//         confirmText="Delete"
//         cancelText="Cancel"
//         variant="destructive"
//       />
//     </div>
//   );
// }

import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import { Badge } from '../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../../components/ui/pagination';
import { MoreHorizontal, Eye, Edit, Trash2, Plus, Search } from 'lucide-react';
import { type RootState } from '../../store';
import { fetchUsers, setQueryParams, deleteUser, createUser, updateUser } from '../../store/slices/userSlice';
import { UserFormDialog } from './UserFormDialog';
import { ConfirmationDialog } from '../../components/common/ConfirmationDialog';
import { useToast } from '../../components/ui/use-toast';
import { formatDate } from '../../lib/utils';
import type { CreateUserRequest, UpdateUserRequest } from '@/types/user.types';

export default function UsersList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { users, total, isLoading, queryParams } = useSelector((state: RootState) => state.users);

  const [formOpen, setFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<any>(null);
  const [searchInput, setSearchInput] = useState(queryParams.search || '');

  const loadUsers = useCallback(() => {
    dispatch(fetchUsers(queryParams));
  }, [dispatch, queryParams]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== queryParams.search) {
        dispatch(setQueryParams({ search: searchInput, page: 1 }));
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput, dispatch, queryParams.search]);

  const handlePageChange = (page: number) => {
    dispatch(setQueryParams({ page }));
  };

  const handleLimitChange = (limit: number) => {
    dispatch(setQueryParams({ limit, page: 1 }));
  };

  const handleRoleFilter = (role: string) => {
    dispatch(setQueryParams({ role: role === 'all' ? '' : role, page: 1 }));
  };

  const handleSort = (field: string) => {
    const newOrder = queryParams.sortBy === field && queryParams.sortOrder === 'asc' ? 'desc' : 'asc';
    dispatch(setQueryParams({ sortBy: field, sortOrder: newOrder }));
  };

  const openCreateDialog = () => {
    setSelectedUser(null);
    setFormOpen(true);
  };

  const openEditDialog = (user: any) => {
    setSelectedUser(user);
    setFormOpen(true);
  };

  const openDeleteDialog = (user: any) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
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
      // toast({ title: 'Success', description: 'User deleted successfully' });
      setDeleteDialogOpen(false);
      setUserToDelete(null);
    } catch (error: any) {
      // toast({ title: 'Error', description: error, variant: 'destructive' });
    }
  };

  const totalPages = Math.ceil(total / (queryParams.limit || 10));
  const startItem = ((queryParams.page || 1) - 1) * (queryParams.limit || 10) + 1;
  const endItem = Math.min(startItem + (queryParams.limit || 10) - 1, total);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Users Management</h1>
        <Button onClick={openCreateDialog}>
          <Plus className="mr-2 h-4 w-4" /> Add User
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select
              value={queryParams.role || 'all'}
              onValueChange={handleRoleFilter}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="All Roles" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="instructor">Instructor</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={String(queryParams.limit || 10)}
              onValueChange={(v) => handleLimitChange(Number(v))}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10 / page</SelectItem>
                <SelectItem value="20">20 / page</SelectItem>
                <SelectItem value="50">50 / page</SelectItem>
                <SelectItem value="100">100 / page</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Avatar</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort('fullName')}>
                    Name {queryParams.sortBy === 'fullName' && (queryParams.sortOrder === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort('createdAt')}>
                    Created {queryParams.sortBy === 'createdAt' && (queryParams.sortOrder === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      No users found
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar || undefined} />
                          <AvatarFallback>{user.fullName.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell className="font-medium">{user.fullName}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant={user.role === 'admin' ? 'destructive' : user.role === 'instructor' ? 'default' : 'secondary'}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.isActive ? 'success' : 'secondary'}>
                          {user.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(user.createdAt)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => navigate(`/users/${user.id}`)}>
                              <Eye className="mr-2 h-4 w-4" /> View
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => openEditDialog(user)}>
                              <Edit className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => openDeleteDialog(user)} className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-muted-foreground">
                Showing {startItem} to {endItem} of {total} results
              </div>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => handlePageChange((queryParams.page || 1) - 1)}
                      className={queryParams.page === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum: number;
                    const currentPage = queryParams.page || 1;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    return (
                      <PaginationItem key={pageNum}>
                        <PaginationLink
                          isActive={pageNum === currentPage}
                          onClick={() => handlePageChange(pageNum)}
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => handlePageChange((queryParams.page || 1) + 1)}
                      className={queryParams.page === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>

      {/* <UserFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        user={selectedUser}
        onSubmit={selectedUser ? (data) => dispatch(updateUser({ id: selectedUser.id, data })) : (data) => dispatch(createUser(data))}
        isLoading={isLoading}
      /> */}

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