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
## Clavix Integration

This project uses Clavix for prompt improvement and PRD generation. **Clavix is built on the CLEAR Framework** - an academically-validated prompt engineering methodology developed by Dr. Leo Lo at the University of New Mexico.

### CLEAR Framework

**CLEAR** stands for: Concise, Logical, Explicit, Adaptive, Reflective

- **[C] Concise**: Eliminate verbosity, remove pleasantries, focus on essentials
- **[L] Logical**: Ensure coherent sequencing (context → requirements → constraints → output)
- **[E] Explicit**: Specify persona, output format, tone, and success criteria
- **[A] Adaptive**: Provide alternative approaches and flexibility
- **[R] Reflective**: Enable validation, edge cases, and quality checks

**Academic Citation**: Lo, L. S. (2023). "The CLEAR Path: A Framework for Enhancing Information Literacy through Prompt Engineering." *Journal of Academic Librarianship*, 49(4). [Framework Guide](https://guides.library.tamucc.edu/prompt-engineering/clear)

### Slash Commands

### /clavix:fast [prompt]
**CLEAR-guided quick improvements (C, L, E components)**

Uses Conciseness, Logic, and Explicitness analysis with smart triage. Perfect for making "shitty prompts good" quickly. Displays CLEAR scores and labeled improvements.

### /clavix:deep [prompt]
**Full CLEAR framework analysis (C, L, E, A, R components)**

Comprehensive analysis using all five CLEAR components. Includes alternative phrasings (Adaptive) and validation checklists (Reflective). Use for complex requirements needing thorough exploration.

### /clavix:prd
**CLEAR-validated PRD generation**

Launch the PRD generation workflow with Socratic questioning. Generated PRDs are validated using CLEAR framework for AI consumption quality. Outputs both comprehensive team PRD and CLEAR-optimized AI-ready version.

### /clavix:start
**Conversational mode for iterative development**

Enter conversational mode to discuss requirements naturally. Later use `/clavix:summarize` to extract and CLEAR-optimize prompts from the conversation.

### /clavix:summarize
**Extract and CLEAR-optimize from conversation**

Analyze the conversation and extract key requirements. Applies CLEAR framework optimization, displaying both raw extraction and CLEAR-enhanced version.

### When to Use Which Mode

- **Fast mode** (`/clavix:fast`): C, L, E components - quick CLEAR cleanup for simple prompts
- **Deep mode** (`/clavix:deep`): Full CLEAR (C, L, E, A, R) - when you need alternatives and validation
- **PRD mode** (`/clavix:prd`): CLEAR-validated strategic planning with architecture and business impact

**Pro tip**: Start complex features with `/clavix:prd` or `/clavix:start` to ensure CLEAR requirements before implementation.
<!-- CLAVIX:END -->
