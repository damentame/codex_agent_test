import { loadRuntimeConfig } from "../config/agentConfig.js";
import { OpenAIAgentProvider } from "../providers/OpenAIAgentProvider.js";

export async function runAgentTest(): Promise<void> {
  const runtime = loadRuntimeConfig();

  if (!runtime.apiKey) {
    throw new Error("OPENAI_API_KEY is required. Add it to .env before running the PoC.");
  }

  console.log("Provider:", runtime.provider);
  console.log("Model:", runtime.model);
  console.log("Repo config:", {
    repoName: runtime.repoConfig.repoName,
    repoBranch: runtime.repoConfig.repoBranch,
    repoUrl: runtime.repoConfig.repoUrl,
    repoPath: runtime.repoConfig.repoPath,
    agentPlatform: runtime.repoConfig.agentPlatform
  });

  const provider = new OpenAIAgentProvider(runtime.apiKey);

  await provider.createAgent({
    name: "midnight-task-executor",
    model: runtime.model,
    systemPrompt: runtime.repoConfig.systemPrompt,
    repoConfig: runtime.repoConfig
  });

  const result = await provider.runPrompt("Reply with: Midnight Agent Space executor online.");

  console.log("Raw response:", JSON.stringify(result.rawResponse, null, 2));
  console.log("Final output:", result.finalOutput);
}
