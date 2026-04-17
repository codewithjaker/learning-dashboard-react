import { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../components/ui/form';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Button } from '../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Badge } from '../../components/ui/badge';
import { X, Plus } from 'lucide-react';
import { courseSchema, type CourseFormValues } from '../../lib/validations/course.schema';
import {type Course } from '../../types/course.types';

interface CourseFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  course?: Course | null;
  onSubmit: (data: CourseFormValues) => Promise<void>;
  isLoading: boolean;
  instructors?: Array<{ id: number; fullName: string }>;
  categories?: string[];
}

export function CourseFormDialog({
  open,
  onOpenChange,
  course,
  onSubmit,
  isLoading,
  instructors = [],
  categories = [],
}: CourseFormDialogProps) {
  const isEditing = !!course;
  const [activeTab, setActiveTab] = useState('basic');
  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),
    defaultValues: isEditing
      ? {
          title: course.title,
          slug: course.slug,
          subtitle: course.subtitle || '',
          description: course.description,
          fullDescription: course.fullDescription || '',
          image: course.image,
          previewVideoUrl: course.previewVideoUrl || '',
          level: course.level,
          category: course.category,
          tags: course.tags,
          price: course.price,
          originalPrice: course.originalPrice || undefined,
          certification: course.certification || '',
          requirements: course.requirements,
          learningOutcomes: course.learningOutcomes,
          targetAudience: course.targetAudience,
          language: course.language || '',
          courseProjects: course.courseProjects,
          courseSoftware: course.courseSoftware,
          courseFeatures: course.courseFeatures,
          instructorId: course.instructorId,
          status: course.status,
        }
      : {
          title: '',
          slug: '',
          subtitle: '',
          description: '',
          fullDescription: '',
          image: '',
          previewVideoUrl: '',
          level: 'all-levels',
          category: '',
          tags: [],
          price: 0,
          originalPrice: undefined,
          certification: '',
          requirements: [],
          learningOutcomes: [],
          targetAudience: [],
          language: '',
          courseProjects: [],
          courseSoftware: [],
          courseFeatures: [],
          instructorId: instructors[0]?.id || 0,
          status: 'draft',
        },
  });

  const { fields: requirementsFields, append: appendRequirement, remove: removeRequirement } = useFieldArray({
    control: form.control,
    name: 'requirements',
  });
  const { fields: outcomesFields, append: appendOutcome, remove: removeOutcome } = useFieldArray({
    control: form.control,
    name: 'learningOutcomes',
  });
  const { fields: audienceFields, append: appendAudience, remove: removeAudience } = useFieldArray({
    control: form.control,
    name: 'targetAudience',
  });
  const { fields: projectsFields, append: appendProject, remove: removeProject } = useFieldArray({
    control: form.control,
    name: 'courseProjects',
  });
  const { fields: softwareFields, append: appendSoftware, remove: removeSoftware } = useFieldArray({
    control: form.control,
    name: 'courseSoftware',
  });
  const { fields: featuresFields, append: appendFeature, remove: removeFeature } = useFieldArray({
    control: form.control,
    name: 'courseFeatures',
  });
  const [tagInput, setTagInput] = useState('');
  const tags = form.watch('tags');

  useEffect(() => {
    if (open) {
      if (isEditing) {
        form.reset({
          title: course.title,
          slug: course.slug,
          subtitle: course.subtitle || '',
          description: course.description,
          fullDescription: course.fullDescription || '',
          image: course.image,
          previewVideoUrl: course.previewVideoUrl || '',
          level: course.level,
          category: course.category,
          tags: course.tags,
          price: course.price,
          originalPrice: course.originalPrice || undefined,
          certification: course.certification || '',
          requirements: course.requirements,
          learningOutcomes: course.learningOutcomes,
          targetAudience: course.targetAudience,
          language: course.language || '',
          courseProjects: course.courseProjects,
          courseSoftware: course.courseSoftware,
          courseFeatures: course.courseFeatures,
          instructorId: course.instructorId,
          status: course.status,
        });
      } else {
        form.reset({
          title: '',
          slug: '',
          subtitle: '',
          description: '',
          fullDescription: '',
          image: '',
          previewVideoUrl: '',
          level: 'all-levels',
          category: '',
          tags: [],
          price: 0,
          originalPrice: undefined,
          certification: '',
          requirements: [],
          learningOutcomes: [],
          targetAudience: [],
          language: '',
          courseProjects: [],
          courseSoftware: [],
          courseFeatures: [],
          instructorId: instructors[0]?.id || 0,
          status: 'draft',
        });
      }
    }
  }, [open, course, form, isEditing, instructors]);

  // Auto-generate slug from title
  const watchTitle = form.watch('title');
  useEffect(() => {
    if (!isEditing && watchTitle && !form.getValues('slug')) {
      const slug = watchTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      form.setValue('slug', slug);
    }
  }, [watchTitle, form, isEditing]);

  const addTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      form.setValue('tags', [...tags, tagInput]);
      setTagInput('');
    }
  };
  const removeTag = (tag: string) => {
    form.setValue('tags', tags.filter(t => t !== tag));
  };

  const handleSubmit = async (data: CourseFormValues) => {
    await onSubmit(data);
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Course' : 'Create New Course'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="pricing">Pricing & Media</TabsTrigger>
                <TabsTrigger value="lists">Lists</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4 mt-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title *</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subtitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subtitle</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                      <FormLabel>Description *</FormLabel>
                      <FormControl>
                        <Textarea rows={3} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="fullDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Description</FormLabel>
                      <FormControl>
                        <Textarea rows={5} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Level</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                          <SelectItem value="all-levels">All Levels</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Language</FormLabel>
                      <FormControl>
                        <Input placeholder="English" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="instructorId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instructor *</FormLabel>
                      <Select onValueChange={(v) => field.onChange(parseInt(v))} value={field.value?.toString()}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select instructor" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {instructors.map((inst) => (
                            <SelectItem key={inst.id} value={inst.id.toString()}>
                              {inst.fullName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                          <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value="content" className="space-y-4 mt-4">
                <FormField
                  control={form.control}
                  name="certification"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Certification</FormLabel>
                      <FormControl>
                        <Input placeholder="Course completion certificate" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div>
                  <FormLabel>Tags</FormLabel>
                  <div className="flex gap-2 mt-1">
                    <Input
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      placeholder="Add tag..."
                      className="flex-1"
                    />
                    <Button type="button" onClick={addTag} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                        <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => removeTag(tag)} />
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <FormLabel>Requirements</FormLabel>
                  {requirementsFields.map((field, idx) => (
                    <div key={field.id} className="flex gap-2 mt-2">
                      <FormField
                        control={form.control}
                        name={`requirements.${idx}`}
                        render={({ field }) => (
                          <FormControl>
                            <Input {...field} className="flex-1" />
                          </FormControl>
                        )}
                      />
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeRequirement(idx)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => appendRequirement('')}>
                    <Plus className="h-4 w-4 mr-1" /> Add Requirement
                  </Button>
                </div>

                <div>
                  <FormLabel>Learning Outcomes</FormLabel>
                  {outcomesFields.map((field, idx) => (
                    <div key={field.id} className="flex gap-2 mt-2">
                      <FormField
                        control={form.control}
                        name={`learningOutcomes.${idx}`}
                        render={({ field }) => (
                          <FormControl>
                            <Input {...field} className="flex-1" />
                          </FormControl>
                        )}
                      />
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeOutcome(idx)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => appendOutcome('')}>
                    <Plus className="h-4 w-4 mr-1" /> Add Outcome
                  </Button>
                </div>

                <div>
                  <FormLabel>Target Audience</FormLabel>
                  {audienceFields.map((field, idx) => (
                    <div key={field.id} className="flex gap-2 mt-2">
                      <FormField
                        control={form.control}
                        name={`targetAudience.${idx}`}
                        render={({ field }) => (
                          <FormControl>
                            <Input {...field} className="flex-1" />
                          </FormControl>
                        )}
                      />
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeAudience(idx)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => appendAudience('')}>
                    <Plus className="h-4 w-4 mr-1" /> Add Audience
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="pricing" className="space-y-4 mt-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price *</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="originalPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Original Price</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" {...field} onChange={e => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL *</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="previewVideoUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preview Video URL</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value="lists" className="space-y-4 mt-4">
                <div>
                  <FormLabel>Projects</FormLabel>
                  {projectsFields.map((field, idx) => (
                    <div key={field.id} className="flex gap-2 mt-2">
                      <FormField
                        control={form.control}
                        name={`courseProjects.${idx}`}
                        render={({ field }) => (
                          <FormControl>
                            <Input {...field} className="flex-1" />
                          </FormControl>
                        )}
                      />
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeProject(idx)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => appendProject('')}>
                    <Plus className="h-4 w-4 mr-1" /> Add Project
                  </Button>
                </div>

                <div>
                  <FormLabel>Software / Tools</FormLabel>
                  {softwareFields.map((field, idx) => (
                    <div key={field.id} className="flex gap-2 mt-2">
                      <FormField
                        control={form.control}
                        name={`courseSoftware.${idx}`}
                        render={({ field }) => (
                          <FormControl>
                            <Input {...field} className="flex-1" />
                          </FormControl>
                        )}
                      />
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeSoftware(idx)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => appendSoftware('')}>
                    <Plus className="h-4 w-4 mr-1" /> Add Software
                  </Button>
                </div>

                <div>
                  <FormLabel>Features</FormLabel>
                  {featuresFields.map((field, idx) => (
                    <div key={field.id} className="flex gap-2 mt-2">
                      <FormField
                        control={form.control}
                        name={`courseFeatures.${idx}`}
                        render={({ field }) => (
                          <FormControl>
                            <Input {...field} className="flex-1" />
                          </FormControl>
                        )}
                      />
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeFeature(idx)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => appendFeature('')}>
                    <Plus className="h-4 w-4 mr-1" /> Add Feature
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save Course'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}