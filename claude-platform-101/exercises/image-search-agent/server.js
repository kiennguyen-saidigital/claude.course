import express from "express";
import Anthropic from "@anthropic-ai/sdk";

const app = express();
app.use(express.json());
app.use(express.static("public"));

const client = new Anthropic(); // reads ANTHROPIC_API_KEY from env

// --- Tool definition: Claude only sees name/description/schema, not the implementation ---
const tools = [
  {
    name: "search_images",
    description:
      "Search the web for images matching a text query. Returns up to 10 image results (url + title).",
    input_schema: {
      type: "object",
      properties: {
        query: { type: "string", description: "What to search images for" },
        exclude_urls: {
          type: "array",
          items: { type: "string" },
          description: "Image URLs already shown to the user — exclude these from new results",
        },
      },
      required: ["query"],
    },
  },
];

// --- Tool execution: your code, not Claude's ---
async function runTool(name, input) {
  if (name === "search_images") {
    // PSEUDOCODE — replace with a real call, e.g.:
    // const res = await bingImageSearch(input.query, { exclude: input.exclude_urls, count: 10 });
    // return res.map(r => ({ url: r.contentUrl, title: r.name }));
    return mockImageSearch(input.query, input.exclude_urls || []);
  }
  throw new Error(`Unknown tool: ${name}`);
}

function mockImageSearch(query, exclude) {
  // stand-in so the demo runs without a real image API key
  return Array.from({ length: 10 }, (_, i) => ({
    url: `https://picsum.photos/seed/${encodeURIComponent(query)}-${Date.now()}-${i}/300`,
    title: `${query} #${i + 1}`,
  }));
}

// --- The agent loop (same shape as the lesson) ---
async function runAgentLoop(messages) {
  let images = null;

  while (true) {
    const response = await client.messages.create({
      model: "claude-opus-4-8",
      max_tokens: 1024,
      tools,
      messages,
    });

    messages.push({ role: "assistant", content: response.content });

    if (response.stop_reason !== "tool_use") {
      return { images, messages }; // Claude is done for this turn
    }

    const toolResults = [];
    for (const block of response.content) {
      if (block.type === "tool_use") {
        const result = await runTool(block.name, block.input);
        if (block.name === "search_images") images = result;
        toolResults.push({
          type: "tool_result",
          tool_use_id: block.id,
          content: JSON.stringify(result),
        });
      }
    }
    messages.push({ role: "user", content: toolResults });
    // loop again so Claude sees the tool_result and can respond (end_turn)
  }
}

// --- Session state (demo only: single global session, not multi-user safe) ---
let messages = [];

// Turn an Anthropic API error into a message safe to show the user
function describeApiError(err) {
  if (err instanceof Anthropic.APIError) {
    if (err.status === 401) return "API key is missing or invalid.";
    if (err.status === 400 && /credit balance/i.test(err.message)) {
      return "API credit balance is too low. Add credits in Plans & Billing on platform.claude.com.";
    }
    if (err.status === 429) return "Rate limited by the API. Try again in a moment.";
    return `API error (${err.status}): ${err.message}`;
  }
  return "Unexpected server error. Check the server logs.";
}

app.post("/api/start", async (req, res) => {
  try {
    const { query } = req.body;
    messages = [{ role: "user", content: `Find 10 images about: ${query}` }];
    const { images } = await runAgentLoop(messages);
    res.json({ images });
  } catch (err) {
    console.error(err);
    res.status(502).json({ error: describeApiError(err) });
  }
});

app.post("/api/continue", async (req, res) => {
  try {
    messages.push({
      role: "user",
      content: "Those weren't good enough. Find 10 different images (avoid repeats).",
    });
    const { images } = await runAgentLoop(messages);
    res.json({ images });
  } catch (err) {
    console.error(err);
    res.status(502).json({ error: describeApiError(err) });
  }
});

app.post("/api/stop", (req, res) => {
  messages = [];
  res.json({ ok: true });
});

app.listen(3000, () => console.log("http://localhost:3000"));
