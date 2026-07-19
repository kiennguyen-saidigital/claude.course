import Anthropic from "@anthropic-ai/sdk";
import { betaTool } from "@anthropic-ai/sdk/helpers/beta/json-schema";

const client = new Anthropic(); // reads ANTHROPIC_API_KEY from env

// --- Mock lookups — same two functions as v1, replace with real weather API calls ---
function getWeather(city) {
  return `Weather in ${city} today: 38°F, light snow flurries.`;
}

function getForecast(city) {
  return `3-day forecast for ${city}: Day 1 snow flurries 38°F, Day 2 partly cloudy 45°F, Day 3 sunny 52°F.`;
}

// --- Wrap each function as a tool: name + description + schema + how to run it ---
// betaTool() replaces the JSON schema you'd otherwise hand-write for `tools` in v1.
const getWeatherTool = betaTool({
  name: "get_weather",
  description: "Get today's current weather for a city.",
  inputSchema: {
    type: "object",
    properties: {
      city: { type: "string", description: "The city to check" },
    },
    required: ["city"],
  },
  run: async ({ city }) => {
    console.log(`[tool_use] get_weather(${JSON.stringify({ city })})`);
    return getWeather(city);
  },
});

const getForecastTool = betaTool({
  name: "get_forecast",
  description: "Get the weather forecast for the next few days for a city.",
  inputSchema: {
    type: "object",
    properties: {
      city: { type: "string", description: "The city to check" },
    },
    required: ["city"],
  },
  run: async ({ city }) => {
    console.log(`[tool_use] get_forecast(${JSON.stringify({ city })})`);
    return getForecast(city);
  },
});

// --- The tool runner replaces the entire while-loop from v1 ---
const runner = client.beta.messages.toolRunner({
  model: "claude-sonnet-4-6",
  max_tokens: 1024,
  messages: [
    {
      role: "user",
      content:
        "I'm packing for a three-day trip to Denver. What's the weather today and over the next few days?",
    },
  ],
  tools: [getWeatherTool, getForecastTool],
});

// Runs the tool_use / tool_result ping-pong internally, then returns the final message
const finalMessage = await runner.untilDone();

for (const block of finalMessage.content) {
  if (block.type === "text") console.log(block.text);
}
