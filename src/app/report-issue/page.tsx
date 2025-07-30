'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { suggestDepartment } from '@/ai/flows/suggest-department';
import { useToast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, Wand2 } from 'lucide-react';

const formSchema = z.object({
  description: z.string().min(20, { message: 'Please provide a more detailed description (min 20 chars).' }),
  location: z.string().min(3, { message: 'Location is required.' }),
  file: z.any().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function ReportIssuePage() {
  const { toast } = useToast();
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [suggestion, setSuggestion] = useState<{ departmentName: string; justification: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: '',
      location: '',
    },
  });

  const handleSuggestDepartment = async () => {
    const description = form.getValues('description');
    const location = form.getValues('location');
    if (!description || !location) {
      toast({
        title: 'Heads up!',
        description: 'Please enter a description and location to get a suggestion.',
        variant: 'destructive',
      });
      return;
    }
    setIsSuggesting(true);
    setSuggestion(null);
    try {
      const result = await suggestDepartment({ issueDescription: description, location });
      setSuggestion(result);
    } catch (error) {
      console.error('AI suggestion failed:', error);
      toast({
        title: 'Error',
        description: 'Could not get AI suggestion. Please proceed manually.',
        variant: 'destructive',
      });
    } finally {
      setIsSuggesting(false);
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    // Mock submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Form submitted:', { ...data, suggestedDepartment: suggestion?.departmentName });
    setIsSubmitting(false);
    toast({
      title: 'Mission Accomplished!',
      description: 'Your issue has been reported successfully.',
    });
    form.reset();
    setSuggestion(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border-4 border-accent bg-secondary">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-3xl text-accent">Report New Issue</CardTitle>
          <CardDescription className="font-body text-lg pt-2">
            Complete the form below to start a new mission.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 font-body text-lg">
            <div className="space-y-2">
              <Label htmlFor="description">Issue Description</Label>
              <Textarea id="description" {...form.register('description')} rows={5} className="bg-black text-white" />
              {form.formState.errors.description && <p className="text-red-500">{form.formState.errors.description.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location (e.g., "Main St & 2nd Ave")</Label>
              <Input id="location" {...form.register('location')} className="bg-black text-white" />
              {form.formState.errors.location && <p className="text-red-500">{form.formState.errors.location.message}</p>}
            </div>
            
            <div className="space-y-4">
              <Label>AI Department Suggestion</Label>
              <Button type="button" variant="outline" className="w-full text-accent-foreground flex items-center gap-2" onClick={handleSuggestDepartment} disabled={isSuggesting}>
                {isSuggesting ? <Loader2 className="animate-spin" /> : <Wand2 />}
                {isSuggesting ? 'Analyzing...' : 'Suggest Department'}
              </Button>
              {suggestion && (
                <Card className="bg-black border-primary p-4">
                  <p><strong className="text-primary">Suggested Department:</strong> {suggestion.departmentName}</p>
                  <p className="text-sm text-muted-foreground mt-2"><strong className="text-primary">Reasoning:</strong> {suggestion.justification}</p>
                </Card>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="file">Attach File (Optional)</Label>
              <Input id="file" type="file" {...form.register('file')} className="bg-black text-white file:text-primary file:font-body" />
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full font-body text-xl border-2 border-foreground shadow-[4px_4px_0px_hsl(var(--foreground))] hover:shadow-none active:shadow-none active:translate-x-1 active:translate-y-1 transition-all">
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSubmitting ? 'Submitting...' : 'Submit Mission'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
