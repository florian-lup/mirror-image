import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import { ResearchMessage, ToolResponse, ToolInput, PerplexityResponse } from "@/types/tools";

// Accept either a string or an object with a query property
const DeepResearchSchema = z.union([
  z.string().describe('The research query to get detailed, up-to-date information'),
  z.object({
    query: z.string().describe('The research query to get detailed, up-to-date information')
  })
]) satisfies z.ZodType<ToolInput>;

/**
 * Tool for conducting deep research using AI to get comprehensive, real-time information
 */
export class DeepResearch {
  static create() {
    return new DynamicStructuredTool({
      name: 'deep_research',
      description: 'Conduct deep research to get comprehensive, real-time information about current events, facts, or any general knowledge questions. Only use this for current, factual queries, not hypotheticals.',
      schema: DeepResearchSchema,
      func: async (input): Promise<string> => {
        try {
          // Parse and validate the input
          const parsedInput = DeepResearchSchema.parse(input);
          // Extract query from either string or object input
          const query = typeof parsedInput === 'string' ? parsedInput : parsedInput.query;
          
          if (!process.env.PERPLEXITY_API_KEY) {
            const errorResponse: ToolResponse = {
              success: false,
              message: 'Research service credentials not configured',
              response: 'Error: Unable to access research service'
            };
            return JSON.stringify(errorResponse);
          }

          const messages: ResearchMessage[] = [
            {
              role: 'system',
              content: 'You are a research assistant that provides comprehensive, accurate, and up-to-date information. Focus on factual details.'
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

          const fetchResponse = await fetch('https://api.perplexity.ai/chat/completions', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
          });

          if (!fetchResponse.ok) {
            const errorResponse: ToolResponse = {
              success: false,
              message: `Research service error: ${fetchResponse.statusText}`,
              response: 'Sorry, I encountered an error while conducting research.'
            };
            return JSON.stringify(errorResponse);
          }

          const data = await fetchResponse.json() as PerplexityResponse;
          
          const content = data.choices[0]?.message?.content;
          if (!content) {
            const emptyResponse: ToolResponse = {
              success: false,
              message: 'No content in research response',
              response: 'I completed the research but found no useful information.'
            };
            return JSON.stringify(emptyResponse);
          }
          
          const successResponse: ToolResponse = {
            success: true,
            message: 'Successfully completed research query',
            response: content
          };
          return JSON.stringify(successResponse);
          
        } catch (error: unknown) {
          const errorResponse: ToolResponse = {
            success: false,
            message: error instanceof Error 
              ? `Error conducting research: ${error.message}`
              : 'Unknown error occurred while conducting research',
            response: 'Sorry, I encountered an error while researching your query.'
          };
          return JSON.stringify(errorResponse);
        }
      }
    });
  }
} 