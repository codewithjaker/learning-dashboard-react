import { useState } from 'react';
import { ChevronRight, ChevronDown, Folder, FolderOpen, Edit, Trash2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import type { Category } from '../../types/category.types';

interface CategoryTreeProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

export function CategoryTree({ categories, onEdit, onDelete }: CategoryTreeProps) {
  const [expandedNodes, setExpandedNodes] = useState<Set<number>>(new Set());

  const toggleNode = (id: number) => {
    const newSet = new Set(expandedNodes);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setExpandedNodes(newSet);
  };

  const buildTree = (parentId: number | null = null): Category[] => {
    return categories.filter(cat => cat.parentId === parentId);
  };

  const renderTree = (parentId: number | null = null, level = 0) => {
    const children = buildTree(parentId);
    if (children.length === 0) return null;

    return (
      <ul className={`space-y-1 ${level > 0 ? 'ml-6' : ''}`}>
        {children.map((category) => (
          <li key={category.id}>
            <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg group">
              <div className="flex items-center space-x-2">
                {buildTree(category.id).length > 0 && (
                  <button
                    onClick={() => toggleNode(category.id)}
                    className="p-0.5 hover:bg-gray-200 rounded"
                  >
                    {expandedNodes.has(category.id) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                )}
                {expandedNodes.has(category.id) ? (
                  <FolderOpen className="h-5 w-5 text-blue-500" />
                ) : (
                  <Folder className="h-5 w-5 text-yellow-600" />
                )}
                <span className="font-medium">{category.name}</span>
                {category.icon && <span className="text-lg">{category.icon}</span>}
                <span className="text-xs text-gray-500">({category.slug})</span>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(category)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(category)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            {expandedNodes.has(category.id) && renderTree(category.id, level + 1)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="border rounded-lg p-4 bg-white">
      <h3 className="text-lg font-semibold mb-4">Category Hierarchy</h3>
      {categories.filter(c => !c.parentId).length === 0 ? (
        <p className="text-gray-500 text-center py-8">No categories found</p>
      ) : (
        renderTree(null)
      )}
    </div>
  );
}