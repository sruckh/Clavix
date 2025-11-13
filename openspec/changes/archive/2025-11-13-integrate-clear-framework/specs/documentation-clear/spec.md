# Documentation CLEAR Framework Updates

## MODIFIED Requirements

### Requirement: AGENTS.md Managed Block Injection

The system SHALL inject and maintain a managed documentation block in the project's AGENTS.md file, referencing the CLEAR framework.

#### Scenario: Include CLEAR framework in AGENTS.md block
- **WHEN** updating AGENTS.md managed block
- **THEN** the block MUST mention Clavix uses the CLEAR framework
- **AND** include brief explanation: "(Concise, Logical, Explicit, Adaptive, Reflective)"
- **AND** reference academic foundation of the methodology

### Requirement: CLAUDE.md Managed Block Injection

The system SHALL inject and maintain a managed documentation block in CLAUDE.md with CLEAR framework information.

#### Scenario: Update CLAUDE.md block with CLEAR reference
- **WHEN** updating CLAUDE.md managed block for Claude Code
- **THEN** the block MUST include CLEAR framework description
- **AND** explain Clavix uses research-backed CLEAR methodology
- **AND** describe when to use fast mode (C, L, E) vs deep mode (full CLEAR)
- **AND** include academic citation to Dr. Leo Lo's framework

#### Scenario: CLEAR-based command descriptions
- **WHEN** CLAUDE.md managed block describes commands
- **THEN** `/clavix:fast` description MUST mention "CLEAR-guided quick improvements"
- **AND** `/clavix:deep` description MUST mention "Full CLEAR framework analysis"
- **AND** `/clavix:prd` description MUST mention "CLEAR-validated PRD generation"
- **AND** `/clavix:summarize` description MUST mention "CLEAR-optimized extraction"

### Requirement: Documentation Update

The system SHALL provide a command to refresh all managed blocks with CLEAR framework references.

#### Scenario: Update all blocks with CLEAR content
- **WHEN** user runs `clavix update`
- **THEN** the system MUST refresh managed blocks with CLEAR framework information
- **AND** update AGENTS.md with CLEAR references
- **AND** update CLAUDE.md with CLEAR references
- **AND** update slash command templates with CLEAR methodology
- **AND** preserve all existing functionality while adding CLEAR context

## ADDED Requirements

### Requirement: README CLEAR Framework Documentation

The system project's README.md SHALL prominently feature the CLEAR framework as a core differentiator.

#### Scenario: CLEAR in README hero section
- **WHEN** user views README.md
- **THEN** the hero section MUST include "Built on the CLEAR Framework" tagline
- **AND** include badge or shield if available
- **AND** immediately establish academic credibility

#### Scenario: Replace "rule-based" with "CLEAR Framework"
- **WHEN** README describes features
- **THEN** all references to "rule-based analysis" MUST be replaced
- **AND** use "CLEAR Framework methodology" instead
- **AND** maintain accuracy (don't call it AI if it's not)

#### Scenario: "Why CLEAR?" section in README
- **WHEN** user reads README features section
- **THEN** README MUST include dedicated "Why CLEAR?" section
- **AND** explain what CLEAR stands for
- **AND** describe each component briefly (C, L, E, A, R)
- **AND** include academic citation:
  - Author: Dr. Leo Lo, Dean of Libraries, University of New Mexico
  - Paper: "The CLEAR Path: A Framework for Enhancing Information Literacy through Prompt Engineering"
  - Published: Journal of Academic Librarianship, July 2023
  - Link: https://guides.library.tamucc.edu/prompt-engineering/clear
- **AND** explain benefits: research-backed, proven methodology, modern approach

#### Scenario: CLEAR in feature descriptions
- **WHEN** README lists features
- **THEN** each mode MUST reference CLEAR:
  - Fast mode: "CLEAR-guided quick improvements (C, L, E components)"
  - Deep mode: "Full CLEAR framework analysis (C, L, E, A, R components)"
  - PRD mode: "CLEAR-validated PRD generation for AI consumption"
  - Conversational mode: "CLEAR-optimized prompt extraction"

#### Scenario: CLEAR examples in README
- **WHEN** README provides usage examples
- **THEN** examples SHOULD show CLEAR-based output
- **AND** highlight CLEAR component scores when relevant
- **AND** demonstrate educational "Changes Made" with CLEAR labels

### Requirement: CLEAR Framework Academic Attribution

The system documentation SHALL properly attribute the CLEAR framework to its creator.

#### Scenario: Academic citation format
- **WHEN** documentation references CLEAR framework
- **THEN** it MUST include proper academic attribution
- **AND** credit Dr. Leo Lo as framework creator
- **AND** reference University of New Mexico
- **AND** link to published research when possible

#### Scenario: Framework explanation accuracy
- **WHEN** documentation explains CLEAR framework
- **THEN** explanations MUST be accurate to original framework
- **AND** Concise: Brevity and clarity in prompts (eliminate fluff)
- **AND** Logical: Structured and coherent prompts (proper sequencing)
- **AND** Explicit: Clear output specifications (persona, format, tone)
- **AND** Adaptive: Flexibility and customization (alternative approaches)
- **AND** Reflective: Continuous evaluation and improvement (validation)

### Requirement: Slash Command CLEAR Documentation

The system's slash command templates SHALL reference and explain the CLEAR framework.

#### Scenario: CLEAR in fast command template
- **WHEN** `/clavix:fast` slash command template is generated
- **THEN** it MUST include CLEAR framework explanation
- **AND** explain fast mode uses C, L, E components
- **AND** note deep mode provides full CLEAR (A, R)
- **AND** describe what Concise, Logical, Explicit mean

#### Scenario: CLEAR in deep command template
- **WHEN** `/clavix:deep` slash command template is generated
- **THEN** it MUST include full CLEAR framework explanation
- **AND** explain all five components in detail
- **AND** provide examples of each component's value
- **AND** reference academic foundation

#### Scenario: CLEAR in PRD command template
- **WHEN** `/clavix:prd` slash command template is generated
- **THEN** it MUST mention CLEAR validation
- **AND** explain PRDs are validated for CLEAR principles
- **AND** note ensures AI consumption quality

#### Scenario: CLEAR in summarize command template
- **WHEN** `/clavix:summarize` slash command template is generated
- **THEN** it MUST mention CLEAR optimization
- **AND** explain extracted prompts are CLEAR-enhanced
- **AND** describe transformation from conversational → CLEAR-optimized

### Requirement: Help Text CLEAR References

The CLI help text SHALL reference the CLEAR framework appropriately.

#### Scenario: Global help mentions CLEAR
- **WHEN** user runs `clavix --help`
- **THEN** the help text SHOULD mention CLEAR framework
- **AND** note: "Built on the CLEAR Framework for prompt engineering"
- **AND** reference Dr. Leo Lo's methodology

#### Scenario: Command help explains CLEAR usage
- **WHEN** user runs `clavix fast --help` or `clavix deep --help`
- **THEN** the help text MUST explain CLEAR components used
- **AND** fast: "Uses CLEAR framework: Concise, Logical, Explicit"
- **AND** deep: "Uses full CLEAR framework: Concise, Logical, Explicit, Adaptive, Reflective"

#### Scenario: Framework info flag
- **WHEN** user runs `clavix --framework-info` or `clavix fast --framework-info`
- **THEN** the system MUST display comprehensive CLEAR explanation
- **AND** describe each component with examples
- **AND** include academic citation
- **AND** provide links to resources
