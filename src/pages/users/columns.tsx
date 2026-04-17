import type { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Edit, Trash2, Eye } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import type { User } from '../../types/user.types';
import { formatDate } from '../../lib/utils';

export const columns = (
    onView: (user: User) => void,
    onEdit: (user: User) => void,
    onDelete: (user: User) => void
): ColumnDef<User>[] => [
        {
            accessorKey: 'avatar',
            header: 'Avatar',
            cell: ({ row }) => {
                const user = row.original;
                return (
                    <Avatar>
                        <AvatarImage src={user.avatar || undefined} />
                        <AvatarFallback>{user.fullName.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                );
            },
        },
        {
            accessorKey: 'fullName',
            header: 'Full Name',
        },
        {
            accessorKey: 'email',
            header: 'Email',
        },
        {
            accessorKey: 'role',
            header: 'Role',
            cell: ({ row }) => {
                const role = row.original.role;
                const variant =
                    role === 'admin' ? 'destructive' : role === 'instructor' ? 'default' : 'secondary';
                return <Badge variant={variant}>{role}</Badge>;
            },
        },
        {
            accessorKey: 'isActive',
            header: 'Status',
            cell: ({ row }) => {
                const isActive = row.original.isActive;
                return (
                    <Badge variant={isActive ? 'success' : 'secondary'}>
                        {isActive ? 'Active' : 'Inactive'}
                    </Badge>
                );
            },
        },
        {
            accessorKey: 'createdAt',
            header: 'Created',
            cell: ({ row }) => formatDate(row.original.createdAt),
        },
        {
            id: 'actions',
            cell: ({ row }) => {
                const user = row.original;
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => onView(user)}>
                                <Eye className="mr-2 h-4 w-4" /> View
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onEdit(user)}>
                                <Edit className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onDelete(user)} className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];