import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, Edit, Trash2, Upload, BookOpen } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { type RootState } from '../../store';
import { fetchCourseById, clearCurrentCourse } from '../../store/slices/courseSlice';
import { formatDate, formatCurrency } from '../../lib/utils';

export default function CourseDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentCourse, isLoading } = useSelector((state: RootState) => state.courses);

  useEffect(() => {
    if (id) {
      dispatch(fetchCourseById(parseInt(id)));
    }
    return () => {
      dispatch(clearCurrentCourse());
    };
  }, [dispatch, id]);

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  if (!currentCourse) {
    return <div className="text-center p-8">Course not found</div>;
  }

  const levelLabels = {
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
    'all-levels': 'All Levels',
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate('/courses')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Courses
        </Button>
        <div className="space-x-2">
          <Button variant="outline" onClick={() => navigate(`/courses/edit/${currentCourse.id}`)}>
            <Edit className="mr-2 h-4 w-4" /> Edit
          </Button>
          {currentCourse.status === 'draft' && (
            <Button variant="default">
              <Upload className="mr-2 h-4 w-4" /> Publish
            </Button>
          )}
          <Button variant="outline" onClick={() => navigate(`/courses/${currentCourse.id}/syllabus`)}>
            <BookOpen className="mr-2 h-4 w-4" /> Manage Syllabus
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Main content */}
        <div className="col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{currentCourse.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <Badge variant={currentCourse.status === 'published' ? 'success' : 'secondary'}>
                  {currentCourse.status}
                </Badge>
                <Badge variant="outline">{levelLabels[currentCourse.level]}</Badge>
                <Badge variant="secondary">{currentCourse.category}</Badge>
              </div>
              <div>
                <h4 className="font-semibold">Subtitle</h4>
                <p className="text-muted-foreground">{currentCourse.subtitle || '—'}</p>
              </div>
              <div>
                <h4 className="font-semibold">Description</h4>
                <p>{currentCourse.description}</p>
              </div>
              <div>
                <h4 className="font-semibold">Full Description</h4>
                <p className="whitespace-pre-wrap">{currentCourse.fullDescription || '—'}</p>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="requirements">
            <TabsList>
              <TabsTrigger value="requirements">Requirements</TabsTrigger>
              <TabsTrigger value="outcomes">Learning Outcomes</TabsTrigger>
              <TabsTrigger value="audience">Target Audience</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
            </TabsList>
            <TabsContent value="requirements" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <ul className="list-disc list-inside space-y-1">
                    {currentCourse.requirements?.map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                    {(!currentCourse.requirements || currentCourse.requirements.length === 0) && (
                      <li className="text-muted-foreground">No requirements listed</li>
                    )}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="outcomes" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <ul className="list-disc list-inside space-y-1">
                    {currentCourse.learningOutcomes?.map((outcome, idx) => (
                      <li key={idx}>{outcome}</li>
                    ))}
                    {(!currentCourse.learningOutcomes || currentCourse.learningOutcomes.length === 0) && (
                      <li className="text-muted-foreground">No learning outcomes listed</li>
                    )}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="audience" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <ul className="list-disc list-inside space-y-1">
                    {currentCourse.targetAudience?.map((aud, idx) => (
                      <li key={idx}>{aud}</li>
                    ))}
                    {(!currentCourse.targetAudience || currentCourse.targetAudience.length === 0) && (
                      <li className="text-muted-foreground">No target audience listed</li>
                    )}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="projects" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <ul className="list-disc list-inside space-y-1">
                    {currentCourse.courseProjects?.map((proj, idx) => (
                      <li key={idx}>{proj}</li>
                    ))}
                    {(!currentCourse.courseProjects || currentCourse.courseProjects.length === 0) && (
                      <li className="text-muted-foreground">No projects listed</li>
                    )}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <p className="text-sm text-muted-foreground">Slug</p>
                <p className="font-mono text-sm">{currentCourse.slug}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Price</p>
                <p className="font-medium">{formatCurrency(currentCourse.price)}</p>
                {currentCourse.originalPrice && currentCourse.originalPrice > currentCourse.price && (
                  <p className="text-sm text-muted-foreground line-through">
                    {formatCurrency(currentCourse.originalPrice)}
                  </p>
                )}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Language</p>
                <p>{currentCourse.language || 'English'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Created</p>
                <p>{formatDate(currentCourse.createdAt)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Published</p>
                <p>{currentCourse.publishedAt ? formatDate(currentCourse.publishedAt) : 'Not published'}</p>
              </div>
            </CardContent>
          </Card>

          {currentCourse.courseSoftware && currentCourse.courseSoftware.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Software & Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {currentCourse.courseSoftware.map((sw, idx) => (
                    <Badge key={idx} variant="outline">{sw}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {currentCourse.courseFeatures && currentCourse.courseFeatures.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-1">
                  {currentCourse.courseFeatures.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {currentCourse.certification && (
            <Card>
              <CardHeader>
                <CardTitle>Certification</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{currentCourse.certification}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}