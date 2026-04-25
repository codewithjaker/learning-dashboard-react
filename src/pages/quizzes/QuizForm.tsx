import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../components/ui/form';
import { Card, CardContent } from '../../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Switch } from '../../components/ui/switch';
import { Plus, Trash2 } from 'lucide-react';

const optionSchema = z.object({
  optionText: z.string().min(1),
  isCorrect: z.boolean(),
  orderIndex: z.number().int().min(0).default(0),
});
const questionSchema = z.object({
  questionText: z.string().min(1),
  questionType: z.enum(['multiple_choice', 'true_false', 'short_answer']),
  points: z.number().min(0),
  orderIndex: z.number().int().min(0).default(0),
  explanation: z.string().optional(),
  options: z.array(optionSchema).optional(),
});
const quizSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  timeLimit: z.number().nullable(),
  passingScore: z.number().min(0).max(100),
  maxAttempts: z.number().min(1),
  shuffleQuestions: z.boolean(),
  showResults: z.boolean(),
  questions: z.array(questionSchema),
});

export function QuizForm({ initialData, onSubmit, onCancel }: any) {
  const form = useForm({
    resolver: zodResolver(quizSchema),
    defaultValues: initialData || {
      questions: [],
      passingScore: 70,
      maxAttempts: 1,
      shuffleQuestions: false,
      showResults: true,
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'questions',
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
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
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="timeLimit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time Limit (minutes)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    value={field.value || ''}
                    onChange={e => field.onChange(e.target.value ? parseInt(e.target.value) : null)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passingScore"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Passing Score (%)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maxAttempts"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max Attempts</FormLabel>
                <FormControl>
                  <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="shuffleQuestions"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <FormLabel>Shuffle Questions</FormLabel>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="showResults"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <FormLabel>Show Results</FormLabel>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
        <div>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Questions</h3>
            <Button
              type="button"
              onClick={() =>
                append({
                  questionText: '',
                  questionType: 'multiple_choice',
                  points: 1,
                  orderIndex: fields.length,
                  options: [],
                })
              }
            >
              <Plus /> Add Question
            </Button>
          </div>
          {fields.map((q, qIdx) => (
            <Card key={q.id} className="mt-4">
              <CardContent className="space-y-2 pt-4">
                <div className="flex justify-end">
                  <Button type="button" variant="ghost" size="sm" onClick={() => remove(qIdx)}>
                    <Trash2 />
                  </Button>
                </div>
                <FormField
                  control={form.control}
                  name={`questions.${qIdx}.orderIndex`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Order Index</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`questions.${qIdx}.questionText`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Question Text</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`questions.${qIdx}.questionType`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className='w-full'>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="multiple_choice">Multiple Choice</SelectItem>
                            <SelectItem value="true_false">True/False</SelectItem>
                            <SelectItem value="short_answer">Short Answer</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`questions.${qIdx}.points`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Points</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {form.watch(`questions.${qIdx}.questionType`) !== 'short_answer' && (
                  <div>
                    <div className="flex justify-between items-center">
                      <FormLabel>Options</FormLabel>
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => {
                          const opts = form.getValues(`questions.${qIdx}.options`) || [];
                          form.setValue(`questions.${qIdx}.options`, [
                            ...opts,
                            { optionText: '', isCorrect: false, orderIndex: opts.length },
                          ]);
                        }}
                      >
                        Add Option
                      </Button>
                    </div>
                    {form.watch(`questions.${qIdx}.options`)?.map((_, oIdx) => (
                      <div key={oIdx} className="flex flex-col gap-2 mt-2 p-2 border rounded">
                        <div className="flex items-center gap-2">
                          <FormField
                            control={form.control}
                            name={`questions.${qIdx}.options.${oIdx}.orderIndex`}
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormLabel className="text-xs">Order</FormLabel>
                                <FormControl>
                                  <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`questions.${qIdx}.options.${oIdx}.optionText`}
                            render={({ field }) => (
                              <FormItem className="flex-[3]">
                                <FormLabel className="text-xs">Option Text</FormLabel>
                                <FormControl>
                                  <Input placeholder="Option text" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`questions.${qIdx}.options.${oIdx}.isCorrect`}
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormLabel className="text-xs">Correct</FormLabel>
                                <FormControl>
                                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const opts = form.getValues(`questions.${qIdx}.options`);
                              opts.splice(oIdx, 1);
                              form.setValue(`questions.${qIdx}.options`, opts);
                            }}
                          >
                            <Trash2 />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <FormField
                  control={form.control}
                  name={`questions.${qIdx}.explanation`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Explanation (optional)</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Save Quiz</Button>
        </div>
      </form>
    </Form>
  );
}