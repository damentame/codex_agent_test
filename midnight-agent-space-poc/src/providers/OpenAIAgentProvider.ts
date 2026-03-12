import OpenAI from "openai";
import type { AgentDefinition, AgentProvider, AgentRunResult } from "./AgentProvider.js";

export class OpenAIAgentProvider implements AgentProvider {
  private readonly client: OpenAI;
  private agent?: AgentDefinition;

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error("Missing OPENAI_API_KEY. Add it to your environment or .env file.");
    }

    this.client = new OpenAI({ apiKey });
  }

  async createAgent(config: AgentDefinition): Promise<void> {
    this.agent = config;
  }

  async runPrompt(input: string): Promise<AgentRunResult> {
    if (!this.agent) {
      throw new Error("Agent has not been created. Call createAgent(config) first.");
    }

    const response = await this.client.responses.create({
      model: this.agent.model,
      input: [
        { role: "system", content: this.agent.systemPrompt },
        { role: "user", content: input }
      ]
    });

    return {
      rawResponse: response,
      finalOutput: response.output_text?.trim() || ""
    };
  }
}
