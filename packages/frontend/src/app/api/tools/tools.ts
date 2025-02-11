import { KnowledgeBase } from './KnowledgeBase';
import { DeepResearch } from './DeepResearch';
import { WebSearch } from './WebSearch';

export const tools = [
  KnowledgeBase.create(),
  DeepResearch.create(),
  WebSearch.create()
]; 