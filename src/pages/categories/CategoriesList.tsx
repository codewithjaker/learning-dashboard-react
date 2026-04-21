/* 
import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { DataTable } from '../../components/data-table/DataTable'; 
import { CategoryTree } from './CategoryTree';
import { CategoryFormDialog } from './CategoryFormDialog';
import { columns } from './columns';
import {type RootState } from '../../store';
import { 
  fetchCategories, 
  setQueryParams, 
  createCategory, 
  updateCategory, 
  deleteCategory,
  setTree
} from '../../store/slices/categorySlice';
import type { Category, CreateCategoryRequest, UpdateCategoryRequest } from '../../types/category.types';
import { useToast } from '../../components/ui/use-toast';
import { ConfirmationDialog } from '../../components/common/ConfirmationDialog';
import { buildCategoryTree } from '../../lib/utils';

export default function CategoriesList() {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { categories, total, isLoading, queryParams } = useSelector((state: RootState) => state.categories);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
  const [activeTab, setActiveTab] = useState('list');

  console.log('CategoriesList render', { categories, total, isLoading, queryParams });

  const loadCategories = useCallback(() => {
    dispatch(fetchCategories(queryParams));
  }, [dispatch, queryParams]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  useEffect(() => {
    // Build tree when categories change
    const tree = buildCategoryTree(categories);
    dispatch(setTree(tree));
  }, [categories, dispatch]);

  const handlePageChange = (page: number) => {
    dispatch(setQueryParams({ page }));
  };

  const handleLimitChange = (limit: number) => {
    dispatch(setQueryParams({ limit, page: 1 }));
  };

  const handleSearch = (search: string) => {
    dispatch(setQueryParams({ search, page: 1 }));
  };

  const handleSort = (sortBy: string, sortOrder: 'asc' | 'desc') => {
    dispatch(setQueryParams({ sortBy, sortOrder }));
  };

  const handleCreate = async (data: CreateCategoryRequest) => {
    try {
      await dispatch(createCategory(data)).unwrap();
    //   toast({ title: 'Success', description: 'Category created successfully' });
      setFormOpen(false);
    } catch (error: any) {
    //   toast({ title: 'Error', description: error, variant: 'destructive' });
    }
  };

  const handleUpdate = async (data: UpdateCategoryRequest) => {
    if (!selectedCategory) return;
    try {
      await dispatch(updateCategory({ id: selectedCategory.id, data })).unwrap();
    //   toast({ title: 'Success', description: 'Category updated successfully' });
      setFormOpen(false);
      setSelectedCategory(null);
    } catch (error: any) {
    //   toast({ title: 'Error', description: error, variant: 'destructive' });
    }
  };

  const handleDelete = async () => {
    if (!categoryToDelete) return;
    try {
      await dispatch(deleteCategory(categoryToDelete.id)).unwrap();
    //   toast({ title: 'Success', description: 'Category deleted successfully' });
      setDeleteDialogOpen(false);
      setCategoryToDelete(null);
    } catch (error: any) {
    //   toast({ title: 'Error', description: error, variant: 'destructive' });
    }
  };

  const openCreateDialog = () => {
    setSelectedCategory(null);
    setFormOpen(true);
  };

  const openEditDialog = (category: Category) => {
    setSelectedCategory(category);
    setFormOpen(true);
  };

  const openDeleteDialog = (category: Category) => {
    setCategoryToDelete(category);
    setDeleteDialogOpen(true);
  };

  const openViewTree = (category: Category) => {
    // Expand the tree to show this category
    setActiveTab('tree');
    // Could also scroll to the category in the tree
  };

  const tableColumns = columns(openViewTree, openEditDialog, openDeleteDialog);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Categories Management</h1>
        <Button onClick={openCreateDialog}>
          <Plus className="mr-2 h-4 w-4" /> Add Category
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="tree">Tree View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="mt-6">
          <DataTable
            columns={tableColumns}
            data={categories}
            total={total}
            page={queryParams.page || 1}
            limit={queryParams.limit || 10}
            onPageChange={handlePageChange}
            onLimitChange={handleLimitChange}
            onSearch={handleSearch}
            onSort={handleSort}
            searchPlaceholder="Search by name or slug..."
            isLoading={isLoading}
          />
        </TabsContent>
        
        <TabsContent value="tree" className="mt-6">
          <CategoryTree
            categories={categories}
            onEdit={openEditDialog}
            onDelete={openDeleteDialog}
          />
        </TabsContent>
      </Tabs>

      <CategoryFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        category={selectedCategory}
        onSubmit={selectedCategory ? handleUpdate : handleCreate}
        isLoading={isLoading}
        parentCategories={categories}
      />

      <ConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Category"
        description={`Are you sure you want to delete category "${categoryToDelete?.name}"? This will also delete all subcategories (if any). This action cannot be undone.`}
        onConfirm={handleDelete}
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
      />
    </div>
  );
}

*/


