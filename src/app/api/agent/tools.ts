import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from "zod";

const searchSchema = z.object({
  input: z.string().describe("The search query"),
});

export const search = new DynamicStructuredTool({
  name: 'search',
  description: 'Search for information on the internet',
  schema: searchSchema,
  func: async ({ input }) => {
    // This is a mock implementation. In a real application, you would integrate with a search API
    return `Mock search results for: ${input}`;
  },
});

const calculatorSchema = z.object({
  input: z.string().describe("The mathematical expression to evaluate"),
});

export const calculator = new DynamicStructuredTool({
  name: 'calculator',
  description: 'Perform mathematical calculations',
  schema: calculatorSchema,
  func: async ({ input }) => {
    try {
      // WARNING: In a production environment, you should use a safer evaluation method
      const result = eval(input);
      return `Result: ${result}`;
    } catch (error) {
      return `Error calculating: ${error}`;
    }
  },
});

export const tools = [search, calculator]; 