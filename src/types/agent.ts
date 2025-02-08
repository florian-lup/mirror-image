import { DynamicStructuredTool } from "@langchain/core/tools";

export interface AgentState {
  input: string;
  thought?: string;
  action?: AgentAction;
  observation?: string;
  final_answer?: string;
}

export interface AgentAction {
  name: string;
  args: {
    input: string;
  };
}

export interface AgentFinish {
  return_values: {
    output: string;
  };
  log: string;
}

export type Tool = DynamicStructuredTool; 