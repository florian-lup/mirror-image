import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";

// Accept either a string or an object with a query property
const PerplexitySchema = z.union([
  z.string().describe('The question or query to send to Perplexity AI'),
  z.object({
    query: z.string().describe('The question or query to send to Perplexity AI')
  })
]);

interface PerplexityMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

/**
 * Tool for interacting with Perplexity AI to get real-time information and answers
 */
export class PerplexityAssistant {
  static create() {
    return new DynamicStructuredTool({
      name: 'perplexity_assistant',
      description: 'Use Perplexity AI to get real-time information and answers about current events, facts, or any general knowledge questions.',
      schema: PerplexitySchema,
      func: async (input) => {
        // Parse and validate the input
        const parsedInput = PerplexitySchema.parse(input);
        // Extract query from either string or object input
        const query = typeof parsedInput === 'string' ? parsedInput : parsedInput.query;
        
        if (!process.env.PERPLEXITY_API_KEY) {
          throw new Error('Perplexity API key not configured');
        }

        try {
          const messages: PerplexityMessage[] = [
            {
              role: 'system',
              content: 'You are a helpful AI assistant that provides accurate, up-to-date information. Always be concise and factual.'
            },
            {
              role: 'user',
              content: query
            }
          ];

          const requestBody = {
            model: 'sonar-reasoning',
            messages,
            max_tokens: 1024,
            temperature: 0.7,
            return_related_questions: true,
            search_recency_filter: 'day'
          };

          const response = await fetch('https://api.perplexity.ai/chat/completions', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
          });

          if (!response.ok) {
            throw new Error(`Perplexity API error: ${response.statusText}`);
          }

          const data = await response.json();
          
          const result = {
            success: true,
            message: 'Successfully received response from Perplexity',
            answer: data.choices[0]?.message?.content || '',
            usage: data.usage
          };
          
          return JSON.stringify(result);
        } catch (error: unknown) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
          
          const errorResult = {
            success: false,
            message: `Error querying Perplexity: ${errorMessage}`,
            data: null
          };
          
          return JSON.stringify(errorResult);
        }
      }
    });
  }
} 