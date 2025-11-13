# PRD Mode CLEAR Framework Validation

## MODIFIED Requirements

### Requirement: PRD Generation via Socratic Questioning

The system SHALL guide users through creating PRDs using strategic questions and validate outputs using the CLEAR framework.

#### Scenario: CLEAR validation of generated PRDs
- **WHEN** PRD generation completes (full-prd.md and quick-prd.md created)
- **THEN** the system MUST run quick-prd.md through CLEAR analysis
- **AND** assess Conciseness of the PRD for AI consumption
- **AND** assess Logic of requirement sequencing
- **AND** assess Explicitness of specifications
- **AND** generate CLEAR scores (C, L, E only - A and R not applicable to PRDs)

#### Scenario: Display CLEAR validation results
- **WHEN** CLEAR validation completes
- **THEN** the system MUST display "🎯 CLEAR Framework Validation" section
- **AND** show assessment: "Your PRD has been analyzed using the CLEAR framework for AI consumption"
- **AND** display Conciseness: score with AI-readability notes
- **AND** display Logic: score with structure assessment
- **AND** display Explicitness: score with completeness check
- **AND** note that Adaptive and Reflective are not applicable to PRD documents

#### Scenario: CLEAR-based PRD improvement suggestions
- **WHEN** CLEAR validation identifies low scores (< 70%)
- **THEN** the system MUST suggest specific improvements
- **AND** format: "[C] ⚠️ Consider tightening language in technical requirements section"
- **AND** format: "[L] ⚠️ Consider reorganizing: problem → users → features → constraints"
- **AND** format: "[E] 💡 Add explicit success criteria for each feature"
- **AND** allow user to review and optionally regenerate

#### Scenario: CLEAR validation in completion message
- **WHEN** PRD generation displays completion message
- **THEN** the message MUST include CLEAR validation summary
- **AND** show overall CLEAR score for AI consumption quality
- **AND** affirm if PRD is "CLEAR-optimized for AI assistants" (score >= 80)
- **AND** suggest improvements if score < 80

#### Scenario: PRD workflow unchanged
- **WHEN** running PRD generation
- **THEN** the Socratic questioning workflow MUST remain identical
- **AND** same questions MUST be asked
- **AND** same PRD generation templates MUST be used
- **AND** CLEAR validation is ADDITIVE, not replacement
- **AND** validation runs AFTER generation, not during

#### Scenario: Slash command references CLEAR
- **WHEN** user views `/clavix:prd` command documentation
- **THEN** the command MUST mention CLEAR framework validation
- **AND** explain that generated PRDs are validated for AI consumption
- **AND** note that CLEAR ensures PRD quality for Claude Code usage

## ADDED Requirements

### Requirement: CLEAR Framework for PRD Quality

The system SHALL use CLEAR framework to ensure PRDs are optimized for AI consumption.

#### Scenario: CLEAR-optimized quick-prd template
- **WHEN** generating quick-prd.md
- **THEN** the template SHOULD be optimized for CLEAR principles
- **AND** Concise: 2-3 paragraphs, no fluff
- **AND** Logical: Clear flow (problem → solution → requirements → constraints)
- **AND** Explicit: Specific features, clear success criteria

#### Scenario: Optional PRD regeneration with CLEAR fixes
- **WHEN** CLEAR validation suggests improvements
- **THEN** the system MAY offer to regenerate PRD with improvements
- **AND** apply CLEAR-based enhancements automatically
- **AND** preserve user's answers, improve only structure/clarity
- **AND** generate improved version as quick-prd-v2.md