import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { MoreHorizontal, Edit, Trash2, Plus, Search, FolderTree } from 'lucide-react';
import { type RootState } from '../../store';
import { fetchCategories, setQueryParams, deleteCategory } from '../../store/slices/categorySlice';
import { CategoryFormDialog } from './CategoryFormDialog';
import { ConfirmationDialog } from '../../components/common/ConfirmationDialog';
import { useToast } from '../../components/ui/use-toast';
import { formatDate } from '../../lib/utils';

export default function CategoriesList() {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { categories, total, isLoading, queryParams } = useSelector((state: RootState) => state.categories);

  const [formOpen, setFormOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<any>(null);
  const [searchInput, setSearchInput] = useState(queryParams.search || '');

  const loadCategories = useCallback(() => {
    dispatch(fetchCategories(queryParams));
  }, [dispatch, queryParams]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

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

  const handleSort = (field: string) => {
    const newOrder = queryParams.sortBy === field && queryParams.sortOrder === 'asc' ? 'desc' : 'asc';
    dispatch(setQueryParams({ sortBy: field, sortOrder: newOrder }));
  };

  const openCreateDialog = () => {
    setSelectedCategory(null);
    setFormOpen(true);
  };

  const openEditDialog = (category: any) => {
    setSelectedCategory(category);
    setFormOpen(true);
  };

  const openDeleteDialog = (category: any) => {
    setCategoryToDelete(category);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!categoryToDelete) return;
    try {
      await dispatch(deleteCategory(categoryToDelete.id)).unwrap();
      // toast({ title: 'Success', description: 'Category deleted successfully' });
      setDeleteDialogOpen(false);
      setCategoryToDelete(null);
    } catch (error: any) {
      // toast({ title: 'Error', description: error, variant: 'destructive' });
    }
  };

  const totalPages = Math.ceil(total / (queryParams.limit || 10));
  const startItem = ((queryParams.page || 1) - 1) * (queryParams.limit || 10) + 1;
  const endItem = Math.min(startItem + (queryParams.limit || 10) - 1, total);

  // Helper to get parent category name
  const getParentName = (parentId: number | null) => {
    if (!parentId) return '-';
    const parent = categories.find(c => c.id === parentId);
    return parent ? parent.name : '-';
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Categories Management</h1>
        <Button onClick={openCreateDialog}>
          <Plus className="mr-2 h-4 w-4" /> Add Category
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name or slug..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-9"
              />
            </div>
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
                  <TableHead className="cursor-pointer" onClick={() => handleSort('name')}>
                    Name {queryParams.sortBy === 'name' && (queryParams.sortOrder === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Parent</TableHead>
                  <TableHead>Icon</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort('createdAt')}>
                    Created {queryParams.sortBy === 'createdAt' && (queryParams.sortOrder === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : categories.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      No categories found
                    </TableCell>
                  </TableRow>
                ) : (
                  categories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {category.icon && <span className="text-lg">{category.icon}</span>}
                          {category.name}
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{category.slug}</TableCell>
                      <TableCell>{getParentName(category.parentId)}</TableCell>
                      <TableCell>{category.icon || '-'}</TableCell>
                      <TableCell>{formatDate(category.createdAt)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => openEditDialog(category)}>
                              <Edit className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => openDeleteDialog(category)} className="text-red-600">
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

      <CategoryFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        category={selectedCategory}
        onSubmit={selectedCategory ? (data) => dispatch(updateCategory({ id: selectedCategory.id, data })) : (data) => dispatch(createCategory(data))}
        isLoading={isLoading}
        parentCategories={categories}
      />

      <ConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Category"
        description={`Are you sure you want to delete category "${categoryToDelete?.name}"? This will also delete all subcategories (if any). This action cannot be undone.`}
        onConfirm={handleDelete}
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
      />
    </div>
  );
}