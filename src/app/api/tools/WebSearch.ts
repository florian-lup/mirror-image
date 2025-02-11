import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import { SearchResult, ToolResponse, ToolInput, SerpApiResponse } from "@/types/tools";

// Accept either a string or an object with a query property
const WebSearchSchema = z.union([
  z.string().describe('The search query to find relevant web results'),
  z.object({
    query: z.string().describe('The search query to find relevant web results')
  })
]) satisfies z.ZodType<ToolInput>;

/**
 * Tool for searching the web using SERP API to get current information from across the internet
 */
export class WebSearch {
  static create() {
    return new DynamicStructuredTool({
      name: 'web_search',
      description: 'Search the web to find current information from websites and news sources. Use this for finding specific facts, news, or information from across the internet.',
      schema: WebSearchSchema,
      func: async (input): Promise<string> => {
        try {
          // Parse and validate the input
          const parsedInput = WebSearchSchema.parse(input);
          // Extract query from either string or object input
          const query = typeof parsedInput === 'string' ? parsedInput : parsedInput.query;

          if (!process.env.SERP_API_KEY) {
            const errorResponse: ToolResponse = {
              success: false,
              message: 'SERP API credentials not configured',
              response: 'Error: Web search service not available'
            };
            return JSON.stringify(errorResponse);
          }

          // Construct the SERP API URL with parameters
          const params = new URLSearchParams({
            api_key: process.env.SERP_API_KEY,
            q: query,
            num: '5', // Get top 5 results
            gl: 'us', // Set region to US
            hl: 'en' // Set language to English
          });

          const fetchResponse = await fetch(`https://serpapi.com/search.json?${params.toString()}`);

          if (!fetchResponse.ok) {
            const errorResponse: ToolResponse = {
              success: false,
              message: `Web search error: ${fetchResponse.statusText}`,
              response: 'Sorry, I encountered an error while searching the web.'
            };
            return JSON.stringify(errorResponse);
          }

          const data = await fetchResponse.json() as SerpApiResponse;
          
          // Extract organic search results
          const organicResults = data.organic_results || [];
          
          if (organicResults.length === 0) {
            const emptyResponse: ToolResponse = {
              success: false,
              message: 'No search results found',
              response: 'I could not find any relevant web search results for your query.'
            };
            return JSON.stringify(emptyResponse);
          }

          // Format the results into a readable summary
          const formattedResults = organicResults
            .map((result: SearchResult) => {
              return `${result.title}\n${result.snippet}\nSource: ${result.link}\n`;
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
