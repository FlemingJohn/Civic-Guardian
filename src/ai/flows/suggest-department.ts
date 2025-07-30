'use server';

/**
 * @fileOverview Suggests the relevant government department for an issue report using AI.
 *
 * - suggestDepartment - A function that suggests a government department for an issue.
 * - SuggestDepartmentInput - The input type for the suggestDepartment function.
 * - SuggestDepartmentOutput - The return type for the suggestDepartment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestDepartmentInputSchema = z.object({
  issueDescription: z
    .string()
    .describe('A detailed description of the reported issue.'),
  location: z.string().describe('The location where the issue occurred.'),
});
export type SuggestDepartmentInput = z.infer<typeof SuggestDepartmentInputSchema>;

const SuggestDepartmentOutputSchema = z.object({
  departmentName: z
    .string()
    .describe('The name of the government department that should address the issue.'),
  justification: z
    .string()
    .describe('A brief explanation of why this department is the most relevant.'),
});
export type SuggestDepartmentOutput = z.infer<typeof SuggestDepartmentOutputSchema>;

export async function suggestDepartment(input: SuggestDepartmentInput): Promise<SuggestDepartmentOutput> {
  return suggestDepartmentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestDepartmentPrompt',
  input: {schema: SuggestDepartmentInputSchema},
  output: {schema: SuggestDepartmentOutputSchema},
  prompt: `You are an AI assistant tasked with suggesting the most relevant government department to handle citizen issues.

  Given the following issue description and location, determine which government department is best suited to address the problem. Provide a brief justification for your suggestion.

  Issue Description: {{{issueDescription}}}
  Location: {{{location}}}

  Department Suggestion:
  {
    "departmentName": "The name of the government department.",
    "justification": "A brief explanation of why this department is the most relevant."
  }`,
});

const suggestDepartmentFlow = ai.defineFlow(
  {
    name: 'suggestDepartmentFlow',
    inputSchema: SuggestDepartmentInputSchema,
    outputSchema: SuggestDepartmentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
