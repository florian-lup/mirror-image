import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import { ToolResponse, ToolInput } from "@/types/agent";

// Accept either a string or an object with a query property
const WebSearchSchema = z.union([
  z.string().describe('The search query to find relevant web results'),
  z.object({
    query: z.string().describe('The search query to find relevant web results')
  })
]) satisfies z.ZodType<ToolInput>;

interface TavilySearchResult {
  title: string;
  url: string;
  content: string;
}

interface TavilyResponse {
  results: TavilySearchResult[];
  query: string;
}

/**
 * Tool for searching the web using Tavily API to get current information from across the internet
 */
export class WebSearch {
  static create() {
    return new DynamicStructuredTool({
      name: 'web_search',
      description: 'Search the web for background information and historical events. Use this tool when you need to find information about past events, company histories, biographical details, or any historical context and background information.',
      schema: WebSearchSchema,
      func: async (input): Promise<string> => {
        try {
          // Parse and validate the input
          const parsedInput = WebSearchSchema.parse(input);
          // Extract query from either string or object input
          const query = typeof parsedInput === 'string' ? parsedInput : parsedInput.query;

          if (!process.env.TAVILY_API_KEY) {
            const errorResponse: ToolResponse = {
              success: false,
              message: 'Tavily API credentials not configured',
              response: 'Error: Web search service not available'
            };
            return JSON.stringify(errorResponse);
          }

          const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.TAVILY_API_KEY}`
          };

          const fetchResponse = await fetch('https://api.tavily.com/search', {
            method: 'POST',
            headers,
            body: JSON.stringify({
              query: query,
              search_depth: "basic",
              max_results: 5
            })
          });
          
          if (!fetchResponse.ok) {
            const responseText = await fetchResponse.text();
            const errorResponse: ToolResponse = {
              success: false,
              message: fetchResponse.status === 401 
                ? 'Invalid or missing Tavily API key'
                : `Web search error: ${fetchResponse.statusText}`,
              response: fetchResponse.status === 401
                ? 'Error: Please check your Tavily API key configuration.'
                : 'Sorry, I encountered an error while searching the web.'
            };
            return JSON.stringify(errorResponse);
          }

          const data = await fetchResponse.json() as TavilyResponse;
          
          if (data.results.length === 0) {
            const emptyResponse: ToolResponse = {
              success: false,
              message: 'No search results found',
              response: 'I could not find any relevant web search results for your query.'
            };
            return JSON.stringify(emptyResponse);
          }

          // Format the results into a readable summary
          const formattedResults = data.results
            .map((result: TavilySearchResult) => {
              return `${result.title}\n${result.content}\nSource: ${result.url}\n`;
            })
            .join('\n');

          const successResponse: ToolResponse = {
            success: true,
            message: 'Successfully retrieved web search results',
            response: formattedResults
          };
          return JSON.stringify(successResponse);
          
        } catch (error: unknown) {
          const errorResponse: ToolResponse = {
            success: false,
            message: error instanceof Error 
              ? `Error performing web search: ${error.message}`
              : 'Unknown error occurred while searching the web',
            response: 'Sorry, I encountered an error while processing your web search.'
          };
          return JSON.stringify(errorResponse);
        }
      }
    });
  }
}
