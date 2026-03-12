import { runAgentTest } from "./app/runAgentTest.js";

runAgentTest().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error("Agent test failed:", message);
  process.exitCode = 1;
});
