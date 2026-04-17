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