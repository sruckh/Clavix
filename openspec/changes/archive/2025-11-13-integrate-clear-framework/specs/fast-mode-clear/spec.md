# Fast Mode CLEAR Framework Integration

## MODIFIED Requirements

### Requirement: Fast Mode Prompt Improvement

The system SHALL provide a fast command using the CLEAR framework (Concise, Logical, Explicit components) to quickly improve prompts with smart triage.

#### Scenario: Apply CLEAR framework in fast mode
- **WHEN** user runs `clavix fast "Create a login page"`
- **THEN** the system MUST analyze the prompt using CLEAR framework
- **AND** apply Conciseness analysis to identify verbose language
- **AND** apply Logic analysis to check sequencing and flow
- **AND** apply Explicitness analysis to identify missing specifications
- **AND** generate CLEAR-optimized structured prompt
- **AND** display CLEAR component scores (C, L, E)

#### Scenario: Display CLEAR-based analysis
- **WHEN** fast mode completes analysis
- **THEN** the system MUST display CLEAR Assessment section
- **AND** show Conciseness score with identified issues
- **AND** show Logic score with flow issues
- **AND** show Explicitness score with missing specifications
- **AND** include recommendation: "Use /clavix:deep for Adaptive variations and Reflective validation"

#### Scenario: CLEAR-optimized improved prompt
- **WHEN** fast mode generates improved prompt
- **THEN** the prompt MUST be optimized for Conciseness (no fluff)
- **AND** be optimized for Logic (coherent sequencing)
- **AND** be optimized for Explicitness (clear specifications)
- **AND** include "Changes Made" section explaining CLEAR improvements
- **AND** serve as educational tool for CLEAR principles

#### Scenario: Fast mode excludes Adaptive and Reflective
- **WHEN** fast mode analyzes a prompt
- **THEN** the system MUST NOT generate alternative phrasings (Adaptive)
- **AND** MUST NOT generate comprehensive reflection checklists (Reflective)
- **AND** MUST recommend /clavix:deep if user needs A/R components
- **AND** MAY include basic validation points but NOT full reflection

#### Scenario: CLEAR-aware smart triage
- **WHEN** fast mode detects low Conciseness score (< 60%)
- **OR** detects low Logic score (< 60%)
- **OR** detects low Explicitness score (< 50%)
- **THEN** the system MUST recommend switching to /clavix:deep
- **AND** explain which CLEAR component needs deeper analysis
- **AND** ask user to confirm proceeding or switch to deep mode

#### Scenario: Output format with CLEAR branding
- **WHEN** fast mode displays results
- **THEN** the output MUST include "🎯 CLEAR Analysis (Fast Mode)" header
- **AND** section structure:
  - CLEAR Assessment (C, L, E scores and issues)
  - Recommendation (when to use deep mode)
  - Improved Prompt (CLEAR-optimized)
  - Changes Made (educational CLEAR-based summary)

#### Scenario: Backward compatibility maintained
- **WHEN** fast mode uses CLEAR framework
- **THEN** the output quality MUST be equal to or better than previous regex-based system
- **AND** all existing fast mode features MUST remain functional
- **AND** smart triage logic MUST continue working
- **AND** "Already good prompt" detection MUST still work

#### Scenario: Slash command integration
- **WHEN** user runs `/clavix:fast` in Claude Code
- **THEN** the slash command file MUST reference CLEAR framework
- **AND** explain that fast mode uses C, L, E components
- **AND** mention when to use deep mode for A, R components
- **AND** pass the prompt to CLEAR-enhanced fast mode

## ADDED Requirements

### Requirement: CLEAR Framework Documentation in Fast Mode

The system SHALL document the CLEAR framework methodology in fast mode outputs and templates.

#### Scenario: Include CLEAR explanation in help
- **WHEN** user runs `clavix fast --help`
- **THEN** the help text MUST mention "Uses CLEAR framework (Concise, Logical, Explicit)"
- **AND** explain what each component means
- **AND** indicate deep mode provides full CLEAR analysis (A, R)

#### Scenario: Educational CLEAR feedback
- **WHEN** fast mode displays "Changes Made" section
- **THEN** each change MUST be labeled with CLEAR component
- **AND** format: "[C] Removed unnecessary pleasantries"
- **AND** format: "[L] Reordered requirements for logical flow"
- **AND** format: "[E] Added explicit output format specification"
- **AND** help users understand CLEAR principles through examples

#### Scenario: CLEAR-only analysis flag
- **WHEN** user runs `clavix fast --clear-only "prompt"`
- **THEN** the system MUST display only CLEAR scores and analysis
- **AND** NOT display improved prompt
- **AND** useful for understanding CLEAR assessment without modification
