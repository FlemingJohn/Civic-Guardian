'use server';

/**
 * @fileOverview A flow to suggest actions for the admin to take to address the reported issue.
 *
 * - suggestAdminActions - A function that handles the suggestion of admin actions.
 * - SuggestAdminActionsInput - The input type for the suggestAdminActions function.
 * - SuggestAdminActionsOutput - The return type for the suggestAdminActions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestAdminActionsInputSchema = z.object({
  issueDescription: z.string().describe('The description of the reported issue.'),
  department: z.string().describe('The government department responsible for the issue.'),
  location: z.string().describe('The location of the reported issue.'),
  fileDataUri: z
    .string()
    .optional()
    .describe(
      "A file related to the issue, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type SuggestAdminActionsInput = z.infer<typeof SuggestAdminActionsInputSchema>;

const SuggestAdminActionsOutputSchema = z.object({
  suggestedActions: z.array(z.string()).describe('A list of suggested actions for the admin to take.'),
  reasoning: z.string().describe('The reasoning behind the suggested actions.'),
});
export type SuggestAdminActionsOutput = z.infer<typeof SuggestAdminActionsOutputSchema>;

export async function suggestAdminActions(input: SuggestAdminActionsInput): Promise<SuggestAdminActionsOutput> {
  return suggestAdminActionsFlow(input);
}

const actionSuggestionPrompt = ai.definePrompt({
  name: 'actionSuggestionPrompt',
  input: {schema: SuggestAdminActionsInputSchema},
  output: {schema: SuggestAdminActionsOutputSchema},
  prompt: `You are an AI assistant for a government admin. Based on the issue details below, suggest actions to resolve it and provide reasoning.

Issue Description: {{{issueDescription}}}
Responsible Department: {{{department}}}
Location: {{{location}}}
{{~#if fileDataUri}}
File: {{media url=fileDataUri}}
{{~/if}}

Provide your response in JSON format.`,
});

const suggestAdminActionsFlow = ai.defineFlow(
  {
    name: 'suggestAdminActionsFlow',
    inputSchema: SuggestAdminActionsInputSchema,
    outputSchema: SuggestAdminActionsOutputSchema,
  },
  async input => {
    const {output} = await actionSuggestionPrompt(input);
    return output!;
  }
);
