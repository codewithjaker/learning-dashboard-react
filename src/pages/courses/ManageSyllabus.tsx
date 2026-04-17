import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, Plus, GripVertical, Edit, Trash2, ChevronDown, ChevronRight, Video, FileText, HelpCircle, Code, PenTool, File, FolderOpen } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Switch } from '../../components/ui/switch';
import { Label } from '../../components/ui/label';
import { type RootState } from '../../store';
import { fetchCourseById, clearCurrentCourse } from '../../store/slices/courseSlice';
import {
  fetchSections,
  createSection,
  updateSection,
  deleteSection,
  fetchItems,
  createItem,
  updateItem,
  deleteItem,
  clearSyllabus,
} from '../../store/slices/syllabusSlice';
import { useToast } from '../../components/ui/use-toast';
import { ConfirmationDialog } from '../../components/common/ConfirmationDialog';

export default function ManageSyllabus() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const courseId = parseInt(id!);
  const { currentCourse } = useSelector((state: RootState) => state.courses);
  const { sections, items, isLoading } = useSelector((state: RootState) => state.syllabus);
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set());
  const [sectionDialogOpen, setSectionDialogOpen] = useState(false);
  const [itemDialogOpen, setItemDialogOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<any>(null);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [selectedSectionId, setSelectedSectionId] = useState<number | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ id: number; sectionId: number } | null>(null);
  const [sectionToDelete, setSectionToDelete] = useState<{ id: number; courseId: number } | null>(null);
  const [sectionForm, setSectionForm] = useState({ title: '', orderIndex: 0 });
  const [itemForm, setItemForm] = useState({
    title: '',
    type: 'video',
    content: '',
    duration: '',
    isFree: false,
    orderIndex: 0,
  });

  useEffect(() => {
    dispatch(fetchCourseById(courseId));
    dispatch(fetchSections(courseId));
    return () => {
      dispatch(clearCurrentCourse());
      dispatch(clearSyllabus());
    };
  }, [dispatch, courseId]);

  useEffect(() => {
    // Fetch items for each section when expanded
    expandedSections.forEach(sectionId => {
      if (!items[sectionId]) {
        dispatch(fetchItems(sectionId));
      }
    });
  }, [expandedSections, dispatch, items]);

  const toggleSection = (sectionId: number) => {
    const newSet = new Set(expandedSections);
    if (newSet.has(sectionId)) {
      newSet.delete(sectionId);
    } else {
      newSet.add(sectionId);
      if (!items[sectionId]) {
        dispatch(fetchItems(sectionId));
      }
    }
    setExpandedSections(newSet);
  };

  const openSectionDialog = (section?: any) => {
    if (section) {
      setEditingSection(section);
      setSectionForm({ title: section.title, orderIndex: section.orderIndex });
    } else {
      setEditingSection(null);
      setSectionForm({ title: '', orderIndex: sections.length });
    }
    setSectionDialogOpen(true);
  };

  const handleSaveSection = async () => {
    try {
      if (editingSection) {
        await dispatch(updateSection({
          id: editingSection.id,
          data: sectionForm,
          courseId,
        })).unwrap();
        toast({ title: 'Success', description: 'Section updated' });
      } else {
        await dispatch(createSection({
          courseId,
          title: sectionForm.title,
          orderIndex: sectionForm.orderIndex,
        })).unwrap();
        toast({ title: 'Success', description: 'Section created' });
      }
      setSectionDialogOpen(false);
    } catch (error: any) {
      toast({ title: 'Error', description: error, variant: 'destructive' });
    }
  };

  const confirmDeleteSection = (section: any) => {
    setSectionToDelete({ id: section.id, courseId });
    setDeleteDialogOpen(true);
  };

  const handleDeleteSection = async () => {
    if (!sectionToDelete) return;
    try {
      await dispatch(deleteSection(sectionToDelete)).unwrap();
      toast({ title: 'Success', description: 'Section deleted' });
      setDeleteDialogOpen(false);
      setSectionToDelete(null);
    } catch (error: any) {
      toast({ title: 'Error', description: error, variant: 'destructive' });
    }
  };

  const openItemDialog = (sectionId: number, item?: any) => {
    setSelectedSectionId(sectionId);
    if (item) {
      setEditingItem(item);
      setItemForm({
        title: item.title,
        type: item.type,
        content: item.content || '',
        duration: item.duration?.toString() || '',
        isFree: item.isFree,
        orderIndex: item.orderIndex,
      });
    } else {
      setEditingItem(null);
      const sectionItems = items[sectionId] || [];
      setItemForm({
        title: '',
        type: 'video',
        content: '',
        duration: '',
        isFree: false,
        orderIndex: sectionItems.length,
      });
    }
    setItemDialogOpen(true);
  };

  const handleSaveItem = async () => {
    if (!selectedSectionId) return;
    try {
      const data = {
        sectionId: selectedSectionId,
        title: itemForm.title,
        type: itemForm.type as any,
        content: itemForm.content || undefined,
        duration: itemForm.duration ? parseInt(itemForm.duration) : undefined,
        isFree: itemForm.isFree,
        orderIndex: itemForm.orderIndex,
      };
      if (editingItem) {
        await dispatch(updateItem({
          id: editingItem.id,
          data,
          sectionId: selectedSectionId,
        })).unwrap();
        toast({ title: 'Success', description: 'Item updated' });
      } else {
        await dispatch(createItem(data)).unwrap();
        toast({ title: 'Success', description: 'Item created' });
      }
      setItemDialogOpen(false);
    } catch (error: any) {
      toast({ title: 'Error', description: error, variant: 'destructive' });
    }
  };

  const confirmDeleteItem = (itemId: number, sectionId: number) => {
    setItemToDelete({ id: itemId, sectionId });
    setDeleteDialogOpen(true);
  };

  const handleDeleteItem = async () => {
    if (!itemToDelete) return;
    try {
      await dispatch(deleteItem(itemToDelete)).unwrap();
      toast({ title: 'Success', description: 'Item deleted' });
      setDeleteDialogOpen(false);
      setItemToDelete(null);
    } catch (error: any) {
      toast({ title: 'Error', description: error, variant: 'destructive' });
    }
  };

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'article': return <FileText className="h-4 w-4" />;
      case 'quiz': return <HelpCircle className="h-4 w-4" />;
      case 'coding': return <Code className="h-4 w-4" />;
      case 'assignment': return <PenTool className="h-4 w-4" />;
      default: return <File className="h-4 w-4" />;
    }
  };

  if (!currentCourse && !isLoading) {
    return <div className="text-center p-8">Course not found</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate(`/courses/${courseId}`)}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Course
          </Button>
          <h1 className="text-2xl font-bold">Manage Syllabus: {currentCourse?.title}</h1>
        </div>
        <Button onClick={() => openSectionDialog()}>
          <Plus className="mr-2 h-4 w-4" /> Add Section
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Course Content</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sections.map((section, idx) => (
              <div key={section.id} className="border rounded-lg">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-t-lg">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleSection(section.id)}
                    >
                      {expandedSections.has(section.id) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </Button>
                    <GripVertical className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Section {idx + 1}: {section.title}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => openSectionDialog(section)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => confirmDeleteSection(section)}>
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => openItemDialog(section.id)}>
                      <Plus className="h-4 w-4 mr-1" /> Add Item
                    </Button>
                  </div>
                </div>
                {expandedSections.has(section.id) && (
                  <div className="p-4 space-y-2">
                    {(items[section.id] || []).map((item, itemIdx) => (
                      <div key={item.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                        <div className="flex items-center gap-3">
                          {getItemIcon(item.type)}
                          <span className="text-sm">{itemIdx + 1}. {item.title}</span>
                          {item.isFree && (
                            <Badge variant="outline" className="text-xs">Preview</Badge>
                          )}
                          {item.duration && (
                            <span className="text-xs text-muted-foreground">{Math.floor(item.duration / 60)}:{String(item.duration % 60).padStart(2, '0')}</span>
                          )}
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" onClick={() => openItemDialog(section.id, item)}>
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => confirmDeleteItem(item.id, section.id)}>
                            <Trash2 className="h-3 w-3 text-red-600" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    {(!items[section.id] || items[section.id].length === 0) && (
                      <p className="text-sm text-muted-foreground text-center py-4">No items yet. Click "Add Item" to create content.</p>
                    )}
                  </div>
                )}
              </div>
            ))}
            {sections.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No sections yet. Click "Add Section" to start building your course.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Section Dialog */}
      <Dialog open={sectionDialogOpen} onOpenChange={setSectionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingSection ? 'Edit Section' : 'Add Section'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={sectionForm.title}
                onChange={(e) => setSectionForm({ ...sectionForm, title: e.target.value })}
                placeholder="e.g., Introduction"
              />
            </div>
            <div>
              <Label>Order Index</Label>
              <Input
                type="number"
                value={sectionForm.orderIndex}
                onChange={(e) => setSectionForm({ ...sectionForm, orderIndex: parseInt(e.target.value) })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSectionDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveSection}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Item Dialog */}
      <Dialog open={itemDialogOpen} onOpenChange={setItemDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingItem ? 'Edit Item' : 'Add Item'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={itemForm.title}
                onChange={(e) => setItemForm({ ...itemForm, title: e.target.value })}
                placeholder="e.g., Introduction Video"
              />
            </div>
            <div>
              <Label>Type</Label>
              <Select value={itemForm.type} onValueChange={(v) => setItemForm({ ...itemForm, type: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="article">Article</SelectItem>
                  <SelectItem value="quiz">Quiz</SelectItem>
                  <SelectItem value="coding">Coding Exercise</SelectItem>
                  <SelectItem value="assignment">Assignment</SelectItem>
                  <SelectItem value="resource">Resource</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Content (URL or text)</Label>
              <Textarea
                value={itemForm.content}
                onChange={(e) => setItemForm({ ...itemForm, content: e.target.value })}
                placeholder="Video URL, article text, or quiz JSON"
                rows={3}
              />
            </div>
            <div>
              <Label>Duration (seconds)</Label>
              <Input
                type="number"
                value={itemForm.duration}
                onChange={(e) => setItemForm({ ...itemForm, duration: e.target.value })}
                placeholder="e.g., 300"
              />
            </div>
            <div className="flex items-center justify-between">
              <Label>Free Preview</Label>
              <Switch
                checked={itemForm.isFree}
                onCheckedChange={(v) => setItemForm({ ...itemForm, isFree: v })}
              />
            </div>
            <div>
              <Label>Order Index</Label>
              <Input
                type="number"
                value={itemForm.orderIndex}
                onChange={(e) => setItemForm({ ...itemForm, orderIndex: parseInt(e.target.value) })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setItemDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveItem}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Item"
        description={itemToDelete ? "Are you sure you want to delete this item?" : "Are you sure you want to delete this section and all its items?"}
        onConfirm={itemToDelete ? handleDeleteItem : handleDeleteSection}
        confirmText="Delete"
        variant="destructive"
      />
    </div>
  );
}