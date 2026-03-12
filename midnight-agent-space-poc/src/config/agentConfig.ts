import "dotenv/config";

export interface RepoConfig {
  repoName: string;
  repoUrl: string;
  repoBranch: string;
  repoPath: string;
  agentPlatform: string;
  systemPrompt: string;
}

export interface AgentRuntimeConfig {
  provider: "openai";
  model: string;
  apiKey?: string;
  repoConfig: RepoConfig;
}

const defaultRepoConfig: RepoConfig = {
  repoName: "midnight-agent-space",
  repoUrl: "https://github.com/<org>/<repo>",
  repoBranch: "main",
  repoPath: ".",
  agentPlatform: "openai",
  systemPrompt: "You are Midnight Agent Space task executor agent"
};

export function loadRuntimeConfig(): AgentRuntimeConfig {
  return {
    provider: "openai",
    model: process.env.OPENAI_MODEL ?? "gpt-5.2-codex",
    apiKey: process.env.OPENAI_API_KEY,
    repoConfig: {
      ...defaultRepoConfig,
      repoName: process.env.REPO_NAME ?? defaultRepoConfig.repoName,
      repoUrl: process.env.REPO_URL ?? defaultRepoConfig.repoUrl,
      repoBranch: process.env.REPO_BRANCH ?? defaultRepoConfig.repoBranch,
      repoPath: process.env.REPO_PATH ?? defaultRepoConfig.repoPath,
      agentPlatform: process.env.AGENT_PLATFORM ?? defaultRepoConfig.agentPlatform,
      systemPrompt: process.env.SYSTEM_PROMPT ?? defaultRepoConfig.systemPrompt
    }
  };
}
