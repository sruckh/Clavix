<!-- OPENSPEC:START -->
# OpenSpec Instructions

These instructions are for AI assistants working in this project.

Always open `@/openspec/AGENTS.md` when the request:
- Mentions planning or proposals (words like proposal, spec, change, plan)
- Introduces new capabilities, breaking changes, architecture shifts, or big performance/security work
- Sounds ambiguous and you need the authoritative spec before coding

Use `@/openspec/AGENTS.md` to learn:
- How to create and apply change proposals
- Spec format and conventions
- Project structure and guidelines

Keep this managed block so 'openspec update' can refresh the instructions.

<!-- OPENSPEC:END -->

<!-- CLAVIX:START -->
# Clavix - Prompt Improvement Assistant

Clavix is installed in this project. Use the following slash commands:

- `/clavix:prd` - Generate a PRD through guided questions
- `/clavix:improve [prompt]` - Improve a prompt directly
- `/clavix:start` - Start conversational mode for iterative refinement
- `/clavix:summarize` - Extract optimized prompt from conversation

For more information, run `clavix --help` in your terminal.
<!-- CLAVIX:END -->
