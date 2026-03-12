import type { RepoConfig } from "../config/agentConfig.js";

export interface AgentDefinition {
  name: string;
  model: string;
  systemPrompt: string;
  repoConfig: RepoConfig;
}

export interface AgentRunResult {
  rawResponse: unknown;
  finalOutput: string;
}

export interface AgentProvider {
  createAgent(config: AgentDefinition): Promise<void>;
  runPrompt(input: string): Promise<AgentRunResult>;
}
