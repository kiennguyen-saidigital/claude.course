import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic(); // reads ANTHROPIC_API_KEY from env

// --- Tool definitions: JSON schema Claude reads to decide when/how to call each tool ---
const tools = [
  {
    name: "get_weather",
    description: "Get today's current weather for a city.",
    input_schema: {
      type: "object",
      properties: {
        city: { type: "string", description: "The city to check" },
      },
      required: ["city"],
    },
  },
  {
    name: "get_forecast",
    description: "Get the weather forecast for the next few days for a city.",
    input_schema: {
      type: "object",
      properties: {
        city: { type: "string", description: "The city to check" },
      },
      required: ["city"],
    },
  },
];

// --- Mock lookups — replace with real weather API calls ---
function getWeather(city) {
  return `Weather in ${city} today: 38°F, light snow flurries.`;
}

function getForecast(city) {
  return `3-day forecast for ${city}: Day 1 snow flurries 38°F, Day 2 partly cloudy 45°F, Day 3 sunny 52°F.`;
}

// --- Dispatch: your code decides what each tool name actually does ---
function runTool(name, input) {
  switch (name) {
    case "get_weather":
      return getWeather(input.city);
    case "get_forecast":
      return getForecast(input.city);
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

let messages = [
  {
    role: "user",
    content:
      "I'm packing for a three-day trip to Denver. What's the weather today and over the next few days?",
  },
];

// --- The manual agent loop ---
while (true) {
  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    messages,
    tools,
  });

  if (response.stop_reason !== "tool_use") {
    // Claude is done — print the final answer and stop
    for (const block of response.content) {
      if (block.type === "text") console.log(block.text);
    }
    break;
  }

  messages.push({ role: "assistant", content: response.content });

  const toolResults = response.content
    .filter((block) => block.type === "tool_use")
    .map((block) => {
      console.log(`[tool_use] ${block.name}(${JSON.stringify(block.input)})`);
      return {
        type: "tool_result",
        tool_use_id: block.id,
        content: runTool(block.name, block.input),
      };
    });

  messages.push({ role: "user", content: toolResults });
  // loop again so Claude sees the tool_result(s) and can respond or call more tools
}
