import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../components/ui/form';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Button } from '../../components/ui/button';
import { categorySchema, type CategoryFormValues } from '../../lib/validations/category.schema';
import { type Category } from '../../types/category.types';
import { useAppSelector } from '../../store/hooks';

interface CategoryFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: Category | null;
  onSubmit: (data: CategoryFormValues) => Promise<void>;
  isLoading: boolean;
  parentCategories?: Category[];
}

export function CategoryFormDialog({ 
  open, 
  onOpenChange, 
  category, 
  onSubmit, 
  isLoading,
  parentCategories = [] 
}: CategoryFormDialogProps) {
  const isEditing = !!category;
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: isEditing
      ? {
          name: category.name,
          slug: category.slug,
          description: category.description || '',
          icon: category.icon || '',
          parentId: category.parentId || null,
        }
      : {
          name: '',
          slug: '',
          description: '',
          icon: '',
          parentId: null,
        },
  });

  useEffect(() => {
    if (open) {
      if (isEditing) {
        form.reset({
          name: category.name,
          slug: category.slug,
          description: category.description || '',
          icon: category.icon || '',
          parentId: category.parentId || null,
        });
      } else {
        form.reset({
          name: '',
          slug: '',
          description: '',
          icon: '',
          parentId: null,
        });
      }
    }
  }, [open, category, form, isEditing]);

  // Auto-generate slug from name
  const watchName = form.watch('name');
  useEffect(() => {
    if (!isEditing && watchName && !form.getValues('slug')) {
      const slug = watchName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      form.setValue('slug', slug);
    }
  }, [watchName, form, isEditing]);

  const handleSubmit = async (data: CategoryFormValues) => {
    await onSubmit(data);
    form.reset();
    onOpenChange(false);
  };

  // Filter out current category from parent options to prevent self-parent
  const availableParents = parentCategories.filter(p => !isEditing || p.id !== category?.id);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Category' : 'Create New Category'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Web Development" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug *</FormLabel>
                  <FormControl>
                    <Input placeholder="web-development" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Category description..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icon (emoji or icon class)</FormLabel>
                  <FormControl>
                    <Input placeholder="💻" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="parentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parent Category</FormLabel>
                  <Select
                    onValueChange={(val) => field.onChange(val === 'none' ? null : parseInt(val))}
                    value={field.value?.toString() || 'none'}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select parent (optional)" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="none">None (Root Category)</SelectItem>
                      {availableParents.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id.toString()}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}