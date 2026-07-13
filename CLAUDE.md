# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Purpose

This is a **personal learning repository** for the Anthropic / Claude courses at
https://claude.com/resources/courses (Anthropic Academy). It is not a software
project — there is no build, test, or deploy step. The user works through course
topics here and asks Claude to:

- **Explain** concepts from a lesson (in depth, with examples).
- **Summarize** lessons or sections into concise notes.
- **Take notes** — write structured Markdown notes the user can review later.
- **Practice exercises** — implement, review, and debug the hands-on exercises a
  course provides (e.g. prompt-engineering tasks, API calls, tool-use code).

## Language

The user reads and writes in **Vietnamese** and English. Default to Vietnamese for
explanations and chat replies unless the user asks for English or the source
material is code.

**Notes (files in `notes/`) are written in Vietnamese**, using simple, easy-to-understand
words. For important terms, keep the English term in parentheses the first time it
appears — e.g. "dự đoán token kế tiếp (next token prediction)", "cửa sổ ngữ cảnh
(context window)". This helps the user connect the Vietnamese note to the original
English course material.

Keep technical terms (API names, code, parameters) in English. Code, comments, and
identifiers stay English.

## Repository conventions

Organize content by course, then by lesson. Suggested layout (create as needed):

```
<course-name>/
  notes/        # summaries and explanations, one Markdown file per lesson
  exercises/    # hands-on practice code/prompts, one folder per exercise
```

- Notes are Markdown. Use headings, bullet points, and code fences. Keep them
  scannable — this user revisits notes, not prose essays.
- When summarizing, lead with the key takeaway, then supporting detail.
- **End every lesson note with a "5 câu hỏi quan trọng" (5 key questions) section:**
  the 5 most important questions for that lesson, each with its answer. This is a
  self-quiz the user reviews later. **Skip this section for** practice/hands-on lessons
  ("Try it out", exercises, quizzes) and lessons that add no new concepts — those have
  nothing new to quiz on. Questions and answers follow the note language rule
  (Vietnamese with English terms in parentheses).
- For exercises that involve the Anthropic API, default to the latest Claude
  models: Opus `claude-opus-4-8`, Sonnet `claude-sonnet-4-6`, Haiku
  `claude-haiku-4-5-20251001`.

## Working style

- The user often pastes lesson text or links. Read it fully before answering.
- Prefer concrete examples over abstract description when explaining.
- When asked to "take notes," write a file rather than only replying inline, so
  the note persists in the repo.

## Learning roadmap (Anthropic Academy courses)

Source: https://claude.com/resources/courses (18 courses, June 2026). The site does
not publish an official order, so this is a suggested **basic → advanced** path. Each
course becomes a top-level folder (slug form) with `notes/` and `exercises/` inside.

Track the user. As of now they finished **Introduction to Agent Skills** and are
working through **Claude 101** and **Claude Code 101**. Update the "Status" column as
courses are finished.

Note: Agent Skills notes live in `claude-code-101/notes/skills.md` (filed there
because skills relate to Claude Code), not in a dedicated `introduction-to-agent-skills/`
folder.

### Stage 0 — Orientation (start here)
| Course | Why | Status |
|--------|-----|--------|
| [Claude 101](https://anthropic.skilljar.com/claude-101) | What Claude is, basic chat use | ◐ in progress |
| [AI Capabilities and Limitations](https://anthropic.skilljar.com/ai-capabilities-and-limitations) | How LLMs work + their limits | ◐ in progress |
| [AI Fluency: Framework & Foundations](https://anthropic.skilljar.com/ai-fluency-framework-foundations) | Mental models (the "4D Framework") | ☐ |

### Stage 1 — Foundations
| Course | Why | Status |
|--------|-----|--------|
| [Claude Code 101](https://anthropic.skilljar.com/claude-code-101) | Intro to Claude Code for dev tasks | ◐ in progress |
| [Claude Platform 101](https://anthropic.skilljar.com/claude-platform-101) | Overview of the Claude platform (API, tooling, surfaces) | ◐ in progress |
| [Introduction to Model Context Protocol](https://anthropic.skilljar.com/introduction-to-model-context-protocol) | MCP basics (how tools connect to Claude) | ☐ |
| [Introduction to Agent Skills](https://anthropic.skilljar.com/introduction-to-agent-skills) | Build and add agent skills | ✅ done |
| [Introduction to Subagents](https://anthropic.skilljar.com/introduction-to-subagents) | Use subagents to split work | ☐ |
| [Introduction to Claude Cowork](https://anthropic.skilljar.com/introduction-to-claude-cowork) | Collaborative Claude features | ☐ |

### Stage 2 — Building (hands-on, API)
| Course | Why | Status |
|--------|-----|--------|
| [Claude Code in Action](https://anthropic.skilljar.com/claude-code-in-action) | Practical Claude Code demos | ☐ |
| [Building with the Claude API](https://anthropic.skilljar.com/claude-with-the-anthropic-api) | Big one: integrate Claude via API (84 lectures) | ☐ |

### Stage 3 — Advanced
| Course | Why | Status |
|--------|-----|--------|
| [Model Context Protocol: Advanced Topics](https://anthropic.skilljar.com/model-context-protocol-advanced-topics) | Advanced MCP, real-world use | ☐ |
| [Claude with Amazon Bedrock](https://anthropic.skilljar.com/claude-in-amazon-bedrock) | Run Claude on AWS Bedrock | ☐ |
| [Claude with Google Cloud's Vertex AI](https://anthropic.skilljar.com/claude-with-google-vertex) | Run Claude on GCP Vertex AI | ☐ |

### Optional / role-specific (take as needed, not in the main line)
[AI Fluency for Small Businesses](https://anthropic.skilljar.com/ai-fluency-for-small-businesses) ·
[AI Fluency for Educators](https://anthropic.skilljar.com/ai-fluency-for-educators) ·
[AI Fluency for Students](https://anthropic.skilljar.com/ai-fluency-for-students) ·
[Teaching AI Fluency](https://anthropic.skilljar.com/teaching-ai-fluency) ·
[AI Fluency for Nonprofits](https://anthropic.skilljar.com/ai-fluency-for-nonprofits).

Rationale: Stage 0 builds intuition (no code). Stage 1 introduces the tools (Claude
Code, MCP, skills, subagents). Stage 2 is heavy hands-on API building. Stage 3 is
advanced/cloud deployment. The Bedrock and Vertex courses overlap ~85 lectures with
"Building with the Claude API" — pick the one platform you use rather than all three.
